import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Card, Row, Col } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Compare from 'claim/pages/AppealCase/ManualAssessment/_components/Compare';
import { getClaimPayableByIncidentId } from 'claim/pages/AppealCase/ManualAssessment/_functions';
import { ESectionType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { Provider } from '@/components/_store';
import SummaryPayableAmount from './SummaryAmount';
import ClaimPayableList from './ClaimPayableList';
import IncidentListItemOfBasicInfo from './IncidentListItemOfBasicInfo';
import DiagnosisList from '../Diagnosis/DiagnosisList';
import TreatmentList from '../Treatment/TreatmentList';

@connect(({ PHCLMOfAppealCaseController, MaAppealCaseController }: any, { incidentId }: any) => ({
  appealPage: MaAppealCaseController.appealPage,
  benefitCategory: lodash.get(
    getClaimPayableByIncidentId(
      PHCLMOfAppealCaseController?.claimEntities?.claimPayableListMap,
      incidentId
    ),
    `benefitCategory`
  ),
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
    const { incidentId, incidentNo, hasTreatment, appealPage, benefitCategory }: any = this.props;

    const { expandedIncident } = this.state;

    let spanTreament = expandedIncident ? 8 : 16;
    if (appealPage > 0) {
      spanTreament = 24;
    }

    return (
      <Row type="flex" gutter={24}>
        <Compare
          sectionType={ESectionType.Incident}
          expandOrigin={expandedIncident}
          handleBtnClick={this.handleBtnClick}
          incidentId={incidentId}
          benefitCategory={benefitCategory}
        >
          <Col span={8}>
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
          </Col>
        </Compare>
        <Col span={spanTreament}>
          <Provider data={{ expandedIncident, incidentId, benefitCategory }}>
            <TreatmentList incidentId={incidentId} />
          </Provider>
        </Col>
      </Row>
    );
  }
}

export default IncidentItem;
