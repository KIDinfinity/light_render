import React, { useState, useMemo } from 'react';
import { NAMESPACE } from '../../../activity.config';

import lodash from 'lodash';
import { Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
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
}: any) => {
  const [disabledDictCodes, setDisabledDictCodes] = useState([]);
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = true;
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onSelectCallback={onSelect}
          searchName="serviceItem"
          dropdownCode="claim_dict001"
          optionShowType="both"
          disabledDictCodes={disabledDictCodes}
          labelType="inline"
          otherParams={{ claimTypeList }}
          customUrl={searchServiceItemByPage}
          callBackSetDataList={(list = []) => {
            const newDisabledDictCodes: any = lodash
              .chain(list)
              .filter(
                (el: any) => el.repeatable !== 'Y' && notRepeatableCodeList.includes(el.dictCode)
              )
              .reduce((arr: any, item: any) => {
                return [...arr, item.dictCode];
              }, [])
              .value();

            setDisabledDictCodes(newDisabledDictCodes);
          }}
          hideRequired
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
  invoiceId,
  claimTypeList,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
      claimTypeList={claimTypeList}
    />
  </Authority>
);

ServiceItem.displayName = localFieldConfig.field;

export default ServiceItem;
