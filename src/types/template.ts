import { ApiResponse } from '@/api/types/common';
import { ApiTemplate } from '../api/types/template';

export type Template = {
  id: number;
  hrid: string;
  name: string;
  version: string;
  startDate: Date;
  endDate: Date;
  priority: number;
  content: string;
  htmlContent: string | null;
  description: string | null;
  contentType: ContentType;
  placeholders: Placeholder[];
  condition: Condition | null;
};

export type ContentType = {
  id: number;
  hrid: string;
  name: string;
};

export type Placeholder = {
  id: number;
  hrid: string;
  path: string;
  formatMask: string | null;
  type: PlaceholderType;
  description: string | null;
};

export type PlaceholderType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'date'
  | 'select'
  | 'multiselect'
  | 'float'
  | 'int';

export type Condition = {
  hrid: string;
  name: string;
  conditionString: string;
  placeholders: Placeholder[];
};

// Маппер для преобразования API типов в типы приложения
export const mapApiTemplateToTemplate = (apiTemplate: ApiTemplate): Template => ({
  ...apiTemplate,
  startDate: new Date(apiTemplate.startDate),
  endDate: new Date(apiTemplate.endDate),
  htmlContent: apiTemplate.htmlContent ?? null,
  description: apiTemplate.description ?? null,
  placeholders: apiTemplate.placeholders.map(p => ({
    ...p,
    formatMask: p.formatMask ?? null,
    description: p.description ?? null,
    type: p.typeHrid as PlaceholderType
  })),
  condition: apiTemplate.condition ? {
    ...apiTemplate.condition,
    placeholders: apiTemplate.condition.placeholders.map(p => ({
      ...p,
      formatMask: p.formatMask ?? null,
      description: p.description ?? null,
      type: p.typeHrid as PlaceholderType
    }))
  } : null
});

export const mapApiResponseToTemplate = (response: ApiResponse<ApiTemplate>): Template | null => {
  if (response.error) {
    return null;
  }
  return mapApiTemplateToTemplate(response.data);
}; 
