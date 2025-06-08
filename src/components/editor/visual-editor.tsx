import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useHtmlStore from '@/stores/html-store';
import useSettingStore from '@/stores/setting-store';

interface VisualEditorProps {
  onChange: (content: string) => void;
  content: string;
  height?: string;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ content, height = 'calc(100vh - 64px)', onChange }) => {
  const { theme } = useSettingStore();

  return (
    <div className="h-full w-full">
      <Editor
        apiKey="your-api-key-here" // You'll need to replace this with your TinyMCE API key
        value={content}
        onEditorChange={(content) => onChange(content)}
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
