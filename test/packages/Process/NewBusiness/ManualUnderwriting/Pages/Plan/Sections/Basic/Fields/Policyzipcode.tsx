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
import { useGetCurrentLevelAddress } from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';
import AddressLevel from 'process/NewBusiness/ManualUnderwriting/_enum/AddressLevel';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldConfig } from './Policyzipcode.config';

export { fieldConfig } from './Policyzipcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, showOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetCurrentLevelAddress({
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
    showOnly &&
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
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
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

const Policyzipcode = ({ form, editable, layout, isShow, id, config, showOnly }: any) => {
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
        showOnly={showOnly}
      />
    </Authority>
  );
};

Policyzipcode.displayName = 'PolicyZipCode';

export default Policyzipcode;
