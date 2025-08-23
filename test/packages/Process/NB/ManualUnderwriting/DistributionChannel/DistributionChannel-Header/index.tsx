import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import AgentType from 'process/NB/Enum/AgentType';
import Section, { Fields } from './Section';

const Distributionchannelheader = ({ form }: any) => {
  const editable = false;
  return (
    <Section form={form} editable={editable} section="Distributionchannel-Header">
      <Fields.Distributionchannel />
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  distributionchannel: lodash
    .chain(modelnamepsace)
    .get('businessData.agentList')
    .find((agent: any) => agent.agentType === AgentType.Primary)
    .value(),
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating }: any = props;
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'setDistributionchannelSection',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setDistributionchannelSection',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { distributionchannel } = props;
      return formUtils.mapObjectToFields(distributionchannel);
    },
  })(Distributionchannelheader)
);
