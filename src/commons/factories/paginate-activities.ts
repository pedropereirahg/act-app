import { Activity } from "./activity";

export interface PaginateActivities {
  data: Activity[];
  count: number;
  currentPage: number;
  pages: number;
  perPage: number;
  total: number;
}
