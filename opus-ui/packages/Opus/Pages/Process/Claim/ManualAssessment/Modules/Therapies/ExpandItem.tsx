import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import changeProcedureType from '../../_models/functions/changeProcedureType';
import type { FormComponentProps } from 'antd/lib/form';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';
import { EProcedureType } from 'process/Enum';

interface IProps extends FormComponentProps {
  incidentId?: string;
  procedureId?: string;
  treatmentId?: string;
  procedureExpand?: boolean;
  index: number;
  procedureList: any;
  claimNo: any;
}

const ExpandItem = ({
  form,
  incidentId,
  treatmentId,
  procedureId,
  claimNo,
  procedureList,
  index,
}: IProps) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.procedureListMap?.[procedureId]?.isAdjustment
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/saveEntry`,
      target: 'removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
  };

  const onAdd = () => {
    changeProcedureType({
      dispatch,
      procedureType: 'SG',
      treatmentId,
      claimNo,
      procedureList,
    });
  };

  return (
    <Section
      form={form}
      editable={!isAdjustmentFun(isAdjustmentValue) && editable}
      section="Procedure"
    >
      <Fields.TherapyType treatmentId={treatmentId} />
      <Fields.ProcedureName procedureId={procedureId} />
      <Fields.ProcedureCode />
      <Fields.KjCode />
      <Fields.OperationDate incidentId={incidentId} />
      <Fields.ProcedureDescription treatmentId={treatmentId} procedureId={procedureId} />
      <Fields.SurgeryInstructionDate />
      <Fields.SurgicalSite />
      <Fields.HighReimbPct />
      <Fields.TransplantationSurgeryFlag />
      <Fields.BornMarrowFlg />
    </Section>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { procedureId, treatmentId }: any
  ) => ({
    item: modelnamepsace.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
    procedureList: modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, procedureId, treatmentId, validating, claimNo, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        const procedureType = formUtils.queryValue(changedFields?.procedureType);
        if (!lodash.isNil(procedureType) && procedureType !== EProcedureType.Surgical) {
          dispatch({
            type: `${NAMESPACE}/removeProcedureItem`,
            payload: {
              treatmentId,
              procedureId,
            },
          });
          changeProcedureType({ dispatch, procedureType, treatmentId, claimNo, incidentId });
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            procedureId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item: procedureItem } = props;
      return formUtils.mapObjectToFields(procedureItem);
    },
  })(ExpandItem)
);
