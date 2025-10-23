/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import IncidentListItem from './IncidentListItem';
import SwitchBtn from '../_components/SwitchBtn';
import styles from './IncidentList.less';

interface IProps {
  handleSwitch: Function;
  incidentList?: string[];
  showPrimary: boolean;
}
@connect(({ daOfClaimAssessmentController }: any) => ({
  incidentList: lodash.get(daOfClaimAssessmentController, 'claimProcessData.incidentList', []),
  caseCategory: lodash.get(daOfClaimAssessmentController, 'claimProcessData.caseCategory'),
  treatmentListMap: lodash.get(daOfClaimAssessmentController, 'claimEntities.treatmentListMap'),
}))
class IncidentList extends Component<IProps> {
  showExpendBtn = (incidentId) => {
    const { treatmentListMap }: any = this.props;

    let hasInvoice = false;
    lodash.forEach(treatmentListMap, (treatment) => {
      if (treatment.incidentId === incidentId && !lodash.isEmpty(treatment.invoiceList)) {
        hasInvoice = true;
      }
    });
    return hasInvoice;
  };

  render() {
    const { incidentList, handleSwitch, showPrimary }: any = this.props;

    return (
      <div className={showPrimary ? '' : styles.incidentList}>
        {lodash.map(lodash.compact(incidentList), (item) => (
          <div className={styles.incidentItem} key={item}>
            <IncidentListItem total={(incidentList as []).length} incidentId={item as string} />
            {this.showExpendBtn(item) && (
              <SwitchBtn.SwitchRight onClick={() => handleSwitch(item)} />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default IncidentList;
