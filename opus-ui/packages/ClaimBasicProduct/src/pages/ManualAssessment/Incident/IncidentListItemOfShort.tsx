import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SummaryCurrencyPayableAmount from 'claim/components/SummaryCurrencyPayableAmount';
import { formUtils } from 'basic/components/Form';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';

@connect(({ bpOfClaimAssessmentController }: any, { incidentId }: any) => ({
  incidentNo: formUtils.queryValue(
    lodash.get(
      bpOfClaimAssessmentController,
      `claimEntities.incidentListMap.${incidentId}.incidentNo`
    )
  ),
}))
class IncidentItem extends PureComponent {
  render() {
    const { incidentId, incidentNo, hasTreatment, summaryParams }: any = this.props;

    return (
      <Card
        title={
          <div>
            {`${formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
            })} No. ${incidentNo}`}
          </div>
        }
        bordered={false}
      >
        <SummaryCurrencyPayableAmount
          params={summaryParams}
          hasTreatment="noTreatment"
          hiddenPrefix
        />
        <ClaimPayableList incidentId={incidentId} hasTreatment={hasTreatment} />
        <IncidentListItemOfBasicInfo incidentId={incidentId} hasTreatment={hasTreatment} />
        <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
      </Card>
    );
  }
}

export default IncidentItem;
