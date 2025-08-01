import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useSettingStore from '@/stores/setting-store';
import { Button } from '@/components/ui/button';
import useTemplateStore from '@/stores/template-store';
import usePlaceholdersStore from '@/stores/placeholders-store';
import { Placeholder } from '@/types';
import { convertToBlade } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface VisualEditorProps {
  onChange: (content: string) => void;
  content: string;
  height?: string;
}

const onPlaceholderSelect = (editorRef, placeholder: Placeholder) => {
  if (editorRef.current) {
    editorRef.current.insertContent(
      `<span class="blade-placeholder" style="display: inline-block; background-color: red; border-radius: 4px; padding: 4px; display: inline; margin: 0;" contenteditable="false" data-blade="${editorRef.current.dom.encode(placeholder.hrid)}"><span class="placeholder-label">${editorRef.current.dom.encode(placeholder.description)}</span></span>`
    );
  }
};

const VisualEditor: React.FC<VisualEditorProps> = ({
  content,
  height = 'calc(100vh - 64px)',
  onChange,
}) => {
  const { t } = useTranslation();
  const { theme, language } = useSettingStore();
  const { setTemplate, template } = useTemplateStore();

  const editorRef = useRef<any>(null);

  const {
    placeholderForInsert,
    clearInsertPlaceholder,
    selectedPlaceholders,
  } = usePlaceholdersStore();

  useEffect(() => {
    if (placeholderForInsert) {
      onPlaceholderSelect(editorRef, placeholderForInsert.placeholder);
      clearInsertPlaceholder()
    }
  }, [placeholderForInsert]);


  const handleSave = () => {
    if (template && template.placeholders) {
      if (!editorRef.current) return;
      const html = editorRef.current.getContent({ format: 'html' });
      const bladeContent = convertToBlade(html.replace(/&gt;/g, '>'), selectedPlaceholders);
      setTemplate({ ...template, content: bladeContent });
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 pb-4">
      <div className="w-full flex justify-end">
        <Button
          className='cursor-pointer'
          onClick={handleSave}
          variant={'destructive'}
        >
          {t('editor.save')}
        </Button>
      </div>
      <div className='grow'>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          tinymceScriptSrc='/tinymce/tinymce.min.js'
          apiKey="your-api-key-here" // You'll need to replace this with your TinyMCE API key
          value={content}
          plugins={['table', 'directionality', 'preview']}
          onEditorChange={(content) => {
            onChange(content);
            if (template) {
              setTemplate({ ...template, htmlContent: content });
            }
          }}
          init={{
            language: language.key,
            language_url: '/ru.js',
            height: '100%',
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'help', 'wordcount', 'advlist'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
            content_css: theme === 'dark' ? 'dark' : 'default',
          }}
        />
      </div>
    </div>
  );
};

export default VisualEditor;
