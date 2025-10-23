import type { ToolsDataModel } from './ToolsDataModel';
import type { DocumentModel } from './DocumentModel';
import type { CaseInfoModel } from './CaseInfoModel';
import type { FieldConfigureModel } from './FieldConfigureModel';
import type { DropdownConfigureModel } from './DropdownConfigureModel';
import type { UploadFileModel } from './UploadFileModel';

export interface StateModel {
  documentList?: DocumentModel[];
  documentEdit?: DocumentModel;
  selectedDocId?: string;
  toolsData?: ToolsDataModel;
  fieldConfigure?: FieldConfigureModel[];
  dropdownConfigure?: DropdownConfigureModel[];
  caseInfo?: CaseInfoModel;
  uploadFiles?: UploadFileModel[];
  uploading?: boolean;
  dragging?: boolean;
  loading?: boolean;
  view?: FieldConfigureModel[];
  imageUrl?: string;
  readData?: any;
  isAssinee: boolean;
  ocrErrors?: any;
  selectedData: {
    isClickSelectAll: boolean;
    selectedDocs: Record<any, any>;
  };
}
