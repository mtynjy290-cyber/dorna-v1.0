export type DoorSystemType = 
  | 'sliding' 
  | 'telescopic' 
  | 'manual_glass'
  | 'partition' 
  | 'shutter' 
  | 'revolving' 
  | 'smart_glass';

export interface ServiceItem {
  id: DoorSystemType;
  titleFa: string;
  titleEn: string;
  description: string;
  tagline: string;
  iconName: string;
  germanMotorCompatible: boolean;
  warrantyYears: number;
  featuredInDistricts: string[];
}

export interface TehranDistrict {
  id: string;
  name: string;
  zone: string;
  deliveryTimeDays: number;
  expressSurveyAvailable: boolean;
}

export interface CalculationInputs {
  systemType: DoorSystemType;
  widthMeters: number;
  heightMeters: number;
  leavesCount: number; // 1, 2, 4
  glassType: 'superclear_10mm' | 'laminated_12mm' | 'pdlc_smart' | 'tinted_bronze';
  operatorBrand: 'dunkermotoren_germany' | 'dormakaba_pro' | 'holux_exclusive' | 'dorna_standard';
  tehranDistrict: string;
  profileColor: 'anodized_black' | 'champagne_gold' | 'silver_metallic' | 'matte_anthracite';
  includeAccessControl: boolean;
}

export interface ProjectQuote {
  basePriceToman: number;
  glassPriceToman: number;
  chassisAndProfileToman: number;
  installationToman: number;
  totalPriceToman: number;
  estimatedCompletionDays: number;
  warrantyPeriodYears: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  viewsCount?: number;
  author?: {
    name: string;
    role: string;
  };
  keyTakeaways?: string[];
  relatedSlugs?: string[];
}
