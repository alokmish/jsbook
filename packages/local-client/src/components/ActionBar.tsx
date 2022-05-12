import "./ActionBar.css";
import { useActions } from "./../hooks/useActions";
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineDelete,
} from "react-icons/ai";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        title="up"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <AiOutlineArrowUp />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        title="down"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <AiOutlineArrowDown />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        title="delete"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <AiOutlineDelete />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
