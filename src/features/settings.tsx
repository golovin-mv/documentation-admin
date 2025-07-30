import React, { useContext, useEffect, useState } from "react";
import useSettingStore, { availableLanguages } from "@/stores/setting-store.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ThemeProviderContext } from "@/components/theme-provider.tsx";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button.tsx";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const store = useSettingStore();
  const { setTheme: setThemeContext } = useContext(ThemeProviderContext);

  const [draft, setDraft] = useState(store);
  const [savedMessage, setSavedMessage] = useState('');

  useEffect(() => {
    setDraft(store);
  }, [store]);

  const handleLanguageChange = (langKey: string) => {
    const selectedLanguage = availableLanguages.find(lang => lang.key === langKey);
    if (selectedLanguage) {
      setDraft(prev => ({ ...prev, language: selectedLanguage }));
    }
  };

  const handleSave = () => {
    if (draft.theme !== store.theme) {
      setThemeContext(draft.theme);
    }

    store.setTheme(draft.theme);
    store.setDocumentGeneratorUrl(draft.documentGeneratorUrl);
    store.setTemplateAccessUrl(draft.templateAccessUrl);
    store.setFileConverterUrl(draft.fileConverterUrl);
    store.setLanguage(draft.language);

    setSavedMessage(t('settings.savedMessage'));
    setTimeout(() => setSavedMessage(''), 2000);
  };

  const handleReset = () => {
    setDraft(store);
  };

  const isChanged =
    store.theme !== draft.theme ||
    store.documentGeneratorUrl !== draft.documentGeneratorUrl ||
    store.templateAccessUrl !== draft.templateAccessUrl ||
    store.fileConverterUrl !== draft.fileConverterUrl ||
    store.language.key !== draft.language.key;

  return (
    <section className="h-full flex flex-col items-center justify-center w-full">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>{t('settings.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
            <div>
              <label htmlFor="docGenUrl" className="block mb-1">{t('settings.docGenUrl')}</label>
              <Input
                id="docGenUrl"
                type="url"
                value={draft.documentGeneratorUrl}
                onChange={e => setDraft(prev => ({ ...prev, documentGeneratorUrl: e.target.value }))}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="templateAccessUrl" className="block mb-1">{t('settings.templateAccessUrl')}</label>
              <Input
                id="templateAccessUrl"
                type="url"
                value={draft.templateAccessUrl}
                onChange={e => setDraft(prev => ({ ...prev, templateAccessUrl: e.target.value }))}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="fileConverterUrl" className="block mb-1">{t('settings.fileConverterUrl')}</label>
              <Input
                id="fileConverterUrl"
                type="url"
                value={draft.fileConverterUrl}
                onChange={e => setDraft(prev => ({ ...prev, fileConverterUrl: e.target.value }))}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="language-select" className="block mb-2">{t('settings.language')}</label>
              <Select value={draft.language.key} onValueChange={handleLanguageChange}>
                <SelectTrigger id="language-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.key} value={lang.key}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
              <Switch
                id="darkModeSwitch"
                checked={draft.theme === 'dark'}
                onCheckedChange={(isDark) => setDraft(prev => ({ ...prev, theme: isDark ? 'dark' : 'light' }))}
                className="mr-2"
              />
              <label htmlFor="darkModeSwitch">{t('settings.darkMode')}</label>
            </div>
            <div className="flex justify-end gap-2 items-center">
              {savedMessage && <span className="text-sm text-green-600">{savedMessage}</span>}
              <Button variant="outline" onClick={handleReset} disabled={!isChanged}>
                {t('settings.reset')}
              </Button>
              <Button onClick={handleSave} disabled={!isChanged}>
                {t('settings.save')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Settings;
