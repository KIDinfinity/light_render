import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';

const Remindertype = ({ form }: any) => {
  return (
    <Section form={form} section="NTUinfo-Field">
      <Fields.Remindertype />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  ntuDataObject: modelnamepsace.ntuDataObject,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setNtuData',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setNtuData',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { ntuDataObject } = props;
      return formUtils.mapObjectToFields(ntuDataObject);
    },
  })(Remindertype)
);
