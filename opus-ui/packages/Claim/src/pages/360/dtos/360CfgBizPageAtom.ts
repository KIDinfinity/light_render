import type { ApiResponse } from '@/dtos/ApiResponse';

interface ResultData {
  id: string;
  creator: string;
  gmtCreate: string;
  modifier: string;
  gmtModified: string;
  deleted: 0 | 1;
  transId: string;
  regionCode: string;
  businessCode: string;
  sectionId: string;
  fieldId: string;
  dropdownTypeCode: string | null;
  applicable: 'Y' | 'N';
  typeCode: string;
  dictCode: string;
  order: number;
  span: number;
  offset: number;
  pull: number;
}

export interface FieldsConfigResponse extends ApiResponse {
  resultData: ResultData[];
}
