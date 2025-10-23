import _ from 'lodash';
import { useMemo } from 'react';
type ConditionBoolean = 'Y' | 'N' | 'C';
type SingleConditionType = {
  left: any;
  operator: '!==' | '===' | '>' | '<';
  right: any;
};
type MultiConditionType = {
  combine: '||' | '&&';
  conditions: SingleConditionType[];
};
type LabelConfigType = {
  dictTypeCode: string;
  dictCode: string;
};
type XDictConfigType = {
  dictTypeCode: string;
};
type LayoutUnitType = {
  span: number;
  offset: number;
  pull: number;
  order: number;
};
type XLayoutType = {
  xs: LayoutUnitType;
  sm: LayoutUnitType;
  md: LayoutUnitType;
  lg: LayoutUnitType;
  xl: LayoutUnitType;
  xxl: LayoutUnitType;
};
export type FieldPropConfigType = {
  name?: string;
  visible: ConditionBoolean;
  editable: ConditionBoolean;
  required: ConditionBoolean;
  'editable-condition'?: MultiConditionType;
  'required-condition'?: MultiConditionType;
  'visible-condition'?: MultiConditionType;
  label: LabelConfigType;
  'x-dict': XDictConfigType;
  'x-layout': XLayoutType;
  max: number;
  precision: number;
  min: number;
};
const useMergeFieldConfig = (
  localConfig: FieldPropConfigType,
  remoteConfig: FieldPropConfigType
) => {
  const config = useMemo(() => _.assign({}, localConfig, remoteConfig), [
    localConfig,
    remoteConfig,
  ]);
  return [config] as const;
};
export default useMergeFieldConfig;
