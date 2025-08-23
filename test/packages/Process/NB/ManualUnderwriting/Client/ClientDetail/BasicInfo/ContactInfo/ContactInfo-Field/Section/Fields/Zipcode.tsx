import React, { useMemo } from 'react';
import lodash from 'lodash';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import useGetEditableByRole from 'process/NB/ManualUnderwriting/_hooks/useGetEditableByRole';
import { Col } from 'antd';

import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import { Authority, FormItemAutoComplete, Visible, RuleByForm } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fieldConfig } from './Zipcode.config';

export { fieldConfig } from './Zipcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isDropEmptyData, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const addrType = form.getFieldValue('addrType');
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: addrType,
    addressLevel: AddressLevel.ZipCode,
  });

  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = true;
  const editableByRole = useGetEditableByRole({
    editableConditions,
    config,
    localConfig: fieldConfig,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

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
          disabled={!editable || !editableByRole}
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
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

const Zipcode = ({ form, editable, layout, isShow, id, config, isDropEmptyData }: any) => {
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
        isDropEmptyData={isDropEmptyData}
      />
    </Authority>
  );
};

Zipcode.displayName = 'zipCode';

export default Zipcode;
