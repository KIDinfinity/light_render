import React from 'react';
import { Col } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import useGetPayType from 'process/NB/ManualUnderwriting/_hooks/useGetPayType';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';
import { fieldConfig } from './ExpiryDate.config';

export { fieldConfig } from './ExpiryDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const payTypeCollection = useGetPayType();
  const renewalPayType = lodash.get(payTypeCollection, 'renewalPayType');
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = formUtils.queryValue(renewalPayType) === 'R';

  const editableMinthsMap = tenant.region({
    [Region.ID]: 1,
    notMatch: 0,
  });

  const defaultPickerValue = moment().add(editableMinthsMap + 1, 'months');

  const disabledDate = (current: any) =>
    current && current < moment().add(editableMinthsMap, 'months').endOf('month');

  return (
    isShow &&
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
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          format="MM/YYYY"
          disabledDate={disabledDate}
          defaultPickerValue={defaultPickerValue}
          // allowFreeSelect
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const ExpiryDate = ({ form, editable, config, layout, isShow }: any) => (
  <Authority>
    <AuthorizedAtomEditable currentAuthority={'ExporyDate'} editable={editable}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        field={config?.field}
        config={lodash.get(config, 'field-props')}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

ExpiryDate.displayName = 'expiryDate';

export default ExpiryDate;
