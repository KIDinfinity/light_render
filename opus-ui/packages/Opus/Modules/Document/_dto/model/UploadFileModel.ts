import type { DocumentInfoModel } from './DocumentInfoModel';
import type { FileModel } from './FileModel';

export interface UploadFileModel extends DocumentInfoModel {
  file?: FileModel | any;
  fileId?: string | number;
}
