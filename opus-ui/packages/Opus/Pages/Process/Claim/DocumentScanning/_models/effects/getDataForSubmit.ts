import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import RelationShip from 'enum/RelationShip';
import { LS, LSKey } from '@/utils/cache';
import { NAMESPACE } from '../../activity.config';
import { SourceOfDoc } from 'opus/Enums';

export default function* ({ payload }: any, { select }: any): Generator<any, any, any> {
  const { taskDetail } = payload;

  const { type, claimProcessData = [] } = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      formUtils.cleanValidateData(modelnamespace?.businessData) || {}
  );
  const dropdownConfigure = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.dropdownConfigure || []
  );

  const submitData: any = {
    businessCode: LS.getItem(LSKey.CURRENTUSER).businessCode,
    interfaceId: 'OWB-REG',
    submissionType: type,
    submissionBatchDatas: lodash.map(claimProcessData, (item: any) => ({
      businessData: {
        submissionChannel: '',
        ...item,
        incidentList: [
          {
            claimTypeArray: item?.claimType,
            claimType: item?.claimType?.join(','),
          },
        ],
        activityVariables: { isManual: 'Y' },
        ocrResultList: item?.ocrResultList?.filter((i: { success?: boolean }) =>
          Boolean(i?.success)
        ),
      },
      caseInfo: {
        relationShipWithNewCase: RelationShip.BUNDLEDCASE,
        requestCaseNo: taskDetail?.caseNo,
      },
      docInfos: lodash.map(item?.uploadFiles || [], (docItem: any) => ({
        ...docItem,
        docTypeCode:
          lodash
            .chain(dropdownConfigure)
            .find((configItem: any) => configItem.id === docItem?.documentFileId)
            .get('docTypeCode')
            .value() || '',
        // 下面三个是后端需要的参数key
        fileFullName: docItem.name,
        policyNo: item?.policyNo,
        docDataId: docItem?.fileId,
        sourceOfDoc:
          claimProcessData?.type === 'PendingDocument'
            ? SourceOfDoc.wakeupScanning
            : SourceOfDoc.docScanning,
      })),
    })),
  };

  return submitData;
}
