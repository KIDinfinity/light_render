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
@connect(({ hbOfClaimAssessmentController }: any) => ({
  incidentList: lodash.get(hbOfClaimAssessmentController, 'claimProcessData.incidentList', []),
}))
class IncidentList extends Component<IProps> {
  render() {
    const { incidentList, handleSwitch, showPrimary } = this.props;

    return (
      <div className={showPrimary ? '' : styles.incidentList}>
        {lodash.map(lodash.compact(incidentList), (item, index) => (
          <div className={styles.incidentItem} key={item}>
            <IncidentListItem
              total={(incidentList as []).length}
              incidentNo={index + 1}
              incidentId={item}
            />
            <SwitchBtn.SwitchRight onClick={() => handleSwitch(item)} />
          </div>
        ))}
      </div>
    );
  }
}

export default IncidentList;
