import React, { useEffect } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemInput,
  formUtils,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import FieldType from 'enum/FieldType';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './CtfPlace.config';
export { fieldConfig } from './CtfPlace.config';

const useGetDictList = ({ form, field }: any) => {
  const allAddressSubList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allAddressSubList
  );

  const parentFieldValue = form.getFieldValue('ctfCountryCode');
  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.addressDict?.[field]?.[parentFieldValue],
    shallowEqual
  );
  const TMP_Dropdown_CFG_Country = getDrowDownList('TMP_Dropdown_CFG_Country');
  const nationalityList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.nationalityList,
    shallowEqual
  );

  return tenant.region({
    [Region.TH]: TMP_Dropdown_CFG_Country || [],
    [Region.PH]:
      form.getFieldValue('ctfCountryCode') === 'RP' ? allAddressSubList : nationalityList,
    [Region.MY]: lodash.map(dicts, (item) => {
      return {
        dictCode: item.subCode,
        dictName: item.subName,
      };
    }),
    notMatch: nationalityList,
  });
};

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  fieldType,
  id,
  readOnly,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
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

  const dicts = useGetDictList({ form, field: 'address6' });
  const showPHDropdown =
    tenant.region() === Region.PH && form.getFieldValue('ctfCountryCode') === 'RP';

  const allAddressSubList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allAddressSubList
  );
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({
    relationOfInsuredOut: formUtils.queryValue(relationOfInsured),
    customerRoleOut: formUtils.queryValue(customerRole),
    customerTypeOut: formUtils.queryValue(customerType),
  });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const visibleConditions = isTargetRelationOfInsured ? false : visible;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  useEffect(() => {
    if (showPHDropdown) {
      if (lodash.isEmpty(allAddressSubList)) {
        dispatch({
          type: `${NAMESPACE}/getAllSubAddress`,
        });
      }
    }
  }, [showPHDropdown, allAddressSubList]);

  const InputComponent = React.useMemo(() => {
    if (!showPHDropdown && fieldType !== FieldType.Dropdown) {
      return FormItemInput;
    }

    switch (fieldType) {
      case FieldType.Dropdown:
        return FormItemSelect;
      case FieldType.Text:
        return FormItemInput;
      default:
        return FormItemInput;
    }
  }, [showPHDropdown, fieldType]);

  return (
    isShow &&
    visibleConditions && (
      <Col {...layout}>
        <InputComponent
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const CtfPlace = ({ form, editable, layout, isShow, config, id, readOnly, fieldType }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      id={id}
      fieldType={fieldType}
      readOnly={readOnly}
    />
  </Authority>
);

CtfPlace.displayName = 'ctfPlace';

export default CtfPlace;
