import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useDispatch } from 'dva';
import scrollIntoView from 'smooth-scroll-into-view-if-needed';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  Rule,
} from 'basic/components/Form';

import { localFieldConfig } from './ServiceItem.config';

export { localFieldConfig } from './ServiceItem.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  invoiceId,
  serviceItemId,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
        incidentId,
      },
    });
  };
  const onClick = () => {
    dispatch({
      type: `${NAMESPACE}/setExpandState`,
      payload: { incidentId, invoiceExpand: true },
    });

    setTimeout(() => {
      const domNode: any = document.getElementById(serviceItemId);

      if (domNode) {
        scrollIntoView(domNode, {
          scrollMode: 'if-needed',
          block: 'center',
          inline: 'center',
        }).then(() => {
          const classNameO = domNode.className;
          domNode.className = `${classNameO} highlight`;
          setTimeout(() => {
            domNode.className = classNameO;
          }, 800);
        });
      }
    }, 0);
  };
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} onClick={onClick}>
        <FormItemSelectPlus
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelectCallback={onSelect}
          searchName="serviceItem"
          dropdownCode="claim_dict001"
          optionShowType="both"
          labelType="inline"
          bordered
        />
      </Col>
    )
  );
};

const ServiceItem = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  incidentId,
  invoiceId,
  serviceItemId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      invoiceId={invoiceId}
      serviceItemId={serviceItemId}
    />
  </Authority>
);

ServiceItem.displayName = 'ServiceItem';

export default ServiceItem;
