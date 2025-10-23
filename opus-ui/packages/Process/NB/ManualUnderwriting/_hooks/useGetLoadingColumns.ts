import { useMemo } from 'react';
import lodash from 'lodash';
import useGetTableColumnsByPageConfig from 'basic/hooks/useGetTableColumnsByPageConfig';
import { cacluateComboRule } from 'basic/components/Form/Rule';

export default ({ loadingRule, localConfig, displayUWMELink }: any) => {
  const columns = useGetTableColumnsByPageConfig({
    section: 'Loading-Field',
    localConfig,
  });
  return useMemo(() => {
    const extraRule = {
      extraMortality: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: 'N',
              right: loadingRule?.meAllowIndicator,
              operator: '!==',
            },
            {
              left: loadingRule,
              operator: 'empty',
            },
          ],
        },
      },
      emPeriod: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: 'N',
              right: loadingRule?.meAllowIndicator,
              operator: '!==',
            },
            {
              left: loadingRule,
              operator: 'empty',
            },
          ],
        },
      },
      pmPeriod: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: loadingRule?.rateAllowIndicator,
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
      pmLoading: {
        'visible-condition': {
          combine: '||',
          conditions: [
            {
              left: loadingRule?.rateAllowIndicator,
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
