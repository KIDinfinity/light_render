import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { Authority, Editable, FormItemSelect, RuleByForm, formUtils } from 'basic/components/Form';

import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import useGetCountryDropdown from '../../../_hooks/useGetCountryDropdown';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Nationality.config';
export { fieldConfig } from './Nationality.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const relationOfInsured = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.relationOfInsured`
          : `modalData.entities.clientMap.${id}.personalInfo.relationOfInsured`
      ),
    shallowEqual
  );
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(
        modelnamepsace,
        readOnly
          ? `entities.clientMap.${id}.personalInfo.customerType`
          : `modalData.entities.clientMap.${id}.personalInfo.customerType`
      ),
    shallowEqual
  );
  const customerRole = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(
      modelnamepsace,
      readOnly
        ? `entities.clientMap.${id}.personalInfo?.customerRole`
        : `modalData.entities.clientMap.${id}.personalInfo?.customerRole`
    )
  );

  const dicts = useGetCountryDropdown();
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({
    relationOfInsuredOut: formUtils.queryValue(relationOfInsured),
    customerRoleOut: formUtils.queryValue(customerRole),
    customerTypeOut: formUtils.queryValue(customerType),
  });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const nationalityVisible = isTargetRelationOfInsured ? false : visible;

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    nationalityVisible && (
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
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Nationality = ({ form, editable, layout, isShow, config, id, readOnly }: any) => {
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

Nationality.displayName = 'nationality';

export default Nationality;
