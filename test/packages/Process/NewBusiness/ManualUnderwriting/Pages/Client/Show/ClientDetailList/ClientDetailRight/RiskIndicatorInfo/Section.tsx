import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/riskIndicatorInfo';

const RiskIndicatorInfo = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} spanMode="dobule" readOnly />;
};

export default connect(({ [NAMESPACE]: modelNamespace }: any, { clientId }: any) => ({
  personalInfoData: lodash.get(modelNamespace, `entities.clientMap.${clientId}.personalInfo`),
  riskIndicatorConfigList: modelNamespace.riskIndicatorConfigList,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { personalInfoData, riskIndicatorConfigList, clientId } = props;

      const { riskScore: amlRiskScore, fecRiskMsg } = lodash.pick(
        lodash.find(riskIndicatorConfigList, {
          clientId,
          riskFactorCode: 'AML',
        }),
        ['riskScore', 'fecRiskMsg']
      );

      const {
        riskScore,
        riskLevel,
        fecRiskMsg: fecRiskMsgCRR,
      } = lodash.pick(
        lodash.find(riskIndicatorConfigList, {
          clientId,
          riskFactorCode: 'CRR',
        }),
        ['riskScore', 'riskLevel', 'fecRiskMsg']
      );
      return formUtils.mapObjectToFields({
        ...personalInfoData,
        fecRiskMsg,
        amlRiskScore,
        riskScore,
        riskLevel,
        fecRiskMsgCRR,
      });
    },
  })(RiskIndicatorInfo)
);
