import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';
import { tenant, Region } from '@/components/Tenant';

export default function* addInformationRecord({ payload }: any, { put, select }: IEffects) {
  const { categoryCode, content } = lodash.pick(payload, ['categoryCode', 'content']);
  const id = uuidv4();
  const { currentActivity, addInformations, classification } = yield select((state: any) => ({
    currentActivity: state?.navigatorInformationController?.currentActivity,
    addInformations: state?.navigatorInformationController?.addInformations,
    classification: state?.navigatorInformationController?.classification,
  }));
  const ids = lodash.get(classification, 'policyIdList', []);
  const defaultCategoryCode = lodash.get(currentActivity, 'defaultCategoryCode');
  const policyIdList = (() => {
    if (ids?.length === 1) {
      return ids;
    }
    return [];
  })();

  const defaultRecord = {
    id,
    categoryCode: categoryCode || defaultCategoryCode,
    effectiveDate: moment().valueOf(),
    expiryDate: moment('2999-12-31').valueOf(),
    content: content || '',
    informationTab: tenant.region({
      [Region.MY]: ['case', 'insured', 'policy'],
      notMatch: ['case'],
    }),
    reason: null,
    policyIdList,
  };
  const newAddInformationList = [defaultRecord, ...addInformations];
  yield put({
    type: 'setAddInformations',
    payload: {
      record: newAddInformationList,
    },
  });
  yield put({
    type: 'setActiveEditTabs',
    payload: {
      activeEditTabs: [id],
    },
  });
  yield put({
    type: 'setExpenderContentModel',
    payload: {
      expenderModel: 'edit',
    },
  });
  yield put({
    type: 'saveSnapshot',
    payload: {
      data: newAddInformationList,
    },
  });
}
