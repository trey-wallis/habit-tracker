export type ItemType = "in-control" | "out-of-control";

export interface Item {
  id: string;
  title: string;
  description?: string;
  type: ItemType;
  numPoints: number;
}

export interface Column {
  id: string;
  title: string;
  itemIds: string[];
  hidePoints?: boolean;
  type: ItemType | "any";
}
