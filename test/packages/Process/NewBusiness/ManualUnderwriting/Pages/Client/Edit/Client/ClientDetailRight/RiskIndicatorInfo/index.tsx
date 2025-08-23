import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/riskIndicatorInfo';

const RiskIndicatorInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  personalInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo,
  loadingStatus: login.loadingStatus,
  riskIndicatorConfigList: modelnamepsace.riskIndicatorConfigList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveRiskIndicatorInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
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
        fecRiskMsgCRR,
        riskScore,
        riskLevel,
      });
    },
  })(RiskIndicatorInfo)
);
