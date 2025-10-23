import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/PHCLM/DataCapture/activity.config';
import { localFieldConfig } from './FeeItemAdd.config';

export { localFieldConfig } from './FeeItemAdd.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  serviceItemId,
  incidentId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const serviceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]
  );
  const feeItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.feeItemListMap
  );

  const dicts =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.serviceItemFeesListMap?.[incidentId]?.[
        formUtils.queryValue(serviceItem?.serviceItem) || ''
        ]
    ) || [];

  const existCodes = lodash
    .chain(
      lodash.map(serviceItem?.feeItemList, (item: any) => {
        return feeItemListMap[item];
      })
    )
    .map((item) => {
      return formUtils.queryValue(item?.feeItem);
    })
    .uniq()
    .compact()
    .value();

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          existCodes={existCodes}
          dicts={dicts}
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
          labelType="inline"
          dictTypeCode="Dropdown_CLM_FeeItem"
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
  serviceItemId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      serviceItemId={serviceItemId}
      incidentId={incidentId}
    />
  </Authority>
);

ServiceItem.displayName = localFieldConfig.field;

export default ServiceItem;
