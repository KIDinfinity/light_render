import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  RuleByForm,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import useGetAccountName from 'opus/Pages/Process/NewBusiness/DataEntry/_hooks/useGetAccountName';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config;
  const dicts = useGetAccountName();
  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const insuredAge = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.age,
    shallowEqual
  );
  const editableConditions = !Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    NAMESPACE
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );
  return useMemo(
    () =>
      isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemSelect
            dicts={dicts}
            dictCode="dictCode"
            dictName="dictName"
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
            hiddenPrefix
            precision={2}
          />
        </Col>
      ),
    [insuredAge]
  );
};
const field = 'accountName';

const AccountName = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

AccountName.displayName = field;

export default AccountName;
