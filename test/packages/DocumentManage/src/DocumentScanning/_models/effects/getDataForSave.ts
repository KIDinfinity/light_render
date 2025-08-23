import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getBase64 } from '../../utils';

export default function* (_: any, { select }: any) {
  const { claimProcessData, uploadFiles } = yield select((state: any) => ({
    ...state.documentScanningController,
    uploadFiles: state.documentManagement.uploadFiles,
  }));

  const uploadData = yield Promise.all(
    lodash.map(
      uploadFiles,
      (item: any) =>
        new Promise(async (resolve) => {
          const fileData = await getBase64(item.file);
          resolve({
            ...item,
            file: fileData,
          });
        })
    )
  );
  return formUtils.cleanValidateData({
    claimProcessData: {
      ...claimProcessData,
      uploadFiles: uploadData,
    },
  });
}
