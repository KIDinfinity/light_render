import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemTextArea,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import styles from './AssessmentRemark.less';

import { localFieldConfig } from './AssessmentRemark.config';

export { localFieldConfig } from './AssessmentRemark.config';
const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {!form.getFieldValue(config.name || localFieldConfig?.field) ? null : (
          <FormItemTextArea
            className={styles.assessmentRemark}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            form={form}
            formName={config.name || localFieldConfig?.field}
            autoSize={{ minRows: 1, maxRows: 10 }} // 根据内容自动调整高度，最多10行
          />
        )}
      </Col>
    )
  );
};

const AssessmentRemark = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

AssessmentRemark.displayName = localFieldConfig.field;

export default AssessmentRemark;
