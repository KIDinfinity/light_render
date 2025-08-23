import React from 'react';
import { v4 as uuid } from 'uuid';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash, { isEmpty } from 'lodash';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Fields } from './Fields';

import { localConfig } from '../../_config/DistributionChannelField';
import { isString } from 'lodash';

const DistributionChannelInfo = ({ form, itemData, sectionConfig }: any) => {
  const formId = `DistributionChannel-Field_${uuid()}`;
  return (
    <Section
      section="DistributionChannel-Field"
      formId={formId}
      form={form}
      localConfig={localConfig}
      tableHeaderConfig={sectionConfig}
    >
      <Fields.ServicingBranch id={itemData?.id} isShow={!itemData?.isLast} />
      <Fields.Agentno />
      <Fields.Agentgivenname isShow={!itemData?.isLast} />
      <Fields.Agentphone isShow={!itemData?.isLast} />
      <Fields.Agentgroup isShow={!itemData?.isLast} />
      <Fields.Agentemail isShow={!itemData?.isLast} />
      <Fields.Agencyname isShow={!itemData?.isLast} />
      <Fields.CommissionSplitPercent id={itemData?.id} isShow={!itemData?.isLast} />
      <Fields.AgentCert />
      <Fields.Bankstaffno id={itemData?.id} isShow={!itemData?.isLast} />
      <Fields.Bankcustomerid id={itemData?.id} isShow={!itemData?.isLast} />
      <Fields.Secondaryfwpname isShow={!itemData?.isLast} />
      <Fields.Secondaryfwpcode isShow={!itemData?.isLast} />
      <Fields.Bltsrefno isShow={!itemData?.isLast} />
      <Fields.Campaigndate isShow={!itemData?.isLast} />
      <Fields.Campaigncode isShow={!itemData?.isLast} />
      <Fields.Affiliatecode isShow={!itemData?.isLast} />
      <Fields.Agentrelated isShow={!itemData?.isLast} />
      <Fields.Agentrelationship isShow={!itemData?.isLast} />
      <Fields.Insuranceinforce isShow={!itemData?.isLast} />
      <Fields.Paidbypolicyloan isShow={!itemData?.isLast} />
      <Fields.Remark isShow={!itemData?.isLast} />
      <Fields.Signdate isShow={!itemData?.isLast} />
      <Fields.Crossselling isShow={!itemData?.isLast} />
      <Fields.BankChannel id={itemData?.id} isShow={!itemData?.isLast} />
      <Fields.Agentsubchannelcode isShow={!itemData?.isLast} />
      <Fields.BankStaffPhone />
      <Fields.BankStaffRefName />
      <Fields.AgentBlacklist isShow={!itemData?.isLast} />
      <Fields.CrossSellingFlag isShow={!itemData?.isLast} />
      <Fields.IntermediaryStatus isShow={!itemData?.isLast} />
    </Section>
  );
};
export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, itemData } = props;
      let distributionChannel = {
        id: itemData?.id,
        ...changedFields,
      };
      if (changedFields?.crossSelling) {
        const crossSelling = lodash.join(
          formUtils.queryValue(changedFields?.crossSelling) || [],
          ','
        );
        distributionChannel = { ...distributionChannel, crossSelling };
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'updateDistributionChannel',
          payload: {
            changedFields: distributionChannel,
            errorId: distributionChannel?.id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { itemData } = props;

      const crossSelling = formUtils.queryValue(itemData?.crossSelling);
      return formUtils.mapObjectToFields({
        ...itemData,
                crossSelling:
          isString(crossSelling) && !isEmpty(crossSelling) ? crossSelling.split(',') : [],
      });
    },
  })(DistributionChannelInfo)
);
