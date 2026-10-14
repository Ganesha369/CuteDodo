export interface WalletItem {
  id: string;
  name: string;
  role: string;
  address: string;
  description: string;
  country?: string;
  lockStatus: 'Never Sell Locked' | 'Public Multi-sig' | 'Active Dev';
  type: 'charity' | 'dev' | 'guardian';
}

export interface CharityMilestone {
  target: string;
  title: string;
  description: string;
  proof: string;
  completed: boolean;
  active: boolean;
  icon: string;
}

export interface DodoPhoto {
  id: string;
  title: string;
  subtitle: string;
  realImage: string;
  cartoonImage: string;
  tag: string;
  story: string;
}

export interface RoadmapPhase {
  phase: string;
  badge: 'Next' | 'Planned' | 'In Progress' | 'Completed';
  title: string;
  items: string[];
}

export interface ShelterCandidate {
  id: string;
  name: string;
  location: string;
  focus: string;
  votes: number;
  image: string;
}
