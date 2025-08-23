import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from '../../activity.config';
import { Fields, localConfig } from './Section';

const FundTable = ({ form, id}: any) => {
  return (
    <Section section="Fund-Table" form={form} localConfig={localConfig}>
      <Fields.Fundcode />
      <Fields.Fundname />
      <Fields.Fundcurrency />
      <Fields.Fundallocation />
      <Fields.TPARCDAllocation />
      <Fields.TPAAllocation />
      <Fields.EPAAllocation />
      <Fields.AdhocTopUpAllocation />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveFundChange',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFundChange',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(FundTable)
);
