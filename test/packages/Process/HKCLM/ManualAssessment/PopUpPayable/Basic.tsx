import React from 'react';
import { NAMESPACE } from '../activity.config';

import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Form } from 'antd';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="PopUpPayable.Basic">
      <Fields.ClaimDecision />
      <Fields.PolicyNo />
      <Fields.BenefitTypeCode />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  basic: modelnamepsace.popUpPayable?.basic || {},
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (lodash.size(changedFields) === 1) {
          dispatch({
            type: `${NAMESPACE}/popUpPableUpdateBase`,
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { basic } = props;
      return formUtils.mapObjectToFields(basic);
    },
  })(Basic)
);
