import React, { useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { localFieldConfig } from './InvoiceNo.config';

export { localFieldConfig } from './InvoiceNo.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const invoiceListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.invoiceListMap
  );

  const invoiceListFromEntities = useMemo(() => {
    const invoiceListMapEntries = Object.entries(invoiceListMap);
    const invoiceListFromEntitiesTemp: any[] = [];
    lodash.map(invoiceListMapEntries, (item: any) => {
      if (item[1].treatmentId === treatmentId) {
        invoiceListFromEntitiesTemp.push(item[1]);
      }
    });

    return invoiceListFromEntitiesTemp;
  }, [invoiceListMap]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    checkInvoiceNoIsExist: Validator.checkInvoiceNoIsExist(invoiceListFromEntities),
  };

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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          triggerEvent="onBlur"
          labelType="inline"
        />
      </Col>
    )
  );
};

const InvoiceNo = ({ field, config, isShow, layout, form, editable, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

InvoiceNo.displayName = localFieldConfig.field;

export default InvoiceNo;
