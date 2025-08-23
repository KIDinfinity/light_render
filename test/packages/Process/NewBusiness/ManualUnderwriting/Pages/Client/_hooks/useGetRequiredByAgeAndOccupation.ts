import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetDefaultAdultAge from './useGetDefaultAdultAge';
import { formUtils } from 'basic/components/Form';
import { Required } from 'basic/components/Form';
import { caclculateSingleRule, Combine } from 'basic/components/Form/Rule';

export default ({ config, clientId }: IParams) => {
  const adultAge = useGetDefaultAdultAge();
  const personalInfo =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.personalInfo,
      shallowEqual
    ) || {};
  const backgroundInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.modalData?.entities?.clientMap?.[clientId]?.backgroundInfo,
    shallowEqual
  );
  const customerAge = formUtils.queryValue(personalInfo?.customerAge);
  const occupationCode = formUtils.queryValue(backgroundInfo?.occupationCode);
  const natureOfBusiness = formUtils.queryValue(backgroundInfo?.natureOfBusiness);
  return useMemo(() => {
    let requiredFlag = false;
    const requiredConfig = lodash.get(config, 'required');
    const requiredCondtion = lodash.chain(config).get('required-condition.conditions').value();
    const combine = lodash.get(config, 'required-condition.combine');
    if (requiredConfig === Required.Conditions && +adultAge >= 0) {
      const requiredResultByConfigList = lodash
        .chain(requiredCondtion)
        .map((item) => {
          let left;
          switch (item?.left?.field) {
            case 'natureOfBusiness':
              left = natureOfBusiness;
              break;
            case 'occupationCode':
              left = occupationCode;
              break;
          }
          if (item?.left?.field) {
            return caclculateSingleRule({
              left,
              operator: item.operator,
              right: item.right,
            });
          }
          return undefined;
        })
        .filter((item) => !lodash.isUndefined(item))
        .value();
      if (customerAge >= adultAge) {
        //配置的是成年人中不required,其余required
        let conditionRequiredResult;
        if (combine === Combine.AND) {
          conditionRequiredResult = !lodash.every(
            requiredResultByConfigList,
            (result: boolean) => result
          );
        }
        if (combine === Combine.OR) {
          conditionRequiredResult = !lodash.some(
            requiredResultByConfigList,
            (result: boolean) => result
          );
        }
        requiredFlag = conditionRequiredResult;
      }
    } else if (requiredConfig === Required.Yes) {
      requiredFlag = true;
    }
    return requiredFlag;
  }, [adultAge, natureOfBusiness, occupationCode, customerAge, config]);
};
