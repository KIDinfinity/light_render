import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import SwitchBtn from 'claim/pages/AppealCase/ManualAssessment/_components/SwitchBtn';
import IncidentListItemOfShort from './IncidentListItemOfShort';
import IncidentListItemOfExpend from './IncidentListItemOfExpend';

import styles from './IncidentListItem.less';

interface IncidentItemProps {
  total: number;
  incidentNo: number;
  incidentId: string;
  lastIncidentId?: string;
  appealPage?: number;
  pageArrowManage?: any;
}

const mapStateToProps = (
  { PHCLMOfAppealCaseController, MaAppealCaseController }: any,
  { incidentId }: any
) => {
  const { claimEntities } = PHCLMOfAppealCaseController;
  const hasTreatment = !lodash
    .chain(claimEntities)
    .get(`incidentListMap.${incidentId}.treatmentList`, [])
    .isEmpty()
    .value();

  return {
    hasTreatment,
    appealPage: MaAppealCaseController.appealPage,
    pageArrowManage: MaAppealCaseController.pageArrowManage,
  };
};

@connect(mapStateToProps)
class IncidentItem extends PureComponent<IncidentItemProps> {
  handleSwitch = (position: number) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'MaAppealCaseController/saveCurrentPage',
      payload: {
        position,
      },
    });
  };

  render() {
    const {
      incidentId,
      hasTreatment,
      appealPage,
      pageArrowManage = {},
      lastIncidentId,
    }: any = this.props;
    const { showLeft, showRight } = pageArrowManage[incidentId] || {
      showLeft: true,
      showRight: true,
    };

    return (
      <div className={styles.incidentItem}>
        {hasTreatment ? (
          <IncidentListItemOfExpend incidentId={incidentId} hasTreatment={hasTreatment} />
        ) : (
          <IncidentListItemOfShort
            incidentId={incidentId}
            hasTreatment={hasTreatment}
            noHover={lastIncidentId && lastIncidentId === incidentId}
          />
        )}
        {appealPage > 0 && hasTreatment && showLeft && (
          <SwitchBtn.SwitchLeft onClick={() => this.handleSwitch(0)} />
        )}
        {appealPage >= 0 && appealPage < 2 && hasTreatment && showRight && (
          <SwitchBtn.SwitchRight onClick={() => this.handleSwitch(1)} />
        )}
      </div>
    );
  }
}

export default IncidentItem;
