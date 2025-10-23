import React, { useState, useMemo } from 'react';
import { NAMESPACE } from '../../../../activity.config';

import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  Rule,
  Validator,
  formUtils,
} from 'basic/components/Form';
import { searchServiceItemByPage } from '@/services/claimServiceItemInformationControllerService';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import { localFieldConfig } from './ServiceItem.config';

export { localFieldConfig } from './ServiceItem.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  invoiceId,
  claimTypeList,
  incidentId,
  serviceItemId,
  treatmentId,
}: any) => {
  const [disabledDictCodes, setDisabledDictCodes] = useState([]);
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

    dispatch({
      type: `${NAMESPACE}/removeFeeItemList`,
      payload: {
        serviceItemId,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList || []
  );

  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemListMap
  );

  const notRepeatableCodeList = useMemo(
    () =>
      getNotRepeatableCodes({
        repeatableServiceItemList,
        invoiceId,
        serviceItemListMap,
      }),
    [repeatableServiceItemList, serviceItemListMap]
  );

  const roomType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => formUtils.queryValue(modelnamepsace.claimEntities.treatmentListMap?.[treatmentId]?.roomType)
  )

  const Rules = {
    VLD_000782: Validator.VLD_000782({roomType: roomType}),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
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
          otherParams={{ claimTypeList }}
          customUrl={searchServiceItemByPage}
          disabledDictCodes={disabledDictCodes}
          callBackSetDataList={(list = []) => {
            const newDisabledDictCodes: any = lodash
              .chain(list)
              .filter(
                (el: any) =>
                  (el.repeatable !== 'Y' && notRepeatableCodeList.includes(el.dictCode)) ||
                  ((roomType === 'OU' || roomType === 'CS') && el.dictCode === '10.2.0')
              )
              .reduce((arr: any, item: any) => {
                return [...arr, item.dictCode];
              }, [])
              .value();

            setDisabledDictCodes(newDisabledDictCodes);
          }}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const ServiceItem = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  invoiceId,
  claimTypeList,
  incidentId,
  serviceItemId,
  treatmentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      incidentId={incidentId}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
      claimTypeList={claimTypeList}
      serviceItemId={serviceItemId}
      treatmentId={treatmentId}
    />
  </Authority>
);

ServiceItem.displayName = 'ServiceItem';

export default ServiceItem;
