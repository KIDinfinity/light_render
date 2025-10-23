import { findPageAtomConfigByInformationType } from '@/services/miscPageAtomConfigControllerService';
import { tenant, Region } from '@/components/Tenant';
import { DedupCheckKeyByTransactionTypeEnum } from 'process/GeneralPOS/common/Enum';
import lodash from 'lodash';

export default function* getDedupCheckKey(_, { put, call, select }: any) {
  const { caseCategory, activityKey } = yield select(({ processTask }: any) => processTask.getTask);
  const defaultData = tenant.region({
    [Region.TH]: [
      [
        {
          sectionId: 'Nominee-User',
          fieldId: 'identityNo',
        },
        {
          sectionId: 'Nominee-User',
          fieldId: 'identityType',
        },
      ],
    ],
    notMatch: [
      {
        sectionId: 'Nominee-User',
        fieldId: 'dateOfBirth',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'firstName',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'middleName',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'surname',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'identityNo',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'identityType',
      },
      {
        sectionId: 'Nominee-User',
        fieldId: 'gender',
      },
    ],
  });
  const result = yield call(findPageAtomConfigByInformationType, {
    activityCode: activityKey,
    caseCategory,
    informationType: DedupCheckKeyByTransactionTypeEnum.SRV009,
    regionCode: tenant.region(),
  });

  if (result.success) {
    yield put({
      type: 'saveDedupCheckKey',
      payload: lodash.isEmpty(result.resultData) ? defaultData : result.resultData,
    });
  }
}
