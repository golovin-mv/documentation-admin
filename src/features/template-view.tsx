import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useTemplateStore from '@/stores/template-store';
import TemplateCard from '@/components/template/template-card';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface TemplateViewProps {
  onViewDetails?: (template: any) => void;
}

const TemplateView = ({ onViewDetails }: TemplateViewProps = {}) => {
  const { id: templateId } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { 
    template, 
    loadingStates,
    errors,
    loadTemplate, 
    clearLoadTemplateError 
  } = useTemplateStore();
  
  const isLoading = loadingStates.loadTemplate;
  const error = errors.loadTemplate;

  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId, loadTemplate]);

  // Handle missing templateId
  if (!templateId) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-600">{t('templateView.invalidId')}</h2>
          <p className="text-muted-foreground">{t('templateView.invalidIdMessage')}</p>
        </div>
      </div>
    );
  }

  const handleRetry = () => {
    clearLoadTemplateError();
    loadTemplate(templateId);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-muted-foreground">
          {t('placeholders.loading')}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-red-700">
            {t('placeholders.error')}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            {error}
          </p>
          <button
            onClick={handleRetry}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {t('templateView.retry')}
          </button>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="h-12 w-12 text-gray-400" />
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-600">
            {t('templateView.notFound')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('templateView.notFoundMessage')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('templateView.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('templateView.subtitle')}
          </p>
        </div>
        
        <TemplateCard 
          template={template} 
          onView={onViewDetails}
        />
      </div>
    </div>
  );
};

export default TemplateView;
