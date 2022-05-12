import './TextEditor.css';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import { Cell } from '../state';
import { useActions } from './../hooks/useActions';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { updateCell } = useActions();
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (editorRef.current && event.target && editorRef.current.contains(event.target as Node)) {
        return;
      }
      setIsEditMode(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);
  if (isEditMode) {
    return (
      <div className="text-editor" ref={editorRef}>
        <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setIsEditMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
