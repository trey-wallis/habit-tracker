import { INITIAL_COLUMN_STATE } from "../../constants";
import { Column, Item } from "../../types";
import { STORAGE_KEY } from "./constants";
import { StorageState } from "./types";

export const loadState = (): StorageState => {
  const state = localStorage.getItem(STORAGE_KEY);
  if (state) {
    return JSON.parse(state);
  } else {
    return {
      columns: INITIAL_COLUMN_STATE,
      items: [],
    };
  }
};

export const saveState = (columns: Column[], items: Item[]) => {
  const json = JSON.stringify({
    columns,
    items,
  });
  localStorage.setItem(STORAGE_KEY, json);
};
