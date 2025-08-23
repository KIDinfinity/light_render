import React, { useEffect, useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  FormItemNumber,
  Required,
  Visible,
  RuleByForm,
  Validator,
  Editable,
} from 'basic/components/Form';
import useGetAgentData from 'process/NB/ManualUnderwriting/_hooks/useGetAgentData';
import { fieldConfig } from './CommissionSplitPercent.config';
import styles from '../../index.less';

export { fieldConfig } from './CommissionSplitPercent.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const agentData = useGetAgentData();
  const commissionSplitPercent = useMemo(() => {
    return lodash
      .chain(agentData)
      .filter((item) => item.id !== id)
      .map((item) => item.commissionSplitPercent)
      .value();
  }, [agentData, id]);
  const Rules = {
    VLD_000701: Validator.VLD_000701({
      agentData,
      id,
    }),
  };
  useEffect(() => {
    form.validateFields([field], {
      force: true,
    });
  }, [commissionSplitPercent, field]);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.CommissionSplitPercent}>
          <FormItemNumber
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            suffix={'%'}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
            hiddenPrefix
            precision={0}
          />
        </div>
      </Col>
    )
  );
};

const CommissionSplitPercent = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

CommissionSplitPercent.displayName = 'commissionSplitPercent';

export default CommissionSplitPercent;
