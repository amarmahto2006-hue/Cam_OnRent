export interface SpreadsheetFile {
  id: string;
  name: string;
  createdTime?: string;
  webViewLink?: string;
}

export interface BookingRowData {
  bookingId: string;
  timestamp: string;
  customerName: string;
  phone: string;
  bundleName: string;
  cameraName: string;
  durationDays: number;
  startDate: string;
  accessoriesStr: string;
  deliveryOption: string;
  depositOption: string;
  totalPrice: number | string;
  notes?: string;
}

/**
 * Searches user's Google Drive for existing spreadsheets
 */
export async function listUserSpreadsheets(accessToken: string): Promise<SpreadsheetFile[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const response = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name,createdTime,webViewLink)&pageSize=20`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to list spreadsheets: ${errText}`);
  }

  const data = await response.json();
  return data.files || [];
}

/**
 * Creates a new dedicated Google Sheet for CamOnRent Bookings with styled headers
 */
export async function createCamOnRentSpreadsheet(
  accessToken: string,
  title: string = 'CamOnRent GoPro Rental Bookings'
): Promise<SpreadsheetFile> {
  const payload = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: 'Rental Bookings',
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: [
                  { userEnteredValue: { stringValue: 'Booking ID' } },
                  { userEnteredValue: { stringValue: 'Timestamp' } },
                  { userEnteredValue: { stringValue: 'Customer Name' } },
                  { userEnteredValue: { stringValue: 'Phone Number' } },
                  { userEnteredValue: { stringValue: 'Rental Bundle' } },
                  { userEnteredValue: { stringValue: 'Camera Model' } },
                  { userEnteredValue: { stringValue: 'Duration (Days)' } },
                  { userEnteredValue: { stringValue: 'Start Date' } },
                  { userEnteredValue: { stringValue: 'Selected Accessories' } },
                  { userEnteredValue: { stringValue: 'Delivery Mode' } },
                  { userEnteredValue: { stringValue: 'Deposit Option' } },
                  { userEnteredValue: { stringValue: 'Total Price (₹)' } },
                  { userEnteredValue: { stringValue: 'Customer Note' } },
                  { userEnteredValue: { stringValue: 'Status' } },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to create Google Sheet: ${errText}`);
  }

  const sheetData = await response.json();
  return {
    id: sheetData.spreadsheetId,
    name: title,
    webViewLink: `https://docs.google.com/spreadsheets/d/${sheetData.spreadsheetId}/edit`,
  };
}

/**
 * Appends a booking record as a new row in the specified Google Sheet
 */
export async function appendBookingToSheet(
  accessToken: string,
  spreadsheetId: string,
  booking: BookingRowData
): Promise<boolean> {
  const rowValues = [
    booking.bookingId,
    booking.timestamp,
    booking.customerName || 'Guest User',
    booking.phone || 'N/A',
    booking.bundleName,
    booking.cameraName,
    booking.durationDays,
    booking.startDate,
    booking.accessoriesStr || 'Standard Included Kit',
    booking.deliveryOption,
    booking.depositOption,
    `₹${booking.totalPrice}`,
    booking.notes || '',
    'Pending Confirmation',
  ];

  const range = 'Rental Bookings!A:N';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}:append?valueInputOption=USER_ENTERED`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      majorDimension: 'ROWS',
      values: [rowValues],
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to append row to Google Sheet: ${errText}`);
  }

  return true;
}

/**
 * Retrieves existing booking rows from Google Sheet for live viewing
 */
export async function getSpreadsheetRows(
  accessToken: string,
  spreadsheetId: string
): Promise<string[][]> {
  const range = 'Rental Bookings!A1:N50';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to read sheet data: ${errText}`);
  }

  const data = await response.json();
  return data.values || [];
}
