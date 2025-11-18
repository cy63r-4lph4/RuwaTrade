export interface TemplateData {
  id?: number;
  title: string;
  category: string;
  price: number;
  description?: string;
  thumbnail: string|File ;
  images: { path: string }[];
  file?: File | null;
}
export interface DownloadableTemplate{
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  expires_at:string;
}

export interface TemplateSubmitData {
  id?: number;
  title: string;
  category: string;
  price: number;
  description?: string;
  thumbnail: string | File;
  file?: File;
  images: (string | File)[];
  imageOrder?: string[];
}




// Display version returned from backend (uses URLs)
export interface DisplayTemplate {
  id: number;
  title: string;
  category: string;
  price: number;
  description?: string;
  thumbnail: string; // URL
  images: { id: number; path: string }[]; // URL paths
  tags?:string[]
}

// UI component for drag & drop image grid
export interface ImageItem {
  id: string;
  url: string;           
  file?: File;           
  isNew?: boolean;        
}


// Props for your TemplateModal component
export interface TemplateModalProps {
  open: boolean;
  mode: "add" | "edit";
  templateData?: TemplateData;
  onClose: () => void;
  onSubmit: (data: TemplateSubmitData) => void;
}

export interface SortableImageProps {
  id: string;
  url: string;
  onRemove: () => void;
  isThumbnail: boolean; 
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

export interface TemplateActionsContextType {
  onEdit: (template: any) => void;
  onDelete: (templateId: number) => void;
  handleAdd: () => void;
  handleSubmit: (data: any) => void;
  onView: (template: any) => void;
  templates: DisplayTemplate[]; 
  currentPage?: number;
  totalPages?: number;
  goToPage?: (page: number) => void;
}
export interface CartItem {
  id:  number;
  title: string;
  price: number | string;
  thumbnail?: string;
}

export interface CartDrawerProps {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cart: CartItem[];
  handleRemove: (id: number) => void;
  removingId:number| null;
}