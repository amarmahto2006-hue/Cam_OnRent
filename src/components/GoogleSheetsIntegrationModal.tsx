import React, { useState, useEffect } from 'react';
import {
  FileSpreadsheet,
  Check,
  Plus,
  ExternalLink,
  RefreshCw,
  LogOut,
  Sparkles,
  X,
  Table,
  UploadCloud,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { googleSignIn, logout, initAuth } from '../services/auth';
import {
  listUserSpreadsheets,
  createCamOnRentSpreadsheet,
  appendBookingToSheet,
  getSpreadsheetRows,
  SpreadsheetFile,
  BookingRowData
} from '../services/googleSheets';
import { User } from 'firebase/auth';
import { soundFx } from '../utils/audio';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBookingToExport?: BookingRowData | null;
}

export const GoogleSheetsIntegrationModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  currentBookingToExport
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  // Sheets management state
  const [spreadsheets, setSpreadsheets] = useState<SpreadsheetFile[]>([]);
  const [selectedSheetId, setSelectedSheetId] = useState<string>('');
  const [selectedSheetUrl, setSelectedSheetUrl] = useState<string>('');
  const [sheetRows, setSheetRows] = useState<string[][]>([]);

  // Action status
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setIsLoadingAuth(false);
        loadSpreadsheets(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadSpreadsheets = async (accessToken: string) => {
    try {
      setIsBusy(true);
      const list = await listUserSpreadsheets(accessToken);
      setSpreadsheets(list);

      // Auto-select CamOnRent sheet if found, else default to first
      const camSheet = list.find((s) => s.name.toLowerCase().includes('camonrent'));
      if (camSheet) {
        setSelectedSheetId(camSheet.id);
        setSelectedSheetUrl(camSheet.webViewLink || `https://docs.google.com/spreadsheets/d/${camSheet.id}/edit`);
        fetchSheetRows(accessToken, camSheet.id);
      } else if (list.length > 0) {
        setSelectedSheetId(list[0].id);
        setSelectedSheetUrl(list[0].webViewLink || `https://docs.google.com/spreadsheets/d/${list[0].id}/edit`);
        fetchSheetRows(accessToken, list[0].id);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Could not load spreadsheets from Drive.' });
    } finally {
      setIsBusy(false);
    }
  };

  const fetchSheetRows = async (accessToken: string, sheetId: string) => {
    try {
      const rows = await getSpreadsheetRows(accessToken, sheetId);
      setSheetRows(rows);
    } catch (err) {
      console.error(err);
      setSheetRows([]);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      soundFx.playShutterSound();
      setStatusMessage(null);
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        setStatusMessage({ type: 'success', text: `Signed in as ${res.user.email}!` });
        await loadSpreadsheets(res.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({ type: 'error', text: err.message || 'Google Sign-in failed.' });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setSpreadsheets([]);
    setSelectedSheetId('');
    setSheetRows([]);
    setStatusMessage({ type: 'info', text: 'Logged out of Google Sheets integration.' });
  };

  const handleCreateNewSheet = async () => {
    if (!token) return;
    try {
      setIsBusy(true);
      soundFx.playShutterSound();
      const newSheet = await createCamOnRentSpreadsheet(token, 'CamOnRent GoPro Rental Bookings');
      setStatusMessage({
        type: 'success',
        text: `Successfully created "${newSheet.name}" in Google Drive!`
      });
      await loadSpreadsheets(token);
      setSelectedSheetId(newSheet.id);
      if (newSheet.webViewLink) setSelectedSheetUrl(newSheet.webViewLink);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to create sheet.' });
    } finally {
      setIsBusy(false);
    }
  };

  const executeExport = async () => {
    if (!token || !selectedSheetId || !currentBookingToExport) return;
    try {
      setIsBusy(true);
      soundFx.playShutterSound();
      await appendBookingToSheet(token, selectedSheetId, currentBookingToExport);
      setStatusMessage({
        type: 'success',
        text: `Booking ${currentBookingToExport.bookingId} exported to Google Sheet!`
      });
      setShowConfirmModal(false);
      await fetchSheetRows(token, selectedSheetId);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Export failed.' });
    } finally {
      setIsBusy(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black font-heading text-white flex items-center gap-2">
              Google Sheets <span className="text-amber-400">Sync & Export</span>
            </h2>
            <p className="text-xs text-slate-400">
              Export GoPro rental quotes, customer bookings & inventory logs directly to Google Sheets
            </p>
          </div>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : statusMessage.type === 'error'
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Account Authentication Section */}
        {!user ? (
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-center flex flex-col items-center my-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Connect Your Google Account</h3>
            <p className="text-xs text-slate-400 max-w-md mb-6">
              Sign in with Google to enable 1-click Google Sheets export for rental quotes, customer bookings, and automatic spreadsheet creation in your Google Drive with permission.
            </p>

            {/* Google Material Sign In Button */}
            <button
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 font-bold px-6 py-3 rounded-2xl hover:bg-slate-100 transition shadow-lg shadow-white/10 text-sm cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isSigningIn ? 'Signing in...' : 'Sign in with Google'}</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Authenticated Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'User'} className="w-10 h-10 rounded-full border border-slate-700" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/40">
                    {user.email?.charAt(0).toUpperCase() || 'G'}
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-400">Connected Account</p>
                  <p className="text-sm font-bold text-white">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-red-400 transition bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>

            {/* Target Spreadsheet Manager */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Table className="w-4 h-4 text-emerald-400" />
                  Select Target Google Spreadsheet
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => token && loadSpreadsheets(token)}
                    disabled={isBusy}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
                    title="Refresh spreadsheets"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isBusy ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleCreateNewSheet}
                    disabled={isBusy}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create "CamOnRent Bookings" Sheet</span>
                  </button>
                </div>
              </div>

              {spreadsheets.length > 0 ? (
                <div className="flex items-center gap-3">
                  <select
                    value={selectedSheetId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedSheetId(id);
                      const s = spreadsheets.find((item) => item.id === id);
                      if (s) {
                        setSelectedSheetUrl(s.webViewLink || `https://docs.google.com/spreadsheets/d/${id}/edit`);
                        if (token) fetchSheetRows(token, id);
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {spreadsheets.map((sheet) => (
                      <option key={sheet.id} value={sheet.id}>
                        {sheet.name}
                      </option>
                    ))}
                  </select>

                  {selectedSheetUrl && (
                    <a
                      href={selectedSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 text-amber-400 hover:bg-slate-700 transition flex items-center justify-center shrink-0"
                      title="Open in Google Sheets"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No spreadsheets found. Click "Create 'CamOnRent Bookings' Sheet" above to set one up instantly!
                </p>
              )}
            </div>

            {/* Current Booking Export Option */}
            {currentBookingToExport && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-md uppercase">
                      Ready to Export
                    </span>
                    <span className="text-xs font-bold text-white">
                      Booking ID: {currentBookingToExport.bookingId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {currentBookingToExport.bundleName} &bull; {currentBookingToExport.cameraName} &bull; {currentBookingToExport.durationDays} Days (₹{currentBookingToExport.totalPrice})
                  </p>
                </div>

                <button
                  onClick={() => setShowConfirmModal(true)}
                  disabled={!selectedSheetId || isBusy}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Export to Google Sheet</span>
                </button>
              </div>
            )}

            {/* Live Sheet Data Table Preview */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Table className="w-3.5 h-3.5 text-blue-400" />
                  Live Google Sheet Data Preview
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {sheetRows.length} Rows Loaded
                </span>
              </div>

              {sheetRows.length > 0 ? (
                <div className="overflow-x-auto max-h-48 rounded-xl border border-slate-800">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-amber-400 border-b border-slate-800">
                        {sheetRows[0]?.map((cell, idx) => (
                          <th key={idx} className="p-2 font-bold whitespace-nowrap">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {sheetRows.slice(1).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-900/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-2 whitespace-nowrap">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 italic">
                  Select or create a sheet above to preview records.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Modal for Export */}
        {showConfirmModal && currentBookingToExport && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full text-slate-100 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 text-amber-400">
                <UploadCloud className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Confirm Google Sheets Export</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to append booking <strong className="text-amber-400">{currentBookingToExport.bookingId}</strong> ({currentBookingToExport.bundleName}, ₹{currentBookingToExport.totalPrice}) to your selected Google Sheet?
              </p>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] space-y-1 text-slate-400">
                <p><strong className="text-white">Customer:</strong> {currentBookingToExport.customerName || 'Guest User'} ({currentBookingToExport.phone || 'N/A'})</p>
                <p><strong className="text-white">Camera & Days:</strong> {currentBookingToExport.cameraName} ({currentBookingToExport.durationDays} Days)</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={executeExport}
                  disabled={isBusy}
                  className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Export</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
