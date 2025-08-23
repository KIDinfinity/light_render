import React, { PureComponent } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';

import { Row, Col } from 'antd';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import { INCIDENTITEM, JPINCIDENTITEM, DIAGNOSISITEM, TREATMENTITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import IncidentListItem from './IncidentListItem';
import { VLD_000051 } from '@/utils/validations';

@connect(({ JPCLMOfClaimAssessmentController, formCommonController, claimEditable }) => ({
  incidentList: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData.incidentList'),
  claimNo: lodash.get(JPCLMOfClaimAssessmentController, 'claimProcessData.claimNo'),
  submited: formCommonController.submited,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentList extends PureComponent {
  handleAdd = () => {
    const { dispatch, claimNo, incidentList } = this.props;
    const incidentId = uuidv4();
    const diagnosisId = uuidv4();
    const treatmentId = uuidv4();
    const jpIncidentId = uuidv4();

    const jpIncident = {
      ...JPINCIDENTITEM,
      id: jpIncidentId,
      incidentId,
    };
    const addIncidentItem = {
      ...INCIDENTITEM,
      claimNo,
      diagnosisList: [diagnosisId],
      id: incidentId,
      treatmentList: [treatmentId],
      jpIncident,
      incidentNo: lodash.compact(incidentList).length + 1,
    };
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: diagnosisId,
      incidentId,
    };
    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      otherProcedureList: [],
      procedureList: [],
      jpMedicineTreatmentList: [],
      treatmentNo: 1,
    };

    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addIncidentItem',
      payload: {
        addIncidentItem,
        addDiagnosisItem,
        addTreatmentItem,
      },
    });
  };

  render() {
    const { incidentList, submited, taskNotEditable } = this.props;
    return (
      <div>
        {lodash.isArray(incidentList) &&
          lodash.map(incidentList, (item, index) => (
            <IncidentListItem incidentId={item} incidentNo={index + 1} key={item} />
          ))}
        {VLD_000051(incidentList, submited) && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({
              Label_COM_WarningMessage: 'ERR_000070',
            })}
          />
        )}
        {!taskNotEditable && (
          <Row type="flex" gutter={16}>
            <Col span={12}>
              <div>
                <ButtonOfClaim
                  handleClick={this.handleAdd}
                  buttonText={formatMessageApi({
                    Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button',
                  })}
                  buttonStyle={{ width: '100%', height: '36px' }}
                />
              </div>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

export default IncidentList;
