import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';

import lodash from 'lodash';
import { Authority, FormItemSelect, Visible, formUtils, Editable } from 'basic/components/Form';
import { fieldConfig } from './Kyc.config';

export { fieldConfig } from './Kyc.config';

const FormItem = ({ isShow, layout, form, field, config, id, editable }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;

  const kyc = form.getFieldValue('kyc');
  const editableConditions = formUtils.queryValue(kyc) !== 'EXACT';

  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const filterDicts = lodash.filter(dicts, (item: any) => {
    return item.dictCode !== (formUtils.queryValue(kyc) === 'PARTIAL' ? 'UNIDENTIFIED' : '');
  });
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={filterDicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Kyc = ({ form, editable, layout, isShow, id, config }: any) => {
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

Kyc.displayName = 'kyc';

export default Kyc;
