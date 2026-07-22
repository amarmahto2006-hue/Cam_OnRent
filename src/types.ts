export interface CameraItem {
  id: string;
  name: string;
  tagline: string;
  badge?: string;
  image: string;
  dailyPrice: number;
  weekendPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  securityDeposit: number;
  specs: {
    videoResolution: string;
    photoResolution: string;
    stabilization: string;
    waterproof: string;
    batteryLife: string;
    weight: string;
  };
  features: string[];
  popularFor: string[];
}

export interface AccessoryItem {
  id: string;
  name: string;
  dailyPrice: number;
  image: string;
  description: string;
  specs: string;
  isBundle?: boolean;
  savingsBadge?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  verifiedRental: string;
  cameraRented: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'deposit' | 'delivery' | 'damage' | 'booking' | 'general';
}

export interface GalleryItem {
  id: string;
  title: string;
  creator: string;
  location: string;
  camera: string;
  category: 'vlog' | 'motovlog' | 'wedding' | 'travel' | 'adventure';
  imageUrl: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  camera: string;
  duration: string;
  startDate: string;
  deliveryOption: string;
  message?: string;
  selectedAccessories?: string[];
}

export interface BundleTemplate {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  badge: string;
  categoryTag: string;
  cameraId: string;
  durationDays: number;
  durationLabel: string;
  accessories: string[];
  deliveryOption: 'ramgarh_pickup' | 'ramgarh_delivery' | 'ranchi' | 'bokaro';
  suggestedNote: string;
  discountAmount: number;
  targetAudience: string;
  locationTip: string;
}

export interface CalculatorState {
  camera: CameraItem;
  days: number;
  accessories: string[];
  deliveryOption: 'ramgarh_pickup' | 'ramgarh_delivery' | 'ranchi' | 'bokaro';
  depositOption: 'cash' | 'id_card';
  appliedDiscount: boolean;
}
