import { produce } from 'immer';
import lodash from 'lodash';
import { EToolModules } from 'packages/Opus/Modules/Document/_dto/enums';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { fieldConfigure, uploadFiles, caseInfo } = draft;
    const fields = fieldConfigure[EToolModules.upload];
    const currentFileId = payload?.fileId;

    draft.uploadFiles = lodash.map(uploadFiles, (uploadFile) => {  
      if (currentFileId !== uploadFile.fileId) return uploadFile;
      
      const startsWithCLM = caseInfo?.caseCategory?.startsWith('PH_CLM') || caseInfo?.caseCategory?.startsWith('PH_AP');
      
      if (startsWithCLM) {
        return {
          ...uploadFile,
          indexClass: 'Claims',
          formCategory: 'Claims Form',
        };
      }

      return {
        ...uploadFile,
        indexClass:
          lodash.find(fields, (item: any) => item.fieldName === 'indexClass')?.defaultValue || '',
        formCategory:
          lodash.find(fields, (item: any) => item.fieldName === 'formCategory')?.defaultValue || '',
        docTypeCode:
          lodash.find(fields, (item: any) => item.fieldName === 'docTypeCode')?.defaultValue || '',
      };
    });
  });
};
