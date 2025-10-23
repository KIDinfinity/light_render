import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import useGetReplacementFieldInfo from 'process/NB/ManualUnderwriting/_hooks/useGetReplacementFieldInfo';
import { formUtils } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import policyReplacementFirstField from 'process/NB/ManualUnderwriting/PolicyReplacement/Detail/policyReplacementFirstField';

export default () => {
  const dispatch = useDispatch();
  const policyReplacementInfo = useGetReplacementFieldInfo();

  const sectionConfig = useGetSectionAtomConfig({
    localConfig: {},
    section: 'PolicyReplacement-Field',
  });
  return useCallback(
    ({ name, value }) => {
      const pickKeys = lodash
        .chain(policyReplacementFirstField)
        .filter((key: string) => {
          return lodash.some(sectionConfig, (fieldItem: any) => {
            return (
              lodash.get(fieldItem, 'field-props.visible') === 'Y' &&
              lodash.get(fieldItem, 'field') === key
            );
          });
        })
        .value();
      const data = lodash
        .chain(
          formUtils.cleanValidateData({
            ...policyReplacementInfo,
            [name]: value,
          })
        )
        .pick(pickKeys)
        .values()
        .value();
      if (lodash.includes(policyReplacementFirstField, name)) {
        const policyReplacementFlag = (() => {
          if (lodash.every(data, (item) => item === 'N' || item == '0' || item == null)) {
            return 'N';
          }
          if (lodash.some(data, (item) => item === 'Y' || item == '1')) {
            return 'Y';
          }
          return '';
        })();
        if (policyReplacementFlag) {
          dispatch({
            type: `${NAMESPACE}/setPolicyReplacementData`,
            payload: {
              changedFields: {
                policyReplacementFlag,
              },
            },
          });
        }
      }
    },
    [dispatch, policyReplacementInfo, sectionConfig]
  );
};
