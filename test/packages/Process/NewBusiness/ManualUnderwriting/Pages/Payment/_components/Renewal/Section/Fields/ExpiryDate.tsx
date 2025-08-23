import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import moment from 'moment';

import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import AuthorizedAtomEditable from '@/auth/Components/Authorized/AuthorizedAtomEditable';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { fieldConfig } from './ExpiryDate.config';

export { fieldConfig } from './ExpiryDate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = form.getFieldValue('renewalPayType') === 'R';

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
          onBlur={(e: any) => {
            // 加上这个是为了解决手动输入不了的bug
            const expiryDate = moment(e.target.value, 'MM/YYYY').valueOf();

            if (!!expiryDate) {
              dispatch({
                type: `${NAMESPACE}/saveFormData`,
                target: 'saveBankCardInfo',
                payload: {
                  changedFields: {
                    expiryDate,
                  },
                },
              });
            }
          }}
          disabledDate={disabledDate}
          defaultPickerValue={defaultPickerValue}
          // allowFreeSelect
          hiddenPrefix
          precision={0}
          type="month"
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
        field={fieldConfig?.field}
        config={config}
      />
    </AuthorizedAtomEditable>
  </Authority>
);

ExpiryDate.displayName = 'expiryDate';

export default ExpiryDate;
