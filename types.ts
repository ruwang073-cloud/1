export type CategoryId = 'parks' | 'policy' | 'academic' | 'career' | 'design_doc';

export interface ResourceItem {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  source?: string;
  updateFreq?: string;
  access?: 'Public' | 'Campus IP' | 'Subscription';
  isOfficial?: boolean;
}

export interface SectionData {
  id: CategoryId;
  label: string;
  iconName: string;
  description: string;
  items: ResourceItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
