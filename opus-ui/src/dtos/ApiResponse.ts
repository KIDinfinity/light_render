export interface ApiResponse {
  success: boolean;
  type: string | null;
  warnData: any | null;
  promptMessages: any[];
  resultData: any;
}
