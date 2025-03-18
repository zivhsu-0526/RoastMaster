export interface RoastingRecord {
  id: number;
  beanName: string;
  roastLevel: 'Light' | 'Medium Light' | 'Medium' | 'Medium Dark' | 'Dark';
  temperature: number;
  duration: number;
  date: Date;
  notes?: string;
}

export interface HeaderProps {
  toggleDrawer: () => void;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface RoastingRecordCardProps {
  record: RoastingRecord;
  onEdit: (record: RoastingRecord) => void;
  onDelete: (record: RoastingRecord) => void;
  onShare: (record: RoastingRecord) => void;
  onView: (record: RoastingRecord) => void;
}

export interface RoastingRecordFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (record: Omit<RoastingRecord, 'id' | 'date'>) => void;
  initialData?: RoastingRecord;
}
