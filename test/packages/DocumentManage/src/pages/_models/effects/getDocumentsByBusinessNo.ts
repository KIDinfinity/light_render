import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { ByBusinessNo } from '@/services/docViewControllerService';
import { checkLinkageFields } from '../../_functions';
/**
 * 从task detail中获取case information
 */
export default function* getDocumentsByBusinessNo({ payload }: any, { call, put, select }: any) {
  const { inquiryBusinessNo } = payload;
  const { caseInfo } = yield select(({ documentManagement, authController }: any) => ({
    caseInfo: documentManagement.caseInfo,
  }));

  const response = yield call(ByBusinessNo, objectToFormData({ inquiryBusinessNo }), {
    headers: { caseCategory: caseInfo?.caseCategory },
  });
  const { dropdownConfigure, fieldConfigure } = yield select(({ documentManagement }: any) => ({
    dropdownConfigure: documentManagement.dropdownConfigure,
    fieldConfigure: documentManagement.fieldConfigure,
  }));

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    const {
      docViewVOList: businessNoDocViewVOList,
      mandatoryDocTypeCodeSet: businessNoMandatoryDocTypeCodeSet,
      totalDoc: businessNoTotalDoc,
    } = response?.resultData || {};

    yield put({
      type: 'saveState',
      payload: {
        businessNoDocumentList: checkLinkageFields(
          businessNoDocViewVOList,
          dropdownConfigure,
          fieldConfigure
        ),
        businessNoDocumentNum: businessNoTotalDoc,
      },
    });
  }
}
