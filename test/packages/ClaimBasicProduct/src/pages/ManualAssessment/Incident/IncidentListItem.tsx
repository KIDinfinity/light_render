import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import {
  calculatPayableAmountIncidentLevel,
  calculatPayableProportionIncidentLevel,
} from 'claim/pages/utils/calculatPayableAmount';
import IncidentListItemOfShort from './IncidentListItemOfShort';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';
import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
}

const mapStateToProps = ({ bpOfClaimAssessmentController }: any, { incidentId }: any) => {
  const { claimEntities } = bpOfClaimAssessmentController;
  const totalPayableAmount = calculatPayableAmountIncidentLevel(claimEntities, incidentId);
  const percentValue = calculatPayableProportionIncidentLevel(claimEntities, incidentId);
  const hasTreatment = !lodash
    .chain(claimEntities)
    .get(`incidentListMap.${incidentId}.treatmentList`, [])
    .isEmpty()
    .value();
  return {
    totalPayableAmount,
    percentValue,
    hasTreatment,
  };
};

@connect(mapStateToProps)
class IncidentItem extends PureComponent<IncidentItemProps> {
  render() {
    const { incidentId, totalPayableAmount, percentValue, hasTreatment }: any = this.props;
    const summaryParams = {
      totalPayableAmount,
      percentValue,
    };

    return (
      <div className={styles.incidentItem}>
        {hasTreatment ? (
          <IncidentListItemOfExpend
            incidentId={incidentId}
            hasTreatment={hasTreatment}
            summaryParams={summaryParams}
          />
        ) : (
          <IncidentListItemOfShort
            incidentId={incidentId}
            hasTreatment={hasTreatment}
            summaryParams={summaryParams}
          />
        )}
      </div>
    );
  }
}

export default IncidentItem;
