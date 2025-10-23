import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const DiagnosisNames = ({ form, diagnosisIdList, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} section="OutpatientDateGroup" editable={editable}>
      <Fields.DiagnosisName diagnosisIdList={diagnosisIdList} incidentId={incidentId} />
    </Section>
  );
};

export default connect(({ JPCLMOfClaimAssessment, formCommonController }: any) => ({
  validating: formCommonController.validating,
  diagnosisListMap: JPCLMOfClaimAssessment.claimEntities.diagnosisListMap,
}))(
  Form.create<any>({
    mapPropsToFields(props) {
      const { diagnosisName, diagnosisListMap } = props;
      return formUtils.mapObjectToFields({ diagnosisName }, () => {
        return lodash.find(diagnosisListMap, (item) => item.id === diagnosisName) || diagnosisName;
      });
    },
    onFieldsChange(props, changedFields) {
      const { dispatch, treatmentId, diagnosisName, group, validating } = props;
      if (!validating) {
        dispatch({
          type: 'JPCLMOfClaimAssessment/opTreatmentListDiagnosisListUpdate',
          payload: {
            treatmentId,
            group,
            changedFields,
            oldDiagnosisName: diagnosisName,
          },
        });
      }
    },
  })(DiagnosisNames)
);
