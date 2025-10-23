import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './PayableAmount.config';

export { localFieldConfig } from './PayableAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, originAmount }: any) => {
  const dispatch = useDispatch();

  const fieldProps: any = localFieldConfig['field-props'];
  const claimDecision = form.getFieldValue('claimDecision');

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const handleData = async (e: any) => {
    const item = form.getFieldValue('item');
    const { top } = e.target.getBoundingClientRect();

    await dispatch({
      type: `${NAMESPACE}/popUpPablePoint`,
      payload: {
        top: Number(top),
      },
    });
    if (item?.children && !lodash.isEmpty(item?.children)) {
      dispatch({
        type: `${NAMESPACE}/savePopUpEditPayable`,
        payload: {
          item: form.getFieldValue('item'),
        },
      });
    } else {
      await dispatch({
        type: `${NAMESPACE}/popUpPableInit`,
        payload: {
          incidentId: item?.incidentId,
          extra: {
            policyNo: item?.policyNo,
            claimDecision: item?.claimDecision,
            benefitTypeCode: item?.benefitTypeCode,
          },
        },
      });
    }
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
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
          bordered
          labelType="inline"
          onHover
          recoverValue={originAmount}
          min={-Number.MAX_VALUE}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
          editIcon={claimDecision !== ClaimDecision.deny && claimDecision !== ClaimDecision.NA}
          handleEdit={(e: any) => {
            handleData(e);
          }}
        />
      </Col>
    )
  );
};

const PayableAmount = ({ field, config, isShow, layout, form, editable, originAmount }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      originAmount={originAmount}
    />
  </Authority>
);

PayableAmount.displayName = 'payableAmount';

export default PayableAmount;
