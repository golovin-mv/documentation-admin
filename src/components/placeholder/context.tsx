import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import React from "react";
import ReactJsonView from '@microlink/react-json-view';
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Button } from "@/components/ui/button.tsx";
import useSettingStore from "@/stores/setting-store.ts";
import { useTranslation } from "react-i18next";

const ContextEditor: React.FC = () => {
  const { setContext, parsedContext, enableContext, setEnableContext } = usePlaceholdersStore();
  const { jsonEditorTheme } = useSettingStore();
  const { t } = useTranslation();

  return (
    <div className="w-full px-2">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="context"
          checked={enableContext}
          onCheckedChange={setEnableContext}
        />
        <label
          htmlFor="context"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {t('contextEditor.enableContext')}
        </label>
      </div>
      <div>
        {enableContext &&
          <>
            <ReactJsonView
              style={{
                backgroundColor: 'var(--background)',
              }}
              iconStyle="square"
              theme={jsonEditorTheme}
              src={JSON.parse(parsedContext)}
              onEdit={({ updated_src }) => {
                setContext(JSON.stringify(updated_src))
              }}
              onAdd={({ updated_src }) => {
                setContext(JSON.stringify(updated_src))
              }}
              onDelete={({ updated_src }) => {
                setContext(JSON.stringify(updated_src))
              }}
              enableClipboard={false}
            />
            <Button
              className="w-full mt-4"
              variant="destructive"
              onClick={() => setContext('{}')}
            >{t('contextEditor.clearContext')}</Button>
          </>
        }
      </div>
    </div>
  );
}

export default ContextEditor;
