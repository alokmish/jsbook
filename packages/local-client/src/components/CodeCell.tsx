import './CodeCell.css';
import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import ResizeBox from './ResizeBox';
import { Cell } from '../state';
import { useActions } from './../hooks/useActions';
import { useTypedSelector } from './../hooks/useTypedSelector';
import useCumulativeCode from './../hooks/useCumulativeCode';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle![cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);
  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, createBundle, cumulativeCode]);
  const handleEditorChange = (value: string) => {
    updateCell(cell.id, value);
  };
  return (
    <ResizeBox direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <ResizeBox direction="horizontal">
          <CodeEditor initialValue={cell.content} onChange={handleEditorChange} />
        </ResizeBox>
        <div className="progress-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-cover">
              <progress className="progress is-primary is-small" max="100">
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </ResizeBox>
  );
};

export default CodeCell;
