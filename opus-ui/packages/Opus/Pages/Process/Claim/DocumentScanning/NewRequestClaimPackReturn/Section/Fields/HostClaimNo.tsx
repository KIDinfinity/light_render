import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';
import { useSelector } from 'dva';

import { NAMESPACE } from '../../../activity.config';
import { localFieldConfig } from './HostClaimNo.config';

export { localFieldConfig } from './HostClaimNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const taskDetail = useSelector((state: any) => state.processTask.getTask);

  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData
  );
  const requiredConditions = RuleByData(config?.['required-condition'], businessData) && !form.getFieldValue('caseNo');
  const visibleConditions = true;
  const editableConditions = true;
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
                hostClaimNo: e?.target.value,
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

const HostClaimNo = ({ field, config, isShow, layout, form, editable }: any) => (
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

HostClaimNo.displayName = localFieldConfig.field;

export default HostClaimNo;
