import React from 'react';
import {  Form } from 'antd';
import lodash from 'lodash';
import { useSelector, connect } from 'dva';

import { FormAntCard, formUtils } from 'basic/components/Form';

import Section, { SectionTitle, Fields } from './Section/index';
import { NAMESPACE } from '../activity.config';

const OverallRisk = connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  fecRiskInfo: lodash.get(modelnamepsace, 'businessData.fecInfo.fecRiskInfo'),
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    // onFieldsChange(props: any, changedFields: any) {
    //   const { dispatch, validating } = props;

    //   if (formUtils.shouldUpdateState(changedFields)) {
    //     if (validating) {
    //       setTimeout(() => {
    //         dispatch({
    //           type: `${NAMESPACE}/saveEntry`,
    //           target: 'saveApprovalDecision',
    //           payload: {
    //             changedFields,
    //           },
    //         });
    //       }, 0);
    //     } else {
    //       dispatch({
    //         type: `${NAMESPACE}/saveFormData`,
    //         target: 'saveApprovalDecision',
    //         payload: {
    //           changedFields,
    //         },
    //       });
    //     }
    //   }
    // },
    mapPropsToFields(props: any) {
      const { fecRiskInfo } = props;
      return formUtils.mapObjectToFields(fecRiskInfo);
    },
  })(({ form }) => {
    const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
    return (
      <FormAntCard title={<SectionTitle />}>
        <Section form={form} editable={editable} section="OverallRisk">
          <Fields.FecRiskLevel />
          <Fields.TotalLevel />
          <Fields.TotalScore />
        </Section>
      </FormAntCard>
    );
  })
);

OverallRisk.displayName = 'OverallRisk';

export default OverallRisk;
