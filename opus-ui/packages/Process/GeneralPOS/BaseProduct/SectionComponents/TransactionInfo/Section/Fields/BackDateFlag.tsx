import React, { useEffect } from 'react';
import { Col } from 'antd';
import moment from 'moment';
import { Authority, Visible, FormItemText, Rule } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { localFieldConfig } from './BackDateFlag.config';
import { NAMESPACE } from '../../../../activity.config';

export { localFieldConfig } from './BackDateFlag.config';

export const FormItem = ({ isShow, layout, form, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );

  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const taskStatus = useSelector(({ processTask }: any) => processTask?.getTask?.taskStatus);

  const effectiveDate = form.getFieldValue('effectiveDate');

  useEffect(() => {
    if (effectiveDate && taskStatus && taskStatus !== 'completed') {
      dispatch({
        type: `${NAMESPACE}/transactionInfoUpdate`,
        payload: {
          changedFields: {
            [config.name || field]: moment(effectiveDate).isBefore(moment(), 'day') ? 'Y' : 'N',
          },
          transactionId: id,
        },
      });
    }
  }, [effectiveDate, taskStatus]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemText
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          handleFormat={(value: string) => {
            return value === 'Y' ? 'Yes' : sourceSystem === 'IL' ? '-' : 'No';
          }}
        />
      </Col>
    )
  );
};

const Decision = ({ isShow, layout, form, editable, transactionId, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={transactionId}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

Decision.displayName = localFieldConfig.field;

export default Decision;
