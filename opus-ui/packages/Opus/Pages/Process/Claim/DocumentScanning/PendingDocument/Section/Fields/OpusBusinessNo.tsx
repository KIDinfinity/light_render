import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from '../../../activity.config';
import { localFieldConfig } from './OpusBusinessNo.config';

export { localFieldConfig } from './OpusBusinessNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const type =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData?.type) || '';

  const dispatch = useDispatch()
  const taskDetail = useSelector((state: any) => state.processTask.getTask);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = type === 'PendingDocument' && !form.getFieldValue('hostClaimNo');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          onBlur={async (e: any) => {
            const result = await dispatch({
              type: `${NAMESPACE}/getClaimNoInsuredInfo`,
              payload: {
                inquiryBusinessNo: e?.target.value,
              },
            });

            if (result) {
              const dataForSubmit = await dispatch({
                type: `${NAMESPACE}/getDataForSubmit`,
                payload: {
                  taskDetail,
                },
              });

              await dispatch({
                type: `${NAMESPACE}/updateDocScanningCase`,
                payload: {
                  dataForSubmit,
                },
              });
            }
          }}
        />
      </Col>
    )
  );
};

const OpusBusinessNo = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

OpusBusinessNo.displayName = localFieldConfig.field;

export default OpusBusinessNo;
