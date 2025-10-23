import pick from 'lodash/pick';
import { formUtils } from 'basic/components/Form';
import { eOperationType } from '@/enum/eOperationType';
import RelationShip from 'enum/RelationShip';
import map from 'lodash/map';
import get from 'lodash/get';
import moment from 'moment';

const mapSectionSubmitData = (claimProcessData: any, taskDetail: any) => {
  const uploadFiles = get(claimProcessData, 'uploadFiles', []);
  const docInfos = map(uploadFiles, (item: any) => ({
    docTypeCode: item?.docTypeCode,
    fileFullName: item?.name,
    formCategory: item?.formCategory,
    indexClass: item?.indexClass,
    policyNo: claimProcessData?.insured?.policyNo,
    receivedDate: item.receivedDate,
    docDataId: item.fileId,
  }));
  return {
    businessData: {
      submissionChannel: '',
      ...claimProcessData,
      incidentList: [
        {
          claimTypeArray: [claimProcessData?.claimType],
          claimType: claimProcessData?.claimType,
        },
      ],
      activityVariables: { isManual: 'Y' },
    },
    caseInfo: {
      relationShipWithNewCase: RelationShip.BUNDLEDCASE,
      requestCaseNo: taskDetail?.caseNo,
    },
    docInfos,
  };
};

export default function* ({ payload }: any, { put, select }: any) {
  const { taskDetail } = payload;
  const { type, claimProcessData } = yield select(
    ({ batchDocumentScanningController }) => batchDocumentScanningController
  );

  const submitData: any = formUtils.cleanValidateData({
    ...pick(taskDetail, [
      'caseNo',
      'taskId',
      'caseCategory',
      'businessNo',
      'inquiryBusinessNo',
      'submissionDate',
      'activityKey',
      'assessmentType',
      'companyCode',
    ]),
    submissionDate: moment().format(),
    operationType: eOperationType.submit,
    businessData: {
      businessCode: 'BIZ001',
      interfaceId: 'OWB-REG',
      submissionType: type,
      submissionBatchDatas: [
        ...map(claimProcessData, (data) => mapSectionSubmitData(data, taskDetail)),
      ],
    },
  });
  return submitData;
}
