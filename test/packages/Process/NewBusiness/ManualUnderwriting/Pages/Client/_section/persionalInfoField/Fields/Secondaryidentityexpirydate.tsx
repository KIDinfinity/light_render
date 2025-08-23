import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useRequiredByNationality from '../../../_hooks/useRequiredByNationality';
import useJudgeByDisplayConfig from '../../../_hooks/useJudgeByDisplayConfig';

import { fieldConfig } from './Secondaryidentityexpirydate.config';
import useGetSecondaryExpirydateEditable from 'process/NB/ManualUnderwriting/_hooks/useGetSecondaryExpirydateEditable';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export { fieldConfig } from './Secondaryidentityexpirydate.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const nationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace.entities?.clientMap[id]?.nationalityInfo.nationality
        : modelnamepsace.modalData.entities?.clientMap[id]?.nationalityInfo.nationality,
    shallowEqual
  );

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: formUtils.queryValue(nationality),
  });
  const visibleConditions = requiredConditions;

  const expiryDateShow = useJudgeByDisplayConfig({
    value: form.getFieldValue('SecondaryIdentityType'),
    targetKey: 'expiryDate',
  });

  const expiryDateeditable = useGetSecondaryExpirydateEditable({
    SecondaryIdentityType: form.getFieldValue('SecondaryIdentityType'),
  });

  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    expiryDateShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          required={requiredByRole || expiryDateeditable}
          allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Secondaryidentityexpirydate = ({
  form,
  editable,
  layout,
  isShow,
  config,
  readOnly,
  id,
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
        readOnly={readOnly}
        id={id}
      />
    </Authority>
  );
};

Secondaryidentityexpirydate.displayName = 'SecondaryIdentityExpiryDate';

export default Secondaryidentityexpirydate;
