import { ApiResponse } from './types/common';
import { TemplateListItem, ApiTemplate } from './types/template';

const getTemplateAccessUrl = () => {
  const settings = localStorage.getItem('setting');
  if (settings === null) {
    return ''
  }

  return JSON.parse(settings).state.templateAccessUrl
}

export const templateList = async (): Promise<TemplateListItem[]> => {
  const response = await fetch(`${getTemplateAccessUrl()}/api/v1/template/templates`);
  if (!response.ok) {
    throw new Error(`Failed to fetch templates: ${response.statusText}`);
  }
  const { data } = await response.json();
  return data;
}

export const getTemplate = async (id?: string): Promise<ApiResponse<ApiTemplate>> => {
  if (!id) {
    throw new Error('Template ID is required');
  }
  const response = await fetch(`${getTemplateAccessUrl()}/api/v1/template/templates/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch template: ${response.statusText}`);
  }
  return response.json();
}

export type { TemplateListItem }
