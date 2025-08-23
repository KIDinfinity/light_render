import React, { useMemo } from 'react';
import lodash from 'lodash';
import useGetLegalRepresentativeOption from '../../../_hooks/useGetLegalRepresentativeOption';
import useGetLegalRepresentativeVisible from '../../../_hooks/useGetLegalRepresentativeVisible';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import { Col } from 'antd';
import { fieldConfig } from './Legalrepresentativeid.config';

export { fieldConfig } from './Legalrepresentativeid.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetLegalRepresentativeOption(readOnly);

  const visibleConditions = useGetLegalRepresentativeVisible({ id, readOnly, config });
  const editableConditions = true;
  const requiredConditions = false; // 必填判断后续挪到后端处理
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
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
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          mode="multiple"
        />
      </Col>
    )
  );
};

const LegalRepresentativeId = ({ form, editable, layout, isShow, config, readOnly, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      readOnly={readOnly}
      id={id}
    />
  </Authority>
);

LegalRepresentativeId.displayName = 'legalRepresentativeUuids';

export default LegalRepresentativeId;
