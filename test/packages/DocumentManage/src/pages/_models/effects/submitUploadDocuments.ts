import lodash from 'lodash';
import { notification } from 'antd';
import { uploadDocInfo } from '@/services/docManagementControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { LS, LSKey } from '@/utils/cache';
import { formUtils } from 'basic/components/Form';
import type { UploadFileModel } from '../../_dto/model';
import { EToolModules } from '../../_dto/enums';
import { supplementDocIds } from '../../_functions';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { SourceOfDoc } from 'basic/enum';
/**
 * 提交 upload的document信息
 */
export default function* submitUploadDocuments(_: any, { call, put, select }: any) {
  const {
    caseInfo,
    uploadFiles,
    dropdownConfigure,
    clientObject,
    documentNum,
    businessNoDocumentNum,
  } = yield select(({ documentManagement }: any) => ({
    caseInfo: documentManagement.caseInfo,
    uploadFiles: documentManagement.uploadFiles,
    dropdownConfigure: documentManagement.dropdownConfigure,
    clientObject: documentManagement.clientObject,
    documentNum: documentManagement.documentNum,
    businessNoDocumentNum: documentManagement.businessNoDocumentNum,
  }));

  const {
    processInstanceId: caseNo,
    caseCategory,
    inquiryBusinessNo: parentBusinessNo,
    businessNo,
    policyNo,
  } = caseInfo;

  const sessionPolicyNo = LS.getItem(`${LSKey.DOCUMENT_POLICYNO}_${caseNo}`, false);

  // 过滤和添加一些field值
  let docInfoVOList = lodash.map(uploadFiles, ({ file, ...res }: UploadFileModel) => {
    const personalDocInd = lodash.find(
      dropdownConfigure,
      (item) =>
        item.indexClass === formUtils.queryValue(res?.indexClass) &&
        item.formCategory === formUtils.queryValue(res?.formCategory) &&
        item.docTypeCode === formUtils.queryValue(res?.docTypeCode)
    )?.personalDocInd;

    const { identityNo, identityType, customerRole, customerType, customerName, nric, otherId } =
      lodash.find(
        clientObject[personalDocInd],
        (item) => item.clientId === formUtils.queryValue(res?.clientId)
      ) || {};

    return {
      ...res,
      identityNo,
      identityType,
      customerRole,
      customerType,
      customerName,
      nric,
      otherId,
      caseNo,
      caseCategory,
      businessNo,
      parentBusinessNo,
      policyNo: sessionPolicyNo || policyNo,
      sourceOfDoc: SourceOfDoc.manualUpload,
    };
  });
  docInfoVOList = formUtils.cleanValidateData(docInfoVOList);

  const response = yield call(uploadDocInfo, docInfoVOList, {
    headers: {
      caseNo,
      businessNo,
    },
  });

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveState',
      payload: {
        documentNum: documentNum + 1,
        businessNoDocumentNum: businessNoDocumentNum + 1,
      },
    });
    yield put({
      type: 'selectToolItem',
      payload: { toolId: EToolModules.upload },
    });
    yield put({
      type: 'updateDocuments',
      payload: { documents: supplementDocIds(docInfoVOList, resultData), allUpdate: true },
    });
    yield put({
      type: 'saveUploadFiles',
      payload: { uploadList: resultData, files: uploadFiles },
    });

    yield put({
      type: 'removeUploadFile',
    });
    notification.success({
      message: formatMessageApi({ Label_COM_WarningMessage: 'NTF_000044' }),
    });

    yield put({
      type: 'solutionRead/setReadItem',
      payload: {
        subjectIdList: lodash.map(response?.resultData || [], ({ docId }: any) => docId),
        subjectType: ESubjectType.DOC,
      },
    });
  } else {
    notification.error({
      message: formatMessageApi({ Label_COM_WarningMessage: 'NTF_000046' }),
    });
  }
}
