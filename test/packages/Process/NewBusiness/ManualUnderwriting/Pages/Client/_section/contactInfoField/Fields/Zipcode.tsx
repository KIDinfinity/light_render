import React, { useMemo } from 'react';
import lodash from 'lodash';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';

import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Zipcode.config';

export { fieldConfig } from './Zipcode.config';
import { tenant, Region } from '@/components/Tenant';

const FormItem = ({ isShow, layout, form, editable, field, config, isDropEmptyData, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const addrType = form.getFieldValue('addrType');
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: addrType,
    addressLevel: AddressLevel.ZipCode,
  });

  const visibleConditions = !isDropEmptyData || RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByForm(config?.['required-condition'], form);
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const request = tenant.region({
    [Region.PH]: requiredConditions,
    notMatch: requiredByRole,
  });

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
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={request}
          hiddenPrefix
          precision={0}
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
