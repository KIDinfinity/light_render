import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Compare from 'claim/pages/AppealCase/ManualAssessment/_components/Compare';
import { ESectionType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { withContextData } from '@/components/_store';
import SummaryPayableAmount from './SummaryAmount';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';

import styles from './IncidentListItem.less';

@connect(({ PHCLMOfAppealCaseController }: any, { incidentId }: any) => ({
  incidentNo: formUtils.queryValue(
    lodash.get(
      PHCLMOfAppealCaseController,
      `claimEntities.incidentListMap.${incidentId}.incidentNo`
    )
  ),
}))
class IncidentItem extends PureComponent {
  state = {
    expandedIncident: false,
  };

  handleBtnClick = (open: boolean) => {
    this.setState((preState: any) => {
      return {
        ...preState,
        expandedIncident: lodash.isBoolean(open) ? open : !preState.expandedIncident,
      };
    });
  };

  render() {
    const { incidentId, incidentNo, hasTreatment, noHover }: any = this.props;
    const { expandedIncident } = this.state;

    return (
      <Compare
        sectionType={ESectionType.Incident}
        expandOrigin={expandedIncident}
        handleBtnClick={this.handleBtnClick}
        noHover={noHover}
        horizontal
      >
        <div className={styles.claimPayableShort}>
          <Card
            title={`${formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
            })} No. ${incidentNo}`}
            bordered={false}
          >
            <SummaryPayableAmount incidentId={incidentId} />
            <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
            <IncidentListItemOfBasicInfo incidentId={incidentId} hasTreatment={hasTreatment} />
            <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
          </Card>
        </div>
      </Compare>
    );
  }
}

export default withContextData(IncidentItem);
