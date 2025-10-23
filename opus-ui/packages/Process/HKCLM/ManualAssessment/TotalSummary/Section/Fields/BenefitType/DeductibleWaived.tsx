import React from 'react';
import { Col } from 'antd';
import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';

import { localFieldConfig } from './DeductibleWaived.config';

export { localFieldConfig } from './DeductibleWaived.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const claimDecision = form.getFieldValue('claimDecision');
  const booster = form.getFieldValue('booster');

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

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
          editIcon={
            booster !== 'Y' &&
            claimDecision !== ClaimDecision.deny &&
            claimDecision !== ClaimDecision.NA
          }
          onHover
          recoverValue={form.getFieldValue('systemDeductibleWaived')}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          handleEdit={(e: any) => {
            handleData(e);
          }}
        />
      </Col>
    )
  );
};

const DeductibleWaived = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

DeductibleWaived.displayName = 'DeductibleWaived';

export default DeductibleWaived;
