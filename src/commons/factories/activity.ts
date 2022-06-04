import { ActivityOption } from "./activity-option";

export interface Activity {
  active: boolean;
  type: string;
  id: string;
  title?: string;
  description?: string;
  statement: string;
  options?: ActivityOption[];
  createdAt: string;
  updatedAt: string;
}
