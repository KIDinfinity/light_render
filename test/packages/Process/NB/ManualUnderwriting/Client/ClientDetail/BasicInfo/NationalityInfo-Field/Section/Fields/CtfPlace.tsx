import React, { useEffect } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';

import {
  Authority,
  Editable,
  FormItemSelect,
  RuleByForm,
  FormItemInput,
} from 'basic/components/Form';
import useGetCountryDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetCountryDropdown';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';
import useJudgeIsTargetRelationOfInsured from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsTargetRelationOfInsured';
import FieldType from 'enum/FieldType';
import { fieldConfig } from './CtfPlace.config';
import { tenant, Region } from '@/components/Tenant';
export { fieldConfig } from './CtfPlace.config';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';

const FormItem = ({ isShow, layout, form, editable, field, config, fieldType, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const defaultDicts = useGetCountryDropdown();

  const showPHDropdown =
    tenant.region() === Region.PH && form.getFieldValue('ctfCountryCode') === 'RP';

  const allAddressSubList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allAddressSubList
  );
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ id });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const visibleConditions = isTargetRelationOfInsured ? false : visible;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
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
  }, [fieldType, showPHDropdown]);

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
          dicts={!!showPHDropdown ? allAddressSubList : defaultDicts}
          form={form}
          formName={config.name || field}
          labelId="Place of birth"
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

const CtfPlace = ({ form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={fieldConfig?.field}
      config={config}
      id={id}
      fieldType={lodash.get(config, 'fieldType')}
    />
  </Authority>
);

CtfPlace.displayName = 'ctfPlace';

export default CtfPlace;
