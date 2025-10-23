import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemCurrency,
  Required,
  Visible,
} from 'basic/components/Form';
import { generateCurrencis } from 'claim/pages/utils/handleExchangeRate';
import { localFieldConfig } from './TotalPayableAmount.config';

export { localFieldConfig } from './TotalPayableAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.listPolicy
  );
  const claimDecision = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'claimProcessData.claimDecision')
  );
  const claimProcessData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'claimProcessData')
  );
  const dispatch = useDispatch();
  const payoutCurrency = claimDecision?.payoutCurrency;
  const currencies = generateCurrencis(listPolicy);

  const suffixEditable = lodash.isEmpty(claimProcessData?.claimPayableList);
  const refreshRate = async () => {
    if (!editable) return;
    await dispatch({
      type: `${NAMESPACE}/hanldExchangeRateForPolicy`,
    });
  };
  const changePayoutCurrency = async (selectCurrency: any) => {
    await dispatch({
      type: `${NAMESPACE}/saveClaimDecision`,
      payload: {
        changedFields: { payoutCurrency: selectCurrency?.currencyCode },
      },
    });
    refreshRate();
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? true
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemCurrency
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? false
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? true
              : (config.required || fieldProps.required) === Required.Yes
          }
          suffixEditable={!suffixEditable && !editable}
          hiddenPrefix
          onSuffixChange={changePayoutCurrency}
          currencyCode={payoutCurrency}
          currencies={currencies}
        />
      </Col>
    )
  );
};

const TotalPayableAmount = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

TotalPayableAmount.displayName = localFieldConfig.field;

export default TotalPayableAmount;
