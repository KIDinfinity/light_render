import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { byCaseNo } from '@/services/docViewControllerService';
import { checkLinkageFields } from '../../_functions';

/**
 * 从task detail中获取case information
 */
export default function* getDocuments({ payload }: any = {}, { call, put, select }: any) {
  let { caseNo, inquiryBusinessNo } = payload;

  const { dropdownConfigure, fieldConfigure, commonAuthorityList, caseInfo } = yield select(
    ({ documentManagement, authController }: any) => ({
      dropdownConfigure: documentManagement.dropdownConfigure,
      fieldConfigure: documentManagement.fieldConfigure,
      commonAuthorityList: authController.commonAuthorityList,
      caseInfo: documentManagement.caseInfo,
    })
  );
  if (!caseNo && !inquiryBusinessNo) {
    caseNo = caseInfo.processInstanceId;
    inquiryBusinessNo = caseInfo.processInstanceId;
  }

  const authBusinessNo: boolean = true;

  if (authBusinessNo) {
    yield put({
      type: 'getDocumentsByBusinessNo',
      payload: {
        inquiryBusinessNo,
      },
    });
  }

  const response = yield call(byCaseNo, objectToFormData({ caseNo }), {
    headers: { caseCategory: caseInfo?.caseCategory },
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    const { docViewVOList, mandatoryDocTypeCodeSet, totalDoc } = resultData;

    yield put({
      type: 'saveDocuments',
      payload: {
        documentList: checkLinkageFields(docViewVOList, dropdownConfigure, fieldConfigure),
      },
    });
    yield put({
      type: 'saveDocMandatory',
      payload: {
        docMandatoryList: mandatoryDocTypeCodeSet || [],
      },
    });
    yield put({
      type: 'saveState',
      payload: {
        documentNum: totalDoc,
      },
    });
  }
}
