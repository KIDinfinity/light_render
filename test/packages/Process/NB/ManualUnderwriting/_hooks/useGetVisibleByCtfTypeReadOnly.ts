import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { caclculateSingleRule } from 'basic/components/Form/Rule';
import useGetCrtInfoList from 'process/NB/ManualUnderwriting/_hooks/useGetCrtInfoList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const hideFieldId = ['ctfStartDate', 'expiryDate'];
const hideField = ['SecondaryIdentityExpiryDate'];
export default ({ id, config }: any) => {
  const crtInfoList = useGetCrtInfoList({ id });
  const idDisplayConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.idDisplayConfigList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item: any) => {
        if (lodash.includes(hideFieldId, item?.field)) {
          const condition = lodash.get(item, '[field-props].[visible-condition]');
          const tragetCondition = lodash.get(condition, 'conditions[0].right');
          const operator = lodash.get(condition, 'conditions[0].operator');
          const visible = lodash.get(item, '[field-props].visible');
          const ctfType = lodash
            .chain(crtInfoList)
            .find((crtInfoItem: any) => crtInfoItem.type === 'P')
            .get('ctfType')
            .value();
          if (!lodash.isEmpty(idDisplayConfigList)) {
            const fieldDisplayConfigMap = {
              ctfStartDate: 'issueDate',
              expiryDate: 'expiryDate',
            };
            return lodash
              .chain(idDisplayConfigList)
              .some(
                (configItem: any) =>
                  configItem?.idType === ctfType &&
                  configItem?.[fieldDisplayConfigMap[item?.field]] === 'Y'
              )
              .value();
          }

          return visible === 'C'
            ? caclculateSingleRule({
                left: ctfType,
                right: tragetCondition,
                operator,
              })
            : true;
        }
        if (lodash.includes(hideField, item?.field)) {
          const StfType = lodash
            .chain(crtInfoList)
            .find((crtInfoItem: any) => crtInfoItem.type === 'S')
            .get('ctfType')
            .value();
          if (!lodash.isEmpty(idDisplayConfigList)) {
            return lodash
              .chain(idDisplayConfigList)
              .some((item: any) => item?.idType === StfType && item?.expiryDate === 'Y')
              .value();
          }
          return true;
        }
        return true;
      })
      .value();
  }, [config, crtInfoList, idDisplayConfigList]);
};
