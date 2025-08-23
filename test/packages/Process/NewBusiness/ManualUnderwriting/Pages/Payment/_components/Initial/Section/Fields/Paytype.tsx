import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';
import { fieldConfig } from './Paytype.config';

export { fieldConfig } from './Paytype.config';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { useSelector } from 'dva';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const allowChangeInitialPaymentMethod = useSelector(({ [NAMESPACE]: modelNamespace }: any) =>
    modelNamespace?.paymentAmountData?.allowChangeInitialPaymentMethod
  );
  const visibleConditions = true;
  const editableConditions = !RuleByData(config['editable-condition'],  {
    allowChangeInitialPaymentMethod,
  });
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          getPopupContainer={() => document.body}
          precision={2}
          onChange={(value: any) => {
            dispatch({
              type: `${NAMESPACE}/savePlanInfoData`,
              payload: {
                changedFields: {
                  payType: value,
                },
                type: 'change',
              },
            });
          }}
        />
      </Col>
    )
  );
};

const Paytype = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
    />
  </Authority>
);

Paytype.displayName = 'payType';

export default Paytype;
