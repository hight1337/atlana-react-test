import { User } from "./user";

export interface userApiResponse {
  data: {
    total_count: number;
    incomplete_results: boolean;
    items: User[];
  };
}
