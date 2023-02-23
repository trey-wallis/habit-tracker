import { Column } from "./types";

export const INITIAL_COLUMN_STATE: Column[] = [
  {
    id: "out-of-control",
    title: "Out of Control",
    itemIds: [],
    type: "out-of-control",
  },
  {
    id: "in-control",
    title: "In Control",
    itemIds: [],
    type: "in-control",
  },
  {
    id: "backlog",
    title: "Backlog",
    itemIds: ["1", "2", "3"],
    hidePoints: true,
    type: "any",
  },
];
