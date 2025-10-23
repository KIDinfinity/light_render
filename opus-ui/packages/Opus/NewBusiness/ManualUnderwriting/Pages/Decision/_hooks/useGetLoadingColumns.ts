import { useMemo } from 'react';
import lodash from 'lodash';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';
import { cacluateComboRule } from 'basic/components/Form/Rule';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default ({ loadingRule, localConfig, displayUWMELink }: any) => {
  const columns = useGetTableColumnsByPageConfig({
    section: 'Loading-Field',
    localConfig,
  });

  const companyCode = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.businessData?.laCompanyCode || '2';
  }, shallowEqual);

  return useMemo(() => {
    const extraRule = {
      fmPeriod: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: loadingRule?.feAllowIndicator,
              right: 'N',
              operator: '!==',
            },
            {
              left: loadingRule,
              operator: 'empty',
            },
          ],
        },
      },
      flatMortality: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: loadingRule?.feAllowIndicator,
              right: 'N',
              operator: '!==',
            },
            {
              left: loadingRule,
              operator: 'empty',
            },
          ],
        },
      },
      reason: () => {
        return !!displayUWMELink;
      },
      reasonInd: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: companyCode,
              right: '3',
              operator: '===',
            },
          ],
        },
      },
    };
    return lodash
      .chain(columns)
      .filter((column: any) => {
        const field = column.fieldName;
        if (lodash.isFunction(extraRule?.[field])) {
          return extraRule?.[field]();
        } else {
          const visibleCondition = lodash.get(extraRule, `${field}.visible-condition`);
          if (!lodash.isEmpty(visibleCondition)) {
            return cacluateComboRule(visibleCondition);
          }
        }

        return true;
      })
      .value();
  }, [columns, loadingRule, displayUWMELink]);
};
