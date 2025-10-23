import lodash from 'lodash';
import { Editable, Required, Rule } from 'basic/components/Form';
import type { CommonFormItemConfigProps } from '../typing';
import { getDrowDownList } from '@/utils/dictFormatMessage';

const getRuleValue = (props: any, key: string) => {
  const { form, config } = props;
  const conditions = lodash.isBoolean(props?.[`${lodash.camelCase(key)}s`]);

  if (conditions) {
    return props?.[`${lodash.camelCase(key)}s`];
  } else {
    return Rule(config?.[key], form, '');
  }
};

const getConfigProps = (props: CommonFormItemConfigProps) => {
  if (lodash.has(props, 'config')) {
    const { editable, field, config, Rules, dicts } = props || {};
    const { editable: configEditable, required, name, label, maxLength, rules } = config || {};
    const { dictCode, dictTypeCode } = label || {};

    return {
      ...props,
      disabled:
        !editable ||
        (configEditable === Editable.Conditions
          ? getRuleValue(props, 'editable-condition')
          : configEditable === Editable.No),
      required:
        required === Required.Conditions
          ? getRuleValue(props, 'required-condition')
          : required === Required.Yes,
      formName: name || field,
      labelId: dictCode,
      labelTypeCode: dictTypeCode,
      rules: rules ? lodash.compact(rules?.map((rule: string) => Rules?.[rule])) : [],
      dicts: dicts || getDrowDownList(config?.['x-dict']?.dictTypeCode),
      maxLength,
    };
  }

  return props;
};

export default getConfigProps;

export { getRuleValue };
