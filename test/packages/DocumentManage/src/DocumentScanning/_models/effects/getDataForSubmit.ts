import lodash, { pick } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { eOperationType } from '@/enum/eOperationType';
import RelationShip from 'enum/RelationShip';
import { getBase64 } from '../../utils';
import { SourceOfDoc } from 'basic/enum';

export default function* ({ payload }: any, { select }: any) {
  const { taskDetail } = payload;
  const { claimProcessData, uploadFiles } = yield select((state: any) => ({
    ...state.documentScanningController,
    uploadFiles: state.documentManagement.uploadFiles,
  }));

  const docInfos = yield Promise.all(
    lodash.map(
      uploadFiles,
      (item: any) =>
        new Promise((resolve) => {
          getBase64(item.file).then((fileData) => {
            resolve({
              docTypeCode: item?.docTypeCode,
              fileFullName: item?.name,
              fileImageData: fileData,
              fileImageId: '999',
              formCategory: item?.formCategory,
              indexClass: item?.indexClass,
              policyNo: claimProcessData?.indexInformation?.insured?.policyNo,
              receivedDate: item.receivedDate,
              sourceOfDoc:
                claimProcessData?.type === 'PendingDocument'
                  ? SourceOfDoc.wakeupScanning
                  : SourceOfDoc.docScanning,
            });
          });
        })
    )
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
    ]),
    operationType: eOperationType.submit,
    businessData: {
      businessCode: 'BIZ001',
      interfaceId: 'OWB-REG',
      submissionType: claimProcessData?.type,
      submissionBatchDatas: [
        {
          businessData: {
            submissionChannel: '',
            ...claimProcessData?.indexInformation,
            incidentList: [
              {
                claimTypeArray: [claimProcessData?.indexInformation.claimType],
                claimType: claimProcessData?.indexInformation.claimType,
              },
            ],
            activityVariables: { isManual: 'Y' },
          },
          caseInfo: {
            relationShipWithNewCase: RelationShip.BUNDLEDCASE,
            requestCaseNo: taskDetail?.caseNo,
          },
          docInfos,
        },
      ],
    },
  });

  return submitData;
}
