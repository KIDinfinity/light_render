import { produce } from 'immer';
import lodash from 'lodash';

const saveClaimProcessDataUploadFiles = (state: any, { payload }: any) => {
  const { uploadFiles = [], ocrResultList = [] } = payload;
  const nextState = produce(state, (draftState) => {
    const uploadFilesOmitFiles = lodash.map(uploadFiles, (item) => {
      return lodash.omit(item, ['files']);
    });

    draftState.businessData.claimProcessData[0].uploadFiles = [
      ...(state?.businessData?.claimProcessData?.[0]?.uploadFiles || []),
      ...uploadFilesOmitFiles,
    ];

    draftState.businessData.claimProcessData[0].ocrResultList = [
      ...(state?.businessData?.claimProcessData?.[0]?.ocrResultList || []),
      ...ocrResultList,
    ];
  });
  return { ...nextState };
};

export default saveClaimProcessDataUploadFiles;
