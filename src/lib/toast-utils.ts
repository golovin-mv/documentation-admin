import { toast } from 'sonner';
import i18n from '@/lib/i18n';

export const showTemplateLoadError = (errorMessage?: string) => {
  toast.error(i18n.t('toasts.templateLoadError'), {
    description: errorMessage || i18n.t('toasts.templateLoadErrorDescription'),
    duration: 5000,
  });
};

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 4000,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 5000,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
    duration: 4000,
  });
};
