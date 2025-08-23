import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './FundCode.config';

export { localFieldConfig } from './FundCode.config';
import { NAMESPACE } from '../../../../activity.config';
import classNames from 'classnames';
import styles from '../../index.less';
import useFundDicts from 'process/GeneralPOS/BaseProduct/_hooks/useFundDicts';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const fundSwitchingFundList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundSwitching
        ?.fundSwitchingFundList
  );
  const policyFundDOList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyFundDOList
  );
  const funds = useFundDicts({
    backupFunds: fundSwitchingFundList,
    otherFunds: policyFundDOList,
  });

  const exitFundCodes = useMemo(
    () => fundSwitchingFundList?.map((item: any) => formUtils.queryValue(item.fundCode)) || [],
    [fundSwitchingFundList]
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || isAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          className={classNames({ [styles.hiddenSvg]: !isAdd })}
          dicts={funds}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={exitFundCodes}
          form={form}
          formName={config?.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          isInline
          allowClear={false}
          getPopupContainer={() => document.querySelector('.POSContainer') || document.body}
        />
      </Col>
    )
  );
};

const FundCode = ({ isShow, layout, form, editable, transactionId, config, isAdd }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
      isAdd={isAdd}
    />
  </Authority>
);

FundCode.displayName = localFieldConfig.field;

export default FundCode;
