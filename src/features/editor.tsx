//@ts-nocheck
import React, {useEffect, useRef} from "react";
import useHtmlStore from "@/stores/html-store.ts";
import {Editor} from "@monaco-editor/react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import Preview from "@/components/editor/preview.tsx";
import usePlaceholdersStore from "@/stores/placeholders-store.ts";
import Result from "@/components/editor/result.tsx";
import {emmetHTML} from "emmet-monaco-es";
import useSettingStore from "@/stores/setting-store.ts";

const HtmlEditor: React.FC = () => {
  const insertContent = (editor: typeof Editor, content: string) => {
    if (!editor) {
      return;
    }
    const op = {
      identifier: { major: 1, minor: 1 },
      range: editor.getSelection(),
      text: content,
      forceMoveMarkers: true
    };

    editor.executeEdits("my-source", [op]);
  };

  const {code, setCode} = useHtmlStore();
  const {htmlEditorTheme} = useSettingStore();

  const {
    placeholderForInsert,
    clearInsertPlaceholder
  } = usePlaceholdersStore();

  const editorRef = useRef(null);

  useEffect(() => {
    if (placeholderForInsert) {
      insertContent(editorRef.current, placeholderForInsert);
      clearInsertPlaceholder()
    }
  }, [placeholderForInsert]);

  return (
    <Tabs defaultValue="template" className="overflow-hidden h-full flex flex-col items-center">
      <TabsList className="mt-2">
        <TabsTrigger value="template">Template</TabsTrigger>
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="result">Test</TabsTrigger>
      </TabsList>
      <TabsContent value="template" className="h-full w-full">
        {'template'}
      </TabsContent>
      <TabsContent value="editor" className="h-full w-full">
        <div className="h-full w-full">
          <Editor
            style={{
              backgroundColor: '--background'
            }}
            height="calc(100vh - 64px)"
            defaultLanguage="php"
            defaultValue={code}
            onChange={setCode}
            language="php"
            theme={htmlEditorTheme}
            options={{
              minimap: {
                enabled: false
              },
              autoIndent: "advanced",
              autoClosingBrackets: "always",
              autoClosingQuotes: "always",
              wordWrap: "on",
            }}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
              emmetHTML(
                monaco,
                ['html', 'php'],
              )

              editor.onKeyDown((event) => {
                // select enabled languages
                const enabledLanguages = ["html", "markdown", "javascript", "typescript", "php"]; // enable js & ts for jsx & tsx

                const model = editor.getModel();
                if (!enabledLanguages.includes(model.getLanguageId())) {
                  return;
                }

                const isSelfClosing = (tag) =>
                  [
                    "area",
                    "base",
                    "br",
                    "col",
                    "command",
                    "embed",
                    "hr",
                    "img",
                    "input",
                    "keygen",
                    "link",
                    "meta",
                    "param",
                    "source",
                    "track",
                    "wbr",
                    "circle",
                    "ellipse",
                    "line",
                    "path",
                    "polygon",
                    "polyline",
                    "rect",
                    "stop",
                    "use",
                  ].includes(tag);

                // when the user enters '>'
                if (event.browserEvent.key === ">") {
                  const currentSelections = editor.getSelections();

                  const edits = [];
                  const newSelections = [];
                  // potentially insert the ending tag at each of the selections
                  for (const selection of currentSelections) {
                    // shift the selection over by one to account for the new character
                    newSelections.push(
                      new monaco.Selection(
                        selection.selectionStartLineNumber,
                        selection.selectionStartColumn + 1,
                        selection.endLineNumber,
                        selection.endColumn + 1,
                      ),
                    );
                    // grab the content before the cursor
                    const contentBeforeChange = model.getValueInRange({
                      startLineNumber: 1,
                      startColumn: 1,
                      endLineNumber: selection.endLineNumber,
                      endColumn: selection.endColumn,
                    });

                    // if ends with a HTML tag we are currently closing
                    const match = contentBeforeChange.match(/<([\w-]+)(?![^>]*\/>)[^>]*$/);
                    if (!match) {
                      continue;
                    }

                    const [fullMatch, tag] = match;

                    // skip self-closing tags like <br> or <img>
                    if (isSelfClosing(tag) || fullMatch.trim().endsWith("/")) {
                      continue;
                    }

                    // add in the closing tag
                    edits.push({
                      range: {
                        startLineNumber: selection.endLineNumber,
                        startColumn: selection.endColumn + 1, // add 1 to offset for the inserting '>' character
                        endLineNumber: selection.endLineNumber,
                        endColumn: selection.endColumn + 1,
                      },
                      text: `</${tag}>`,
                    });
                  }

                  // wait for next tick to avoid it being an invalid operation
                  setTimeout(() => {
                    editor.executeEdits(model.getValue(), edits, newSelections);
                  }, 0);
                }
              });

            }}
          />
        </div>
      </TabsContent>
      <TabsContent value="preview">
        <Preview code={code}/>
      </TabsContent >
      <TabsContent value="result" className="h-full w-full">
        <Result />
      </TabsContent>
    </Tabs>
  )
}

export default HtmlEditor
