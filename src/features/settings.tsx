import React, { useContext } from "react";
import useSettingStore, { availableLanguages } from "@/stores/setting-store.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ThemeProviderContext } from "@/components/theme-provider.tsx";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const {
    theme,
    setTheme,
    documentGeneratorUrl,
    setDocumentGeneratorUrl,
    templateAccessUrl,
    setTemplateAccessUrl,
    fileConverterUrl,
    setFileConverterUrl,
    language,
    setLanguage
  } = useSettingStore();

  const { setTheme: setThemeContext } = useContext(ThemeProviderContext)

  const handleSwitchChange = (value: boolean) => {
    (value
      ? () => {
        setTheme("dark");
        setThemeContext("dark")
      }
      : () => {
        setTheme("light");
        setThemeContext("light")
      })()
  }

  const handleLanguageChange = (langKey: string) => {
    const selectedLanguage = availableLanguages.find(lang => lang.key === langKey);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  }

  return (
    <section className="h-full flex flex-col items-center justify-center">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>{t('settings.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <section className="max-w-md mx-auto p-4">
            <div className="mb-4">
              <label htmlFor="field1" className="block">{t('settings.docGenUrl')}</label>
              <Input
                type="url"
                name="dge"
                value={documentGeneratorUrl}
                onChange={e => setDocumentGeneratorUrl(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="field2" className="block">{t('settings.templateAccessUrl')}</label>
              <Input
                type="url"
                name="dta"
                value={templateAccessUrl}
                onChange={e => setTemplateAccessUrl(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="field3" className="block">{t('settings.fileConverterUrl')}</label>
              <Input
                type="url"
                name="fc"
                value={fileConverterUrl}
                onChange={e => setFileConverterUrl(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">{t('settings.language')}</label>
              <Select onValueChange={(value) => handleLanguageChange(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language.name} />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((lang) => (
                    <SelectItem value={lang.key}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4 flex items-center">
              <Switch
                id="switch"
                name="switch"
                checked={theme === 'dark'}
                onCheckedChange={handleSwitchChange}
                className="mr-2"
              />
              <label htmlFor="switch" className="text-gray-700">{t('settings.darkMode')}</label>
            </div>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}

export default Settings
