import monaco from 'monaco-editor';
import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import './CodeEditor.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string | undefined, event: monaco.editor.IModelContentChangedEvent): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const onEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
  };
  const onFormatClick = () => {
    const unformattedCode = editorRef.current?.getModel()?.getValue();
    const formattedCode = prettier
      .format(unformattedCode!, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');
    editorRef.current?.setValue(formattedCode);
  };
  return (
    <div className="editor-wrapper">
      <button className="button button-format is-primary is-small" onClick={onFormatClick}>
        Prettify
      </button>
      <Editor
        onChange={onChange}
        onMount={onEditorDidMount}
        defaultValue={initialValue}
        height="100%"
        theme="vs-dark"
        language="javascript"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
