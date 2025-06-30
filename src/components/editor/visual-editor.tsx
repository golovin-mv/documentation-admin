import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useSettingStore from '@/stores/setting-store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { convertFile } from '@/api/convert-api';
import useTemplateStore from '@/stores/template-store';
import usePlaceholdersStore from '@/stores/placeholders-store';
import { Placeholder } from '@/types';
import { convertToBlade } from '@/lib/utils';

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
  const { theme } = useSettingStore();
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const convertedContent = await convertFile(file);
        onChange(convertedContent);
        if (template) {
          setTemplate({ ...template, htmlContent: convertedContent });
        }
      } catch (error) {
        console.error('Error converting file:', error);
      }
    }
  };

  const handleSave = () => {
    if (template && template.placeholders) {
      if (!editorRef.current) return;
      const html = editorRef.current.getContent({ format: 'html' });
      console.log('HTML Content:', html.replace(/&gt;/g, '>'));
      const bladeContent = convertToBlade(html.replace(/&gt;/g, '>'), selectedPlaceholders);
      setTemplate({ ...template, content: bladeContent });
    }
  };

  return (
    <div className="h-full w-full flex flex-col gap-4">
      <div className="w-full flex gap-2">
        <Input
          type="file"
          accept=".doc,.docx"
          onChange={handleFileChange}
          className="w-full"
        />
        <Button onClick={handleSave} variant={'destructive'}>
          Save
        </Button>
      </div>
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
          height,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          skin: theme === 'dark' ? 'oxide-dark' : 'oxide',
          content_css: theme === 'dark' ? 'dark' : 'default',
        }}
      />
    </div>
  );
};

export default VisualEditor;
