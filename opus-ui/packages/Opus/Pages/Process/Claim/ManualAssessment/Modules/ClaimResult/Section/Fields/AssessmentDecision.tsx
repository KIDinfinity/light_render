import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
} from 'basic/components/Form';
import {
  VLD_000010HKApproveAndExGratia,
  // VLD_000400,
  // VLD_000401,
  VLD_000202,
  VLD_000182HK,
  // VLD_000283HK,
} from 'claim/pages/validators/fieldValidators';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { localFieldConfig } from './AssessmentDecision.config';

export { localFieldConfig } from './AssessmentDecision.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const incidentDecisionListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace.claimEntities, 'claimPayableListMap') || {}
  );

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController.validating
  );
  const dispatch = useDispatch();
  const handleCancel = (value: any) => {
    if (value === ClaimDecision.deny) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000422',
            }),
          },
        ],
        {
          okFn: () => {
            dispatch({
              type: `${NAMESPACE}/hideDecisionModalok`,
            });
            dispatch({
              type: `${NAMESPACE}/hideDecisionModal`,
            });
          },
          cancelFn: () => {
            dispatch({
              type: `${NAMESPACE}/updateAssessDecision`,
            });
            dispatch({
              type: `${NAMESPACE}/hideDecisionModal`,
            });
          },
        }
      );
    }
  };

  const dicts = getDrowDownList('Dropdown_CLM_AssessmentDecision');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? true
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          rules={[
            {
              // validator: VLD_000283HK(claimDecision, 'claim'),
            },
            {
              validator: VLD_000010HKApproveAndExGratia(incidentDecisionListMap),
            },
            // {
            //   validator: VLD_000401(incidentDecisionListMap),
            // },
            // {
            //   validator: VLD_000400(incidentDecisionListMap),
            // },
            {
              validator: VLD_000182HK(validating, incidentDecisionListMap),
            },
            {
              validator: VLD_000202(),
            },

          ]}
          onChange={handleCancel}
        />
      </Col>
    )
  );
};

const AssessmentDecision = ({ field, config, isShow, layout, form, editable }: any) => (
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

AssessmentDecision.displayName = localFieldConfig.field;

export default AssessmentDecision;
