import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
  Required,
} from 'basic/components/Form';
import { RuleByData } from 'basic/components/Form/Rule';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { fieldConfig } from './Address7.config';
export { fieldConfig } from './Address7.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isDropEmptyData, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addressDict?.[field]?.dict,
    shallowEqual
  );

  const { customerRole, customerType } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.clientMap.${id}.personalInfo`, {}),
    shallowEqual
  );

  const childrenFieldName = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.addressDict?.[field]?.childrenFieldName,
    shallowEqual
  );
  const handleLoadSubAddress = (parentCode: string) => {
    dispatch({
      type: `${NAMESPACE}/getAddressList`,
      payload: { parentCode: parentCode, fieldName: childrenFieldName },
    });
  };
  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = RuleByData(config?.['editable-condition'], {
    customerRole: formUtils.queryValue(customerRole),
    customerType: formUtils.queryValue(customerType),
  });
  const requiredConditions = RuleByForm(config?.['required-condition'], form);
  const required =
    config?.required === Required.Conditions
      ? requiredConditions
      : (config.required || fieldProps.required) === Required.Yes;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode="subCode"
          dictName="subName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          hiddenPrefix
          precision={0}
          onChange={handleLoadSubAddress}
          placeholder={formatMessageApi({
            Label_BIZ_Individual: 'AddressLine7',
          })}
        />
      </Col>
    )
  );
};

const Address7 = ({ form, editable, layout, isShow, id, config, isDropEmptyData }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Address7.displayName = 'country';

export default Address7;
