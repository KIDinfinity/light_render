import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';

import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useLinkDataWithIndustry from '../../../_hooks/useLinkDataWithIndustry';

import { fieldConfig } from './Occupation.config';
export { fieldConfig } from './Occupation.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const natureOfBusiness = useSelector(
    ({ [NAMESPACE]: model }: any) => model.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.natureOfBusiness
  );

  const linkEditable = useLinkDataWithIndustry({
    id,
    monitorValue: natureOfBusiness,
    currentField: field,
    defaultValue: 'NA',
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form, '') || linkEditable;
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            (!editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No))
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Occupation = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Occupation.displayName = 'occupation';

export default Occupation;
