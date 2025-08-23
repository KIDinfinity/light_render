import React from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { Authority, Editable, FormItemSelect, RuleByForm, formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Ctfcountrycode.config';
export { fieldConfig } from './Ctfcountrycode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const relationOfInsured = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(
      modelnamepsace,
      readOnly
        ? `entities.clientMap.${id}.personalInfo.relationOfInsured`
        : `modalData.entities.clientMap.${id}.personalInfo.relationOfInsured`
    )
  );
  const customerType = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(
      modelnamepsace,
      readOnly
        ? `entities.clientMap.${id}.personalInfo.customerType`
        : `modalData.entities.clientMap.${id}.personalInfo.customerType`
    )
  );
  const customerRole = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(
      modelnamepsace,
      readOnly
        ? `entities.clientMap.${id}.personalInfo?.customerRole`
        : `modalData.entities.clientMap.${id}.personalInfo?.customerRole`
    )
  );

  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.parentCodeAddress.country,
    shallowEqual
  );

  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({
    relationOfInsuredOut: formUtils.queryValue(relationOfInsured),
    customerRoleOut: formUtils.queryValue(customerRole),
    customerTypeOut: formUtils.queryValue(customerType),
  });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const ctfCountryCodeVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const handleLoadSubAddress = (parentCode: string) => {
    dispatch({
      type: `${NAMESPACE}/getAddressList`,
      payload: { parentCode: parentCode, fieldName: 'address7' },
    });
  };

  return (
    isShow &&
    ctfCountryCodeVisible && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode="subCode"
          dictName="subName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          onChange={handleLoadSubAddress}
          precision={0}
        />
      </Col>
    )
  );
};

const Ctfcountrycode = ({ form, editable, layout, isShow, config, id, readOnly }: any) => {
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
        readOnly={readOnly}
      />
    </Authority>
  );
};

Ctfcountrycode.displayName = 'ctfCountryCode';

export default Ctfcountrycode;
