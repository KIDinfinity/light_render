import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';

import { ClaimDecision } from 'claim/pages/utils/claim';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import Section, { PayableBasicFields as Fields } from '../Section';
import styles from './Group.less';

const ClaimPayableListItemOfBasicInfo = ({
  form,
  incidentPayableItem,
  hasTreatment,
  curIncidentPayableList,
  noPolicyNo,
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isDeclined = formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.deny;
  const isNA = formUtils.queryValue(incidentPayableItem.claimDecision) === ClaimDecision.NA;
  const layoutName = hasTreatment ? 'x-layout' : 'no-treatment-layout';
  const taskDetail =
    useSelector(({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.taskDetail) || {};

  const handleTitleClick = (originClaimNo: string) => {
    const { caseCategory, partyId, customerType, businessNo } = taskDetail;

    window.open(
      `/claim/history?businessNo=${businessNo}&caseCategory=${caseCategory}&claimNo=${originClaimNo}&customerType=${customerType}&partyId=${partyId}`,
      '_blank'
    );
  };
  return (
    <div>
      {incidentPayableItem?.isAdjustment && (
        <div className={styles.Adjustment}>
          <span className={styles.flag} />
          <span className={styles.flagTitle}> 調整 </span>
          <span
            className={styles.no}
            onClick={() => {
              handleTitleClick(incidentPayableItem.originClaimNo);
            }}
          >
            NO.{incidentPayableItem.originClaimNo}
          </span>
        </div>
      )}
      <Section
        form={form}
        editable={editable}
        section="Incident.Payable.Basic"
        layoutName={layoutName}
      >
        <Fields.AssessorOverrideAmount
          incidentPayableItem={incidentPayableItem}
          isDeclined={isDeclined}
        />
        <Fields.BenefitTypeCode
          incidentPayableItem={incidentPayableItem}
          curIncidentPayableList={curIncidentPayableList}
          isDeclined={isDeclined}
          isNA={isNA}
        />
        <Fields.ClaimDecision incidentPayableItem={incidentPayableItem} />
        {/* <Fields.DenyCode isDeclined={isDeclined} /> */}
        {/* <Fields.DenyReason incidentPayableItem={incidentPayableItem} /> */}
        {/* <Fields.ExGratiaCode incidentPayableItem={incidentPayableItem} /> */}
        {/* <Fields.ExGratiaReason incidentPayableItem={incidentPayableItem} /> */}
        <Fields.PolicyNo noPolicyNo={noPolicyNo} />
        <Fields.ProductCode isDeclined={isDeclined} incidentPayableItem={incidentPayableItem} />
        <Fields.Remark />
        <Fields.SystemCalculationAmount incidentPayableItem={incidentPayableItem} />
        <Fields.PolicyYear
          incidentPayableItem={incidentPayableItem}
          curIncidentPayableList={curIncidentPayableList}
        />
      </Section>
    </div>
  );
};

export default connect(({ JPCLMOfClaimAssessment, formCommonController }: any) => ({
  validating: formCommonController.validating,
  diagnosisListMap: JPCLMOfClaimAssessment.claimEntities.diagnosisListMap,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentPayableId, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveClaimPayableItem',
              payload: {
                changedFields,
                incidentPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveClaimPayableItem',
            payload: {
              changedFields,
              incidentPayableId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { incidentPayableItem }: any = props;
      return formUtils.mapObjectToFields(incidentPayableItem, {
        remark: (value: any) => transRemarkCodeToMsg(value, true),
      });
    },
  })(ClaimPayableListItemOfBasicInfo)
);
