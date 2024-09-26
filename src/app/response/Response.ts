export interface ApiResponse<Param> {
  timestamp: string;
  status: number;
  error: string | null;
  message: string;
  path: string;
  data: Param;
}
