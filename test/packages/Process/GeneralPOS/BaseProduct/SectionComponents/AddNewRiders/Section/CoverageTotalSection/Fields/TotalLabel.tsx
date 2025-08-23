import React from 'react';
import { Col } from 'antd';
import { Visible, Rule } from 'basic/components/Form';
import { localFieldConfig } from './TotalLabel.config';
export { localFieldConfig } from './TotalLabel.config';
import styles from '../../../index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { useSelector } from 'dva';

const FormItem = ({ isShow, layout, form, editable, field, config, sclale }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const span = isDecision({ caseCategory }) ? 2 : 0;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col
        {...layout}
        className={styles.totalLabel}
        style={{
          width: `calc((1443px * ${sclale || 0.96} - 32px) / 24 * ${
            (config?.['x-layout']?.lg?.span || fieldProps?.['x-layout']?.lg?.span) + span
          })`,
          padding: 8,
        }}
      >
        {formatMessageApi({
          [config?.label?.dictTypeCode || fieldProps.label.dictTypeCode]:
            config?.label?.dictCode || fieldProps.label.dictCode,
        })}
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
