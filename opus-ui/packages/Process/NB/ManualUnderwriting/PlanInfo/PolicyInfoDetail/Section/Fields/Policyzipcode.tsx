import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldConfig } from './Policyzipcode.config';

export { fieldConfig } from './Policyzipcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Policy,
    addressLevel: AddressLevel.ZipCode,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;
  const dataSource = useMemo(() => {
    return lodash.map(dicts, (item: any) => item.subCode);
  }, [dicts]);

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          dataSource={dataSource}
          onSearch={(text: string) => {
            return lodash.filter(dataSource, (content) =>
              lodash.lowerCase(content).includes(lodash.lowerCase(text))
            );
          }}
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
          placeholder={formatMessageApi({
            Label_BIZ_Individual: 'ZipCode',
          })}
        />
      </Col>
    )
  );
};

const Policyzipcode = ({ form, editable, layout, isShow, id, config }: any) => {
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

Policyzipcode.displayName = 'PolicyZipCode';

export default Policyzipcode;
