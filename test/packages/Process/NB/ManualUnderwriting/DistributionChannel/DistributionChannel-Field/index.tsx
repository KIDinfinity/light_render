import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import Section, { Fields } from './Section';
import useJudgeHasQuestionnaire from 'process/NB/components/AgentQuestionnaire/hooks/useJudgeHasQuestionnaire';

const Distributionchannelfield = ({ form, itemData }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const showQuestionButton = useJudgeHasQuestionnaire();

  return (
    <Section
      form={form}
      editable={editable}
      section="DistributionChannel-Field"
      showQuestionButton={showQuestionButton}
    >
      <Fields.ServicingBranch id={itemData?.id} />
      <Fields.Agentno />
      <Fields.Agentgivenname />
      <Fields.Agentphone />
      <Fields.Agentemail />
      <Fields.Agencyname />
      <Fields.CommissionSplitPercent id={itemData?.id} />
      <Fields.AgentCert />
      <Fields.Bankstaffno id={itemData?.id} />

      <Fields.Bankcustomerid id={itemData?.id} />

      <Fields.Secondaryfwpname />

      <Fields.Secondaryfwpcode />

      <Fields.Bltsrefno id={itemData?.id} />

      <Fields.Campaigndate />

      <Fields.Campaigncode />

      <Fields.Affiliatecode />

      <Fields.Agentrelated />

      <Fields.Agentrelationship />

      <Fields.Insuranceinforce />

      <Fields.Paidbypolicyloan />

      <Fields.Remark />

      <Fields.Signdate />

      <Fields.Crossselling />

      <Fields.BankChannel id={itemData?.id} />

      <Fields.Agentsubchannelcode />

      <Fields.Agentgroup />
      <Fields.BankStaffPhone />
      <Fields.AgentBlacklist />
      <Fields.CrossSellingFlag />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onValuesChange: (props, changedFields) => {
      const { dispatch, itemData } = props;
      dispatch({
        type: `${NAMESPACE}/setAgentData`,
        payload: {
          changedFields,
          id: lodash.get(itemData, 'id'),
        },
      });
    },
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, itemData } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setDistributionchannelSection',
              payload: {
                changedFields,
                id: lodash.get(itemData, 'id'),
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setDistributionchannelSection',
            payload: {
              changedFields,
              id: lodash.get(itemData, 'id'),
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { itemData } = props;
      return formUtils.mapObjectToFields({
        ...itemData,
        crossSelling: lodash.chain(itemData).get('crossSelling').isEmpty().value()
          ? []
          : lodash.chain(itemData).get('crossSelling').split(',').value(),
      });
    },
  })(Distributionchannelfield)
);
