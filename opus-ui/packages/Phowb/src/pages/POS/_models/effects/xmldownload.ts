import lodash from 'lodash';
import { xmldownload } from '@/services/posControllerService';
import TaskDefKey from 'enum/TaskDefKey';
import { formUtils } from 'basic/components/Form';
import { TransactionTypeCode, MailType } from '../../Enum/index';

export default function* ({ payload }: any, { call, select }: any) {
  const { businessNo } = payload;
  const { claimProcessData, taskDefKey } = yield select((state: any) => ({
    claimProcessData: state.phowbDataCaptureController.claimProcessData,
    taskDefKey: state.processTask.getTask?.taskDefKey,
  }));
  const transactionType = formUtils.queryValue(
    lodash.get(claimProcessData, 'posDataDetail.posRequestInformation.transactionType')
  );
  const mailType = formUtils.queryValue(
    lodash.get(claimProcessData, 'posDataDetail.requestOfMailsCertificatesCorrespondences.mailType')
  );
  if (
    taskDefKey === TaskDefKey.PH_POS_ACT001 &&
    transactionType === TransactionTypeCode.MailsCertificatesCorrespondences &&
    mailType === MailType.CertificateofPolicyInforce
  ) {
    yield call(xmldownload, {
      businessNo,
    });
  }
}
