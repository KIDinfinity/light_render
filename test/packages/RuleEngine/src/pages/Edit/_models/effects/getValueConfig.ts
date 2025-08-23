import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getAtomUsageList } from '@/services/ruleEngineRuleAtomConfControllerService';
import { tenant } from '@/components/Tenant';
import { serialize as objectToFormData } from 'object-to-formdata';
import { RuleType } from '../../Enum';

export default function* (action: any, { call, put, select }: any) {
  const { type, atomCode } = action.payload;

  const submitRuleSet = yield select((state: any) => state.ruleEngineController.submitRuleSet);
  const configData = yield select((state: any) => state.ruleEngineController.configData);
  const moduleCode = formUtils.queryValue(submitRuleSet?.ruleSetInfo?.moduleCode) || '';

  const extraParams: any = {};

  if (type === RuleType.Conditions) {
    extraParams.conditionActivated = 'Y';
  }
  if (type === RuleType.Results) {
    extraParams.resultActivated = 'Y';
  }

  const newConfigData = lodash.cloneDeep(configData);

  const response = yield call(
    getAtomUsageList,
    objectToFormData({
      regionCode: tenant.region(),
      moduleCode,
      ...extraParams,
      atomCode,
    })
  );
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const { atomDatas, ruleDomainAtomUsageList, groupDatas } = response.resultData;

    const configList = [
      !lodash.isEmpty(atomDatas)
        ? {
            domain: 'Possible Values',
            childrens: lodash.map(atomDatas, (item: any) => {
              return {
                ...item,
                atomCode: item.dictCode,
                atomName: item.dictName,
                isparam: true,
              };
            }),
          }
        : false,
      !lodash.isEmpty(groupDatas)
        ? {
            domain: 'Group Datas',
            childrens: lodash.map(groupDatas, (item: any) => {
              return {
                ...item,
                dictName: item.groupName,
                atomCode: item.groupId,
                atomName: item.groupName,
                isparam: true,
              };
            }),
          }
        : false,
      ...ruleDomainAtomUsageList,
    ].filter((item) => item);

    newConfigData.valueList = configList;

    yield put({
      type: 'saveState',
      payload: {
        configData: newConfigData,
      },
    });
    return configList;
  }
}
