import React, { PureComponent } from 'react';
import { Card, Row, Col } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Compare from 'claim/pages/AppealCase/ManualAssessment/_components/Compare';
import { withContextData, Provider } from '@/components/_store';
import { ESectionType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import SummaryPayableAmount from './SummaryAmount';
import TreatmentListItemOfBasicInfo from './TreatmentListItemOfBasicInfo';
import TreatmentPayableList from './TreatmentPayableList';
import ProcedureList from '../Procedure/ProcedureList';
import InvoiceList from '../Invoice/InvoiceList';

import styles from './TreatmentListItem.less';

const mapStateToProps = (
  { PHCLMOfAppealCaseController, MaAppealCaseController }: any,
  { treatmentId, withData: { caseType } }: any
) => {
  const { claimEntities } = caseType
    ? PHCLMOfAppealCaseController[caseType]
    : PHCLMOfAppealCaseController;

  return {
    treatmentItem: claimEntities.treatmentListMap[treatmentId],
    appealPage: MaAppealCaseController.appealPage,
  };
};

@connect(mapStateToProps)
class TreatmentItem extends PureComponent {
  state = {
    expandedTreatment: false,
  };

  handleBtnClick = (open: boolean) => {
    const { withData, dispatch, appealPage } = this.props;
    const { expandedTreatment } = this.state;
    const { expandedIncident }: any = withData || {};
    if (lodash.isUndefined(open) && expandedIncident && appealPage === 0) return;

    this.setState((preState: any) => {
      return {
        ...preState,
        expandedTreatment: lodash.isBoolean(open) ? open : !preState.expandedTreatment,
      };
    });
    if (expandedIncident && !expandedTreatment && appealPage === 0 && lodash.isBoolean(open)) {
      dispatch({
        type: 'MaAppealCaseController/saveCurrentPage',
        payload: {
          position: 1,
        },
      });
    }
  };

  render() {
    const { incidentId, treatmentId, treatmentItem, withData, appealPage } = this.props;
    const { expandedIncident }: any = withData || {};
    const { expandedTreatment } = this.state;

    let spanTreament = expandedIncident ? 24 : 12;
    let spanInoice = spanTreament;
    if (appealPage > 0) {
      spanTreament = 8;
    }

    if (
      (((!expandedIncident && !expandedTreatment) ||
        (expandedIncident && !expandedTreatment) ||
        (!expandedIncident && expandedTreatment)) &&
        appealPage === 1) ||
      appealPage > 1
    ) {
      spanInoice = 16;
    }

    if (expandedIncident && expandedTreatment && appealPage === 1) {
      spanInoice = 8;
    }

    return (
      <div className={styles.treatmentItem}>
        <Row type="flex" gutter={24}>
          <Compare
            expandOrigin={expandedTreatment}
            sectionType={ESectionType.Treatment}
            handleBtnClick={this.handleBtnClick}
          >
            <Col span={spanTreament}>
              <Card
                title={`${formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
                })} No. ${treatmentItem.treatmentNo}`}
                bordered={false}
                style={{ width: '100%' }}
              >
                <SummaryPayableAmount treatmentId={treatmentId} />
                <TreatmentPayableList incidentId={incidentId} treatmentId={treatmentId} />
                <TreatmentListItemOfBasicInfo incidentId={incidentId} treatmentId={treatmentId} />
                <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
              </Card>
            </Col>
          </Compare>
          <Col span={spanInoice}>
            <Provider data={{ expandedTreatment }}>
              <InvoiceList incidentId={incidentId} treatmentId={treatmentId} />
            </Provider>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withContextData(TreatmentItem);
