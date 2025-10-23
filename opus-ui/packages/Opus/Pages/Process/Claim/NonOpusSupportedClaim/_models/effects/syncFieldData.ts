import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { businessDataSync } from '../../utils';
import klipCaseDataMapping from '../functions/klipCaseDataMapping';
import { formUtils } from 'basic/components/Form';
import syncDataAuditLog from '../functions/syncDataAuditLog';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { claimInfoSync } from '@/services/claimOmneService';

export default function* (action: any, { call, put, select }: any) {
  if (!action?.payload) return;

  const taskDetail = yield select((state: any) => state.processTask.getTask);

  const businessData = yield select(
    (state: any) => state?.opusNonOpusClaimManagement?.businessData
  );

  const newBusinessData = klipCaseDataMapping(action?.payload, businessData);

  const dataForSubmit = formUtils.formatFlattenValue(formUtils.cleanValidateData(newBusinessData));

  const submitData = getSubmitData({ taskDetail, dataForSubmit });

  // gen auditLog item
  const auditLogData = syncDataAuditLog(businessData, action?.payload);

  const res = yield call(claimInfoSync, submitData);

  if (!Boolean(res?.success)) {
    handleErrorMessageIgnoreXErrorNotice(res);
    return;
  }
  if (res?.resultData) {
    const result = yield call(saveSnashot, {
      taskDetail,
      dataForSubmit: res?.resultData,
      optionType: EOptionType.Save,
    });
    if (result?.success && !!result?.versionNo) {
      yield put({
        type: 'task/saveVersion',
        payload: { currentVersion: result?.versionNo },
      });
    }

    // save auditLog
    yield put({
      type: 'auditLogController/addAuditLog',
      payload: auditLogData,
    });

    yield put({
      type: 'saveClaimProcessData',
      payload: businessDataSync(businessData, res?.resultData),
    });
  }
}
