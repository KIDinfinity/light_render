import React from 'react';
import { Form } from 'antd';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import Section, { Fields } from './Section';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

const Takeoverfield = ({ form }: any) => {
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  return (
    <Section form={form} editable={editable}>
      <Fields.Takeoverflag />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamespace }: any) => ({
  validating: formCommonController.validating,
  takeOverFlag: lodash.get(modelnamespace?.businessData, 'takeOverFlag'),
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setTakeOverFlag',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setTakeOverFlag',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { takeOverFlag } = props;
      return formUtils.mapObjectToFields({ takeOverFlag });
    },
  })(Takeoverfield)
);
