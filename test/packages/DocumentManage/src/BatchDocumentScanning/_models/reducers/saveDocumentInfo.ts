import { produce }  from 'immer';
import get from 'lodash/get';
import map from 'lodash/map';
import has from 'lodash/has';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import { formUtils } from 'basic/components/Form';
import set from 'lodash/set';

export default (state: any, { payload }: any) => {
  const { sectionIndex, documentInfo, uploadFile } = payload;
  const nextState = produce(state, (draftState) => {
    const uploadFiles = get(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, []);
    const fileList = map(uploadFiles, (file) => {
      if (uploadFile.id === file.id) {
        const fileTemp = { ...file };
        if (keys(documentInfo).length === 1) {
          if (has(documentInfo, 'indexClass')) {
            if (!isEmpty(formUtils.queryValue(fileTemp.formCategory))) {
              fileTemp.formCategory = '';
            }
            if (!isEmpty(formUtils.queryValue(fileTemp.docTypeCode))) {
              fileTemp.docTypeCode = '';
            }
          }
          if (
            has(documentInfo, 'formCategory') &&
            !isEmpty(formUtils.queryValue(fileTemp.docTypeCode))
          ) {
            fileTemp.docTypeCode = '';
          }
          return { ...fileTemp, ...documentInfo };
        }
        return { ...file, ...documentInfo };
      }
      return file;
    });
    set(draftState, `claimProcessData[${sectionIndex}].uploadFiles`, fileList);
  });
  return { ...nextState };
};
