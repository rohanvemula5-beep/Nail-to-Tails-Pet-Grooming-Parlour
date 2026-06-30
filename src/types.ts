export interface Appointment {
  id: string;
  ownerName: string;
  petName: string;
  petBreed: string;
  petType: 'dog' | 'cat' | 'other';
  location?: string;
  phone: string;
  serviceType: 'bath_brush' | 'full_groom' | 'spa_package' | 'nail_trim';
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  groundingSources?: Array<{
    title: string;
    uri: string;
  }>;
}

export interface StyledPetImage {
  id: string;
  prompt: string;
  imageUrl: string;
  aspectRatio: string;
  imageSize: string;
  model: string;
  createdAt: string;
}

export interface PetAnalysisResult {
  breedEstimate: string;
  coatType: string;
  groomingFrequency: string;
  healthObservations: string;
  recommendedStyles: string[];
  detailedAnalysis: string;
}

export interface PetWellnessPlan {
  petName: string;
  breed: string;
  age: string;
  groomingSchedule: string;
  coatCareInstructions: string;
  recommendedProducts: string[];
  dietWellnessAdvice: string;
  stylistNotes: string;
}
