import { Dispatch } from "redux";
import { CellTypes, Cell } from "./../Cell";
import ActionType from "../action-types";
import {
  MoveCellAction,
  UpdateCellAction,
  insertCellAfterAction,
  DeleteCellAction,
  Direction,
  Action,
} from "../actions";
import bundle from "./../../bundler";
import axios from "axios";
import { RootState } from "../reducers";

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const insertCellAfter = (
  id: string | null,
  type: CellTypes
): insertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          error: result.error,
        },
      },
    });
  };
};

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });
    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");
      dispatch({
        type: ActionType.FETCH_CELLS_COMPLETE,
        payload: data,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.FETCH_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    try {
      const rootState = getState();
      const { data, order } = rootState.cell!;
      const cells = order.map((id) => data[id]);
      await axios.post("/cells", { cells });
    } catch (err: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: err.message,
      });
    }
  };
};
