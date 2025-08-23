import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckboxGroup,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './ApplyTo.config';

export { localFieldConfig } from './ApplyTo.config';
import styles from '../../index.less';
import { NAMESPACE } from '../../../../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts =
    useSelector(
      ({ dictionaryController }: any) =>
        dictionaryController[
          config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
        ]
    ) || [];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const mainPolicyId =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo?.mainPolicyId
    ) || {};

  const clientContact =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyDespatchAddressList?.find(
        (item) => item?.policyId === mainPolicyId
      )
    ) || {};
  const contactDetail = {
    addressLine1: clientContact?.dispatchAddress01,
    addressLine2: clientContact?.dispatchAddress02,
    addressLine3: clientContact?.dispatchAddress03,
    addressLine4: clientContact?.dispatchAddress04,
    addressLine5: clientContact?.dispatchAddress05,
    zipCode: clientContact?.dispatchZipCode,
    preferredMailingAddress: clientContact?.preferredMailingAddress,
    email: clientContact?.emailAddress,
  };
  const changeDetail = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.policyAddr
  );

  const required = useMemo(() => {
    const diffKey = [
      'addressLine1',
      'addressLine2',
      'addressLine3',
      'addressLine4',
      'addressLine5',
      'zipCode',
      'countryCode',
      'preferredMailingAddress',
      'email',
    ];
    const originData = diffKey.reduce((r, c) => {
      r[c] = contactDetail?.[c] || '';
      return r;
    }, {});
    const changeData = diffKey.reduce((r, c) => {
      r[c] = formUtils.queryValue(changeDetail?.[c] || '');
      return r;
    }, {});
    return !lodash.isEqual(originData, changeData);
  }, [contactDetail, changeDetail]);
  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.radioBox}>
          <FormItemCheckboxGroup
            dicts={dicts.map((item) =>
              item?.dictCode === 'applyToPersonalInfo'
                ? { ...item, title: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000583' }) }
                : item
            )}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config?.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              required ||
              ((config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes)
            }
            rules={lodash.compact(
              (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
          />
        </div>
      </Col>
    )
  );
};

const ApplyTo = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

ApplyTo.displayName = localFieldConfig.field;

export default ApplyTo;
