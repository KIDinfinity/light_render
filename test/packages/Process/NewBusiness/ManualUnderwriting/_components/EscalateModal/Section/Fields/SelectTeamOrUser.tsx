import { Col } from 'antd';
import { Editable, FormItemSelect, Required, Rule, Visible } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import React from 'react';
import { localFieldConfig } from './SelectTeamOrUser.config';

export { localFieldConfig } from './SelectTeamOrUser.config';
import styles from '../../index.less';
import { ReactComponent as UpAndDownArrowIcon } from 'bpm/assets/up_down_arrow.svg';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
  const assigneeAndTeamList =
    useSelector(({ [NAMESPACE]: state }: any) => {
      return state?.assigneeAndTeamList;
    }, shallowEqual) || [];
  const dicts = lodash.map(assigneeAndTeamList, (item) => {
    return {
      dictCode: item?.userId || item?.teamCode,
      dictName: item?.userName || item?.teamName,
    };
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          className={styles.selectTeamOrUser}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          allowClear={false}
          suffix={<UpAndDownArrowIcon className={styles.upAndDownArrowIcon} />}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
