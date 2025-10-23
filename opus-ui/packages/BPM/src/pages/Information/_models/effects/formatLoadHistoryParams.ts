import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

/**
 * 加载information management入参
 * @param {array} tabs 类型队列
 * @param {Object} informationData case信息
 * @param {Object} classification 不同的类型下的link to information信息
 */

export default function* formatLoadHistoryParams(_: any, { select }: IEffects) {
  const navigatorInformationController = yield select(
    (state) => state.navigatorInformationController
  );
  const { tabs, informationData, classification } = navigatorInformationController;

  const values = formUtils.cleanValidateData(informationData);
  const linkToList: { linkToKey: string; linkToValue: any }[] = [];
  lodash.forEach(tabs, (item) => {
    if (item === 'case') {
      linkToList.push({
        linkToKey: 'case',
        linkToValue: classification.caseNo,
      });
    }
    if (item === 'insured') {
      const insuredId = lodash.get(classification, 'insuredId');
      if (insuredId) {
        linkToList.push({
          linkToKey: 'insured',
          linkToValue: insuredId,
        });
      }
    }
    if (item === 'policy') {
      const ids = lodash.get(classification, 'policyIdList', []);
      lodash.forEach(ids, (id) => {
        linkToList.push({
          linkToKey: 'policy',
          linkToValue: id,
        });
      });
    }
  });
  const params = {
    linkToList,
    ...values,
  };
  return params;
}
