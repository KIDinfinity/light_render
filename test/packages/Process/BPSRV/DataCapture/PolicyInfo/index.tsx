import React from 'react';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Item from './Item';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';
import Section, { Fields, SectionTitle } from './Section';

const PolicyInfo = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.policyInfo}>
      <FormAntCard
        title={
          <SectionTitle
            suffix={
              <Section form={form} editable={editable} section="PolicyInfo">
                <Fields.PolicyId />
              </Section>
            }
          />
        }
      >
        <Item />
      </FormAntCard>
    </div>
  );
};
export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  mainPolicyId: modelnamepsace.processData?.mainPolicyId,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/policyIdUpdate`,
              payload: {
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { mainPolicyId } = props;
      return formUtils.mapObjectToFields({ policyId: mainPolicyId });
    },
  })(PolicyInfo)
);
