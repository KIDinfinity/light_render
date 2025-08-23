import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { messageModal } from '@/utils/commonMessage';
import { localFieldConfig } from './AssessmentDecision.config';

export { localFieldConfig } from './AssessmentDecision.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
      config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );
  const incidentDecisionListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace.claimEntities, 'claimPayableListMap') || {}
  );
  const submited = useSelector(({ formCommonController }: any) =>
    lodash.get(formCommonController, 'submited')
  );
  const isClickRegister = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
    lodash.get(modelnamepsace, 'isClickRegister')
  );
  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController.validating
  );
  const dispatch = useDispatch();
  const handleCancel = (value: any) => {
    if (value === ClaimDecision.deny) {
      messageModal(
        {
          typeCode: 'Label_COM_WarningMessage',
          dictCode: 'MSG_000422',
        },
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

  const Rules = {
    VLD_000010HKApproveAndExGratia: Validator.VLD_000010HKApproveAndExGratia(
      incidentDecisionListMap
    ),
    VLD_000401: Validator.VLD_000401(incidentDecisionListMap),
    VLD_000400: Validator.VLD_000400(incidentDecisionListMap),
    VLD_000563: Validator.VLD_000563(incidentDecisionListMap),
    VLD_000182HK: Validator.VLD_000182HK(validating, incidentDecisionListMap),
    VLD_000562: Validator.VLD_000562(
      submited,
      validating,
      isClickRegister,
      incidentDecisionListMap
    ),
    VLD_000202: Validator.VLD_000202(isClickRegister),
  };

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
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={handleCancel}
        />
      </Col>
    )
  );
};

const AssessmentDecision = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

AssessmentDecision.displayName = localFieldConfig.field;

export default AssessmentDecision;
