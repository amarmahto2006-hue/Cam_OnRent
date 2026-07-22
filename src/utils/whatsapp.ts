import confetti from 'canvas-confetti';
import { BUSINESS_CONFIG } from '../data/rentalData';
import { LeadFormData } from '../types';

export function openWhatsAppBooking(details: {
  cameraName?: string;
  rentalPeriod?: string;
  startDate?: string;
  accessories?: string[];
  totalEstimate?: number;
  userName?: string;
  phone?: string;
  location?: string;
  notes?: string;
}) {
  const {
    cameraName = 'GoPro HERO 12 Black',
    rentalPeriod = '1 Day (24 hrs)',
    startDate = 'As soon as possible',
    accessories = [],
    totalEstimate,
    userName = '',
    location = 'Ramgarh Pickup',
    notes = '',
  } = details;

  let msg = `*Hi CamOnRent! I want to rent a camera.* 🎥\n\n`;
  msg += `📍 *Location:* ${location}\n`;
  msg += `📹 *Camera:* ${cameraName}\n`;
  msg += `⏱️ *Rental Period:* ${rentalPeriod}\n`;
  msg += `📅 *Start Date:* ${startDate}\n`;

  if (accessories.length > 0) {
    msg += `🎒 *Accessories:* ${accessories.join(', ')}\n`;
  }

  if (totalEstimate) {
    msg += `💰 *Estimated Total:* ₹${totalEstimate.toLocaleString('en-IN')}\n`;
  }

  if (userName) {
    msg += `👤 *My Name:* ${userName}\n`;
  }

  if (notes) {
    msg += `💬 *Note:* ${notes}\n`;
  }

  msg += `\nPlease confirm camera availability and booking details. Thank you!`;

  const encoded = encodeURIComponent(msg);
  const waUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappPhone}?text=${encoded}`;

  // Trigger celebration confetti
  triggerConfetti();

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

export async function submitLeadToCRM(formData: LeadFormData): Promise<boolean> {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      phone: formData.phone,
      camera: formData.camera,
      duration: formData.duration,
      startDate: formData.startDate,
      deliveryOption: formData.deliveryOption,
      accessories: formData.selectedAccessories ? formData.selectedAccessories.join(', ') : 'None',
      message: formData.message || '',
      source: 'CamOnRent Web Platform',
    };

    // Send POST request (no-cors for Google Apps Script Web Apps compatibility)
    fetch(BUSINESS_CONFIG.appsScriptUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(err => console.log('Apps Script lead capture background info:', err));

    return true;
  } catch (error) {
    console.warn('CRM Lead submission handled:', error);
    return true; // Graceful fallback
  }
}

export function triggerConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#2563eb', '#10b981', '#ffffff'],
    });
  } catch (e) {
    console.warn('Confetti fail:', e);
  }
}
