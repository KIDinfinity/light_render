import { useMemo } from 'react';
import { useSelector } from 'dva';
import Rule from '../Rule';
import { Editable, Required, Visible } from '../constants';
import type { FieldPropConfigType } from './useMergeFieldConfig';

const useFieldConfig = (config: FieldPropConfigType, form: any) => {
  const VisibleCondition = Rule(config['visible-condition'], form, '');
  const editableCondition = Rule(config['editable-condition'], form, '');
  const requiredCondition = Rule(config['required-condition'], form, '');

  const visible = useMemo(
    () =>
      config.visible === Visible.Conditions ? VisibleCondition : config.visible === Visible.Yes,
    [VisibleCondition, config.visible]
  );
  const editable = useMemo(
    () =>
      config.editable === Editable.Conditions
        ? editableCondition
        : config.editable === Editable.Yes,
    [config.editable, editableCondition]
  );
  const required = useMemo(
    () =>
      config.required === Required.Conditions
        ? requiredCondition
        : config.required === Required.Yes,
    [config.required, requiredCondition]
  );

  const dicts = useSelector(
    ({ dictionaryController }: any) => dictionaryController[config['x-dict']?.dictTypeCode]
  );

  return [visible, editable, required, dicts] as const;
};

export default useFieldConfig;
