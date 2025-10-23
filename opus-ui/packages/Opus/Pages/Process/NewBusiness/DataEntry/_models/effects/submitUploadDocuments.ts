import lodash from 'lodash';
import { uploadDocInfo } from '@/services/docManagementControllerService';
import { LS, LSKey } from '@/utils/cache';
import { formUtils } from 'basic/components/Form';
import type { UploadFileModel } from 'packages/Opus/Modules/Document/_dto/model';
import { supplementDocIds } from 'packages/Opus/Modules/Document/_functions';
import { ESubjectType } from '@/components/SolutionRead/Enums';
import { Action } from '@/components/AuditLog/Enum';
import { SourceOfDoc } from 'opus/Enums';

/**
 * 提交 upload的document信息
 */
export default function* submitUploadDocuments(payload: any, { call, put, select }: any) {
  const {
    //uploadFiles,
    documentNum,
    businessNoDocumentNum,
    getTask,
    policyNO,
    tempUploadFiles
  } = yield select(({ dataEntry,processTask }: any) => ({
    caseInfo: dataEntry.caseInfo,
    uploadFiles: dataEntry.uploadFiles,
    tempUploadFiles : dataEntry.tempUploadFiles,
    dropdownConfigure: dataEntry.dropdownConfigure,
    clientObject: dataEntry.clientObject,
    documentNum: dataEntry.documentNum,
    businessNoDocumentNum: dataEntry.businessNoDocumentNum,
    getTask: processTask.getTask,
    policyNO: dataEntry.processData.policyNoInfo.policyNo,
    dataEntry
  }));
  const {
    processInstanceId: caseNo,
    caseCategory,
    inquiryBusinessNo: parentBusinessNo,
    businessNo,
  } = getTask || {};

  const sessionPolicyNo = LS.getItem(`${LSKey.DOCUMENT_POLICYNO}_${caseNo}`, false);
  // 过滤和添加一些field值
  let docInfoVOList = lodash.map(tempUploadFiles, ({ file, ...res }: UploadFileModel) => {
    return {
      ...res,
      caseNo,
      caseCategory,
      businessNo,
      parentBusinessNo,
      policyNo: sessionPolicyNo || policyNO,
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

}
