import { produce }  from 'immer';
import lodash from 'lodash';
import { getAuth } from '@/auth/Utils';

export default (state: any, { payload }: any = {}) => {
  const nextState = produce(state, (draft: any) => {
    const { commonAuthorityList } = payload;

    const auths = {
      upload: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_Upload',
      }),
      download: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_Download',
      }),
      view: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_View',
      }),
      void: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_Void',
      }),
      edit: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_Edit',
      }),
      delete: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_Delete',
      }),
      ocr: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_OCR',
      }),
      reIndex: getAuth(commonAuthorityList, {
        authorityCode: 'RS_BP_Button_DocMgm_ReIndex',
      }),
    };

    Object.keys(draft.toolsData).forEach((el: any) => {
      if (!lodash.isUndefined(auths[el])) {
        draft.toolsData[el].noAuth = !auths[el];
      }
    });

    return draft;
  });

  return {
    ...nextState,
  };
};
