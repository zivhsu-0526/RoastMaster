export interface Temperatures {
  time: number; //時間
  temperature: number; //溫度
}

export interface RoastingRecord {
  id: number;//編號
  beanName: string; //標題
  productionArea: string; //產區
  processingMethod: string; //處理方式
  greenCoffeeWeight: number; //生豆重量
  roastedCoffeeWeight: number; //烘焙後重量
  roastLevel: 'Light' | 'Medium Light' | 'Medium' | 'Medium Dark' | 'Dark'; //烘焙程度
  firstCrackTime?: number; //第一次爆裂時間
  firstCrackTemperature?: number; //第一次爆裂溫度
  secondCrackTime?: number; //第二次爆裂時間
  secondCrackTemperature?: number; //第二次爆裂溫度
  temperatures: Temperatures[]; //溫度曲線
  date: Date; //日期
  notes?: string; //備註
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
  viewMode?: boolean;
}
