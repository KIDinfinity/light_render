import React, { useMemo } from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetLegalRepresentativeOption from 'process/NB/ManualUnderwriting/_hooks/useGetLegalRepresentativeOption';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import { fieldConfig } from './Legalrepresentativeid.config';

export { fieldConfig } from './Legalrepresentativeid.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetLegalRepresentativeOption();

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  // 最多选择三个
  const disabledIds = useMemo(() => {
    const selected = form.getFieldValue('legalRepresentativeUuids') || [];

    return selected?.length >= 3
      ? lodash
          .chain(dicts)
          .map((item) => item.dictCode)
          .filter((item) => !selected.includes(item))
          .value()
      : [];
  }, [dicts, form]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          existCodes={disabledIds}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          mode="multiple"
        />
      </Col>
    )
  );
};

const LegalRepresentativeId = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={lodash.get(config, 'field-props')}
      field={fieldConfig?.field}
    />
  </Authority>
);

LegalRepresentativeId.displayName = 'legalRepresentativeUuids';

export default LegalRepresentativeId;
