import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Visible, Required } from 'basic/components/Form';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { getAuth } from '@/auth/Utils';
import { fieldConfig } from './SharingGroupNumber.config';
import useGetHasFamilyGroupInd from 'process/NB/ManualUnderwriting/_hooks/useGetHasFamilyGroupInd';

export { fieldConfig } from './SharingGroupNumber.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const commonAuthorityList = useSelector(
    (state: any) => state.authController.commonAuthorityList,
    shallowEqual
  );

  const visibleConditions = useGetHasFamilyGroupInd();
  const editableConditions = getAuth(commonAuthorityList, {
    authorityCode: 'SharinGroupNumber',
  });
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const SharingGroupNumber = ({ form, editable, layout, isShow, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
      />
    </Authority>
  );
};

SharingGroupNumber.displayName = 'sharingGroupNumber';

export default SharingGroupNumber;
