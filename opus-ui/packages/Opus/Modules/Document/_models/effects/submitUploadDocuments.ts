import lodash from 'lodash';
import { uploadDocInfo } from '@/services/docManagementControllerService';
import { LS, LSKey } from '@/utils/cache';
import { formUtils } from 'basic/components/Form';
import type { UploadFileModel } from '../../_dto/model';
import { supplementDocIds } from '../../_functions';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { Action } from '@/components/AuditLog/Enum';
import { SourceOfDoc } from 'opus/Enums';

/**
 * 提交 upload的document信息
 */
export default function* submitUploadDocuments(payload: any, { call, put, select }: any) {
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
  const resMap = new Map();
  const responseList = yield lodash.map(docInfoVOList, (docInfoVOItem, key) => {
    resMap.set(key, docInfoVOItem?.fileId);
    const req = call(uploadDocInfo, [{ ...docInfoVOItem }], {
      headers: {
        caseNo,
        businessNo,
      },
    });

    return req;
  });
  const failFileList = lodash
    .chain(responseList)
    .map((item, key) => {
      return { fileId: resMap.get(key), ...item };
    })
    .filter(['success', false])
    .value();
  const successFileList = lodash
    .chain(responseList)
    .map((item, key) => {
      return { fileId: resMap.get(key), ...item };
    })
    .filter(['success', true])
    .map((item) => item?.resultData?.[0])
    .value();

  if (!lodash.isEmpty(successFileList)) {
    yield put({
      type: 'saveState',
      payload: {
        documentNum: documentNum + successFileList.length,
        businessNoDocumentNum: businessNoDocumentNum + successFileList.length,
      },
    });
    yield put({
      type: 'updateDocuments',
      payload: { documents: supplementDocIds(docInfoVOList, successFileList), allUpdate: true },
    });

    yield put({
      type: 'solutionRead/setReadItem',
      payload: {
        subjectIdList: lodash.map(successFileList || [], (item: any) => item?.docId),
        subjectType: ESubjectType.DOC,
      },
    });
    yield put({
      type: 'removeUploadFile',
      payload: lodash.map(successFileList, 'fileId'),
    });
    yield put({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.UploadDocument,
      },
    });
  }
  if (!lodash.isEmpty(failFileList)) {
    yield lodash.map(failFileList, (item) => {
      return put({
        type: 'documentManagement/saveDocumentInfo',
        payload: {
          documentInfo: { isFail: true, promptMessages: item?.promptMessages?.[0] },
          uploadFile: { fileId: item.fileId },
        },
      });
    });
    yield put({
      type: 'setUploadVisit',
      payload: {
        uploadVisit: true,
      },
    });
  } else {
    yield put({
      type: 'setUploadedVisibility',
      payload: {
        uploadedVisibility: true,
      },
    });
  }
  yield put({
    type: 'setConfirmationVisibility',
    payload: {
      confirmationVisibility: false,
    },
  });
}
