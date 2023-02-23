export interface Item {
  id: string;
  title: string;
  description?: string;
  type: "in-control" | "out-of-control";
  numPoints: number;
}
