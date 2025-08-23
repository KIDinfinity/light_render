import React, { useMemo } from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Visible, Required } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { getAuth } from '@/auth/Utils';
import { fieldConfig } from './LAsharingGroupNumber.config';
import { useGetHasFamilyGroupInd } from 'process/NewBusiness/ManualUnderwriting/_hooks';

export { fieldConfig } from './LAsharingGroupNumber.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  coverageItem,
  readOnly,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const commonAuthorityList = useSelector((state: any) => {
    return state.authController.commonAuthorityList;
  }, shallowEqual);

  const isMain = useMemo(() => {
    return coverageItem?.isMain === 'Y';
  }, [coverageItem]);
  const visibleConditions = useGetHasFamilyGroupInd(readOnly);
  const editableConditions =
    visibleConditions &&
    !isMain &&
    getAuth(commonAuthorityList, {
      authorityCode: 'SharinGroupNumber',
    });

  const requiredConditions = visibleConditions;

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
          labelType="inline"
          placeholder=""
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

const LASharingGroupNumber = ({
  form,
  editable,
  layout,
  isShow,
  config,
  coverageItem,
  readOnly,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        coverageItem={coverageItem}
        readOnly={readOnly}
      />
    </Authority>
  );
};

LASharingGroupNumber.displayName = 'laSharingGroupNumber';

export default LASharingGroupNumber;
