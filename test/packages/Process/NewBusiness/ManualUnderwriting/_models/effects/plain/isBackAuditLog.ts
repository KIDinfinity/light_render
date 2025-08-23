import { Action, ProcActivityKey } from '@/components/AuditLog/Enum';
import lodash from 'lodash';
import { denormalizeClaimData } from 'process/NewBusiness/ManualUnderwriting/_utils/normalizrUtils';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../../activity.config';
export default function* ({ payload }: any, { call, select, put }: any): Generator<any, any, any> {
  const { isBack, isSubmit = false } = payload;
  let newProcessData = {};
  if (isSubmit) {
    const { oldClaimData } = yield select((state: any) => {
      const taskIdTemp = state?.processTask?.getTask?.taskId;
      return {
        taskId: taskIdTemp,
        oldClaimData: state.auditLogController?.claimProcessData?.[taskIdTemp],
      };
    });
    newProcessData = lodash.cloneDeep(oldClaimData);
  } else {
    const modalData = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
    ) || {};
    const processData = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
    ) || {};
    const entities = yield select(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities
    );
    const denormalizedData = denormalizeClaimData(
      { ...processData, ...modalData.processData },
      { ...entities, ...modalData.entities }
    );
    newProcessData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  }

  lodash.set(newProcessData, 'planInfoData.isBack', isBack ? 'Y' : 'N');
  yield put({
    type: 'auditLogController/saveChangedFields',
    payload: {
      changedFields: {
        isBack: {
          label: 'Backdating',
          name: 'isBack',
          value: isBack ? 'Y' : 'N',
        },
      },
    },
  });
  yield put({
    type: 'auditLogController/logButton',
    payload: {
      action: Action.Save,
      activityKey: isSubmit ? ProcActivityKey.ManualUnderwriting : ProcActivityKey.ProposalChange,
      newProcessData,
      isTitleSection: true,
    },
  });
}
