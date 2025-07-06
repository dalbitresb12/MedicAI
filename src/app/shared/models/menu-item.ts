
export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string;
  command?: (context?: any) => void;
  visible?: boolean;
  items?: MenuItem[];
}
