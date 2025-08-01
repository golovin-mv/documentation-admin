import { Template } from '@/types/template';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';

interface TemplateCardProps {
  template: Template;
  onView?: (template: Template) => void;
}

const TemplateCard = ({ template, onView }: TemplateCardProps) => {
  const { t, i18n } = useTranslation();

  const formatDate = (date: Date | string) => {
    const dateObj = date instanceof Date ? date : new Date(date);

    if (isNaN(dateObj.getTime())) {
      return 'Invalid Date';
    }

    const locale = i18n.language === 'ru' ? 'ru-RU' : 'en-US';
    return dateObj.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'bg-red-100 text-red-800 border-red-200';
    if (priority >= 5) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-green-100 text-green-800 border-green-200';
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">
              {template.name}
            </CardTitle>
          </div>
          <CardAction>
            Редактировать
          </CardAction>
        </div>
        {template.description && (
          <CardDescription className="mt-2">
            {template.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t('templateCard.contentType')}:</span>
              <span>{template.contentType.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t('templateCard.contentTypeHrid')}:</span>
              <span className="font-mono text-xs">{template.contentType.hrid}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t('templateCard.startDate')}:</span>
              <span>{formatDate(template.startDate)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t('templateCard.endDate')}:</span>
              <span>{formatDate(template.endDate)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t('templateCard.id')}: {template.id}</span>
          <span>•</span>
          <span>{t('templateCard.hrid')}: {template.hrid}</span>
          <span>•</span>
          <span>{t('templateCard.currentVersion')}: {template.version}</span>
        </div>
      </CardContent>

      {onView && (
        <CardFooter>
          <button
            onClick={() => onView(template)}
            className="w-full px-4 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
          >
            {t('templateCard.viewDetails')}
          </button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TemplateCard;
