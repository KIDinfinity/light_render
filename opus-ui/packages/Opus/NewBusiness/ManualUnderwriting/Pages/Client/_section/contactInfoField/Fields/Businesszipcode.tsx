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
import { fieldConfig } from './Businesszipcode.config';

export { fieldConfig } from './Businesszipcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Business,
    addressLevel: AddressLevel.ZipCode,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const dataSource = useMemo(() => {
    return lodash.map(dicts, (item: any) => item.subCode);
  }, [dicts]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
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
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Businesszipcode = ({ form, editable, layout, isShow, id, config }: any) => {
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

Businesszipcode.displayName = 'businessZipCode';

export default Businesszipcode;
