import type { ReactNode } from 'react';
import React, { useContext } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';

import Context from './Context';
import ConfigContext from 'basic/components/Elements/Context';
import { RuleByData } from 'basic/components/Form';

import { NAMESPACE } from '../activity.config';

const { Provider } = Context;

interface Condition {
  left?: {
    domain?: string;
    field?: string;
  };
}

interface VisibleCondition {
  conditions?: Condition[];
}

interface FieldProps {
  visible?: string;
  'visible-condition'?: VisibleCondition;
}

interface ConfigItem {
  field: string;
  section: string;
  'field-props'?: FieldProps;
}

interface VisibleFieldConfig {
  field: string;
  section: string;
  visibleCondition?: VisibleCondition;
  triggerFields: string[];
  reducer: string;
}

interface IProps {
  children: ReactNode;
}

const reducerMap: Record<string, string> = {
  agentInfo: 'saveAgentInfo',
  insuredInfo: 'saveInsuredInfo',
  payorInfo: 'savePayorInfo',
  dividendICP: 'saveDividendICP',
  insuredHQ: 'saveInsuredHQ',
  payorHQ: 'savePayorHQ',
  insuredFATCA: 'saveInsuredFatca',
  insuredCRS: 'saveInsuredCrs',
  payorCRS: 'savePayorCrs',
};

const getVisibleConditionField = (config: ConfigItem[]): VisibleFieldConfig[] =>
  lodash(config)
    .filter((item) => {
      const fieldProps = item['field-props'] || {};
      const { visible, ['visible-condition']: visibleCondition } = fieldProps;
      return (
        visible === 'C' &&
        !lodash.isEmpty(visibleCondition) &&
        lodash.every(
          visibleCondition?.conditions,
          (condition) => condition.left?.domain === 'field'
        )
      );
    })
    .map((item) => {
      const fieldProps = item['field-props'] || {};
      const visibleCondition = fieldProps['visible-condition'];
      return {
        field: item.field,
        section: item.section,
        visibleCondition,
        triggerFields: lodash.uniq(lodash.map(visibleCondition?.conditions, 'left.field')),
        reducer: reducerMap[item.section],
      };
    })
    .value();

const assembleVisibleLinkTriggerConfig = (config: VisibleFieldConfig[]) => {
  const result: Record<string, VisibleFieldConfig[]> = {};
  config.forEach((item) => {
    item.triggerFields.forEach((field) => {
      const key = `${item.section}_${field}`;
      if (!result[key]) result[key] = [];
      result[key].push(item);
    });
  });
  return result;
};

export const useVisibleLinkFn = (config: VisibleFieldConfig[], field: string) => {
  const dispatch = useDispatch();

  return (value: any) => {
    const changedReducers = lodash(config)
      .filter(
        (item) =>
          !RuleByData(item.visibleCondition, {
            [field]: lodash.isObject(value) ? value?.target?.value : value,
          })
      )
      .groupBy('reducer')
      .value();

    if (lodash.isEmpty(changedReducers)) return;

    Object.entries(changedReducers).forEach(([reducer, items]) => {
      dispatch({
        type: `${NAMESPACE}/${reducer}`,
        payload: {
          changedFields: items.reduce((result: Record<string, undefined>, item) => {
            result[item.field] = undefined;
            return result;
          }, {}),
        },
      });
    });
  };
};

const VisibleContainer = ({ children }: IProps) => {
  const pageAtomConfig = useContext(ConfigContext)?.state?.pageAtomConfig || [];
  const visibleConditionFieldConfig = getVisibleConditionField(pageAtomConfig);
  const visibleLinkTriggerConfig = assembleVisibleLinkTriggerConfig(visibleConditionFieldConfig);

  return <Provider value={{ visibleLinkTriggerConfig }}>{children}</Provider>;
};

export default VisibleContainer;
