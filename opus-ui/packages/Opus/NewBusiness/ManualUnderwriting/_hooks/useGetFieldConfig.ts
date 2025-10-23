import { Visible } from 'basic/components/Form';
import { Required, Editable } from 'basic/components/Form';
import { RuleByForm } from 'basic/components/Form/Rule';
import lodash, { isBoolean } from 'lodash';

interface ICalcRuleContext {
  state?: any;
  namespace?: string;
  form?: any;
  propsCondition?: boolean;
}
interface IPropsConfig {
  isShow?: boolean;
  editable?: boolean;
  field?: string;
  form: any;
  Rules?: any; // 传入的规则集合
  propsEditableCondition?: boolean; // 支持自定义 condition
  propsVisibleCondition?: boolean;
  propsRequiredCondition?: boolean;
}
interface IPropsRemoteConfig {
  activityCode: string;
  caseCategory: string;
  changeOperation: string;
  changeParam: string;
  changeResultLimitMin: string;
  field: string;
  'field-props': {
    editable: Editable;
    visible: Visible;
    required: Required;
    label: {
      dictCode: string;
      dictTypeCode: string;
    };
  };
}
const mergeAbility = (propsBoolean: any, remoteYN: any, localYN: any) => {
  return isBoolean(propsBoolean)
    ? propsBoolean
      ? remoteYN || localYN
      : Visible.No
    : remoteYN || localYN;
};
// 合并localConfig和remoteConfig
export const mergeConfig = (
  propsConfig: IPropsConfig,
  remoteConfig: IPropsRemoteConfig,
  localConfig: any
) => {
  const remoteFieldConfig = remoteConfig['field-props'];
  if (!localConfig)
    return {
      ...remoteFieldConfig,
      name: remoteConfig.field || propsConfig.field,
    };
  if (!remoteConfig)
    return {
      ...localConfig,
      name: propsConfig.field,
    };
  const { editable, visible, required, ...rest } = remoteFieldConfig;
  return {
    ...localConfig,
    ...rest,
    editable: mergeAbility(propsConfig?.editable, editable, localConfig.editable),
    editableCondition: remoteFieldConfig['editable-condition'] || localConfig['editable-condition'],
    visible: mergeAbility(propsConfig?.isShow, visible, localConfig.visible),
    visibleCondition: remoteFieldConfig['visible-condition'] || localConfig['visible-condition'],
    required: required || localConfig.required,
    requiredCondition: remoteFieldConfig['required-condition'] || localConfig['required-condition'],
    name: remoteConfig.field || propsConfig.field,
    rules: remoteFieldConfig['x-rules'] || localConfig['x-rules'],
    label: {
      ...localConfig.label,
      ...remoteFieldConfig.label,
      dictCode: remoteFieldConfig.label?.dictCode || localConfig.label?.dictCode,
      dictTypeCode: remoteFieldConfig.label?.dictTypeCode || localConfig.label?.dictTypeCode,
    },
  };
};
// 根据Editable、Visible、Required的值，返回一个condition计算函数，函数的返回值为boolean
// 只支持FormCondition
export const abilityOption = (ability: Editable | Visible | Required, optimism?: boolean) => {
  // 默认乐观判断， conditions 为 undefined 时，返回 true 有能力
  const defaultResult = !isBoolean(optimism) || optimism;
  const calculateCurrentRule = (currentCondition?: any) => (context?: ICalcRuleContext) => {
    const { form, propsCondition } = context || {};
    if (typeof propsCondition === 'boolean') return propsCondition; // 支持自定义 condition
    if (!currentCondition) return defaultResult;
    return RuleByForm(currentCondition, form);
  };
  const AbilityMap: Record<
    Editable,
    (currentCondition?: any) => (context?: ICalcRuleContext) => boolean
  > = {
    Y: () => () => true,
    N: () => () => false,
    C: calculateCurrentRule,
  };
  const fn = AbilityMap[ability];
  if (fn) {
    return fn;
  }
  return () => () => true;
};

export default (propsConfig: IPropsConfig, remoteConfig: any, localConfig: any) => {
  const {
    form,
    Rules,
    propsEditableCondition,
    propsVisibleCondition,
    propsRequiredCondition,
  } = propsConfig;

  const {
    editable,
    visible,
    required,
    label,
    name,
    rules,
    editableCondition,
    visibleCondition,
    requiredCondition,
  } = mergeConfig(propsConfig, remoteConfig, localConfig);

  const calculatedEditable = abilityOption((editable as Editable) || Editable.No)(
    editableCondition
  )({
    form,
    propsCondition: propsEditableCondition,
  });
  const calculatedVisible = abilityOption((visible as Visible) || Visible.No)(visibleCondition)({
    form,
    propsCondition: propsVisibleCondition,
  });
  const calculatedRequired = abilityOption(
    (required as Required) || Required.No,
    false
  )(requiredCondition)({
    form,
    propsCondition: propsRequiredCondition,
  });
  const calculatedRules = lodash.compact(rules?.map((rule: string) => Rules[rule]));

  return {
    calculatedEditable,
    calculatedVisible,
    calculatedRequired,
    calculatedRules,
    label,
    name,
  };
};
