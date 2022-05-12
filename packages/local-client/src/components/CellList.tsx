import "./CellList.css";
import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";
import { useActions } from "../hooks/useActions";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    const cell = state.cell;
    const { order, data } = cell!;
    return order.map((id) => {
      return data[id];
    });
  });
  const { fetchCells } = useActions();
  useEffect(() => {
    fetchCells();
  }, []);
  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItem key={cell.id} cell={cell} />
        <AddCell previousCellId={cell.id} />
      </Fragment>
    );
  });
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
