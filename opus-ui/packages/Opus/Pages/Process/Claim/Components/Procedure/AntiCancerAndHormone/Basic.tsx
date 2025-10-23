import React from 'react';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Main = ({ item, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="TherapeuticMonthList">
      <Fields.TherapeuticDrugs />
      <Fields.TherapeuticDateList item={item} />
      <Fields.TherapeuticDrugNameDesc />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, item, validating } = props;

      const { otherProcedureId, id, NAMESPACE } = item;

      if (
        lodash.size(changedFields) &&
        formUtils.shouldUpdateState(changedFields) &&
        !lodash.has(changedFields, 'therapeuticDateList')
      ) {
        if (validating) {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'therapeuticMonthListUpdate',
            payload: {
              id,
              otherProcedureId,
              changedFields,
            },
          });
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'therapeuticMonthListUpdate',
            payload: {
              otherProcedureId,
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Main)
);
