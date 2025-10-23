import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import Section, { SectionTitle, Fields } from './Section/index';
import { NAMESPACE } from '../activity.config';
import { FormAntCard, formUtils } from 'basic/components/Form';

const ApprovalDecision = connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  fecDecision: lodash.get(modelnamepsace, 'businessData.fecInfo.fecDecision'),
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveApprovalDecision',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveApprovalDecision',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { fecDecision } = props;
      return formUtils.mapObjectToFields(fecDecision);
    },
  })(({ form }) => {
    const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

    return (
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="ApprovalDecision">
          <Fields.ApprovalDecision01 />
          <Fields.ApprovalDecision02 />
        </Section>
      </FormAntCard>
    );
  })
);

ApprovalDecision.displayName = 'ApprovalDecision';

export default ApprovalDecision;
