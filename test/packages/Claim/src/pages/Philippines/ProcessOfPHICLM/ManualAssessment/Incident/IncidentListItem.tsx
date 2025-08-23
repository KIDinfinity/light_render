import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { calculatPayableAmountIncidentLevel } from 'claim/pages/utils/calculatPayableAmount';
import IncidentListItemOfShort from './IncidentListItemOfShort';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';
import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
}

const mapStateToProps = ({ PHCLMOfClaimAssessmentController }: any, { incidentId }: any) => {
  const { claimEntities } = PHCLMOfClaimAssessmentController;
  const totalPayableAmount = calculatPayableAmountIncidentLevel(claimEntities, incidentId);
  const percentValue = totalPayableAmount > 0 ? 100 : 0;
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
    const { incidentId, totalPayableAmount, percentValue, hasTreatment, total }: any = this.props;
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
            total={total}
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
