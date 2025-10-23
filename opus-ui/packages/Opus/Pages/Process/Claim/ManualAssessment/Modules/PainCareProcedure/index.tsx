import React, { useEffect } from 'react';
import { useSelector, connect } from 'dva';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Index = ({
  otherProcedureItem: { id: otherProcedureId, therapeuticMonthList: list, treatmentId },
  form,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  // 兼容旧数据没有id
  useEffect(() => {
    let noId = false;
    const newList = lodash.map(list, (item: any) => {
      if (!item.id) {
        noId = true;
      }
      return {
        ...item,
        id: uuidv4(),
      };
    });
    if (!!noId) {
      dispatch({
        type: `opusClaimAssessment/therapeuticMonthListInit`,
        payload: {
          otherProcedureId,
          list: newList,
        },
      });
    }
  }, [list]);

  return (
    <Section form={form} editable={editable} section="PainCareTherapy">
      <Fields.TherapyType />
      <Fields.TherapeuticDate />
      <Fields.TherapeuticDrugs />
      <Fields.FromDate treatmentId={treatmentId} />
      <Fields.ToDate treatmentId={treatmentId} />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, otherProcedureItem, treatmentId, validating } = props;
      const { id: otherProcedureId, therapeuticMonthList = [] } = otherProcedureItem;
      const id = lodash.get(therapeuticMonthList, '[0].id');

      if (lodash.has(changedFields, 'therapeuticDateList')) {
        return;
      }

      if (lodash.size(changedFields) && formUtils.shouldUpdateState(changedFields)) {
        if (lodash.has(changedFields, 'fromDate') || lodash.has(changedFields, 'toDate')) {
          if (validating) {
            setTimeout(() => {
              dispatch({
                type: 'opusClaimAssessment/saveFormData',
                target: 'saveOtherProcedureItem',
                payload: {
                  changedFields,
                  treatmentId,
                  otherProcedureId,
                },
              });
            }, 0);
          } else {
            dispatch({
              type: 'opusClaimAssessment/saveFormData',
              target: 'saveOtherProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                otherProcedureId,
              },
            });
          }
        } else {
          if (validating) {
            dispatch({
              type: `opusClaimAssessment/saveEntry`,
              target: 'therapeuticMonthListUpdate',
              payload: {
                id,
                otherProcedureId,
                changedFields,
              },
            });
          } else {
            dispatch({
              type: `opusClaimAssessment/saveFormData`,
              target: 'therapeuticMonthListUpdate',
              payload: {
                otherProcedureId,
                changedFields,
                id,
              },
            });
          }
        }
      }
    },
    mapPropsToFields(props) {
      const { otherProcedureItem, treatmentType } = props;
      const {
        id: otherProcedureId,
        procedureType,
        fromDate,
        toDate,
        therapeuticMonthList = [],
      } = otherProcedureItem;
      const [item] = therapeuticMonthList;

      return formUtils.mapObjectToFields({
        ...(item || {}),
        fromDate,
        toDate,
        procedureType,
        treatmentType,
        otherProcedureId,
      });
    },
  })(Index)
);
