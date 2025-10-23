import lodash from 'lodash';
import { notification } from 'antd';
import { allCategoryInformation } from '@/services/bpmInfoControllerService';
import type { IEffects } from '../interfaces/index';
import { LinkTo } from '../../enum';

/**
 * 获取linkTo 信息
 * @param {String} processInstanceId
 */
export default function* ({ payload }: any, { call, put, select }: IEffects) {
  const data = { ...payload, platformCode: 'opus' };
  const { classification } = lodash.pick(payload, 'classification');
  data.linkToList = [
    {
      linkToKey: LinkTo.case,
      linkToValue: classification?.caseNo,
    },
    {
      linkToKey: LinkTo.insured,
      linkToValue: lodash.get(classification, 'insuredId'),
    },
    ...(lodash.get(classification, 'policyIdList', [])?.map((id) => ({
      linkToKey: LinkTo.policy,
      linkToValue: id,
    })) || []),
  ].filter((i) => i.linkToValue);

  delete data.classification;

  const infoHistoryRes = yield call(allCategoryInformation, data);

  if (lodash.get(infoHistoryRes, 'success')) {
    yield put({
      type: 'setInfoHistory',
      payload: lodash.get(infoHistoryRes, 'resultData', []),
    });
  } else {
    notification.error({
      message: 'get allCategoryInformation fail!',
    });
  }
}
