export interface TemplateListItem {
  id: number;
  hrid: string;
  version: number;
  priority: number;
  description: string;
  contentType: ApiContentType;
  startDate: Date;
  endDate: Date;
}

export interface ApiTemplate {
  id: number;
  hrid: string;
  name: string;
  version: string;
  startDate: string;
  endDate: string;
  priority: number;
  content: string;
  htmlContent?: string;
  description: string | null;
  contentType: ApiContentType;
  placeholders: ApiPlaceholder[];
  condition?: ApiCondition;
}

export interface ApiContentType {
  id: number;
  hrid: string;
  name: string;
}

export interface ApiPlaceholder {
  id: number;
  hrid: string;
  path: string;
  formatMask?: string;
  typeHrid: string;
  description?: string;
}

export interface ApiCondition {
  hrid: string;
  name: string;
  conditionString: string;
  placeholders: ApiPlaceholder[];
}
