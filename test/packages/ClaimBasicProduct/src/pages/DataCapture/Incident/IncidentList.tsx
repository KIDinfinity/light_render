import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { Row, Col } from 'antd';
import { VLD_000051 } from '@/utils/validations';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import CommonEmpty from '@/components/Empty';
import IncidentListItem from './IncidentListItem';

@connect(({ bpOfDataCaptureController, formCommonController, claimEditable }: any) => ({
  incidentList: lodash.get(bpOfDataCaptureController, 'claimProcessData.incidentList'),
  claimNo: lodash.get(bpOfDataCaptureController, 'claimProcessData.claimNo'),
  submited: formCommonController.submited,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class IncidentList extends PureComponent {
  handleAdd = () => {
    const { dispatch, claimNo, incidentList }: any = this.props;
    const incidentId = uuidv4();
    const diagnosisId = uuidv4();
    let incidentNo = 1;
    if (lodash.isArray(incidentList)) {
      incidentNo = incidentList.length + 1;
    }

    const addIncidentItem = {
      ...INCIDENTITEM,
      claimNo,
      diagnosisList: [diagnosisId],
      id: incidentId,
      incidentNo,
    };
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: diagnosisId,
      incidentId,
    };

    dispatch({
      type: 'bpOfDataCaptureController/addIncidentItem',
      payload: {
        addIncidentItem,
        addDiagnosisItem,
      },
    });
    dispatch({
      type: 'bpOfDataCaptureController/setIncidentItemExpandStatus',
      payload: {
        id: incidentId,
        status: true,
      },
    });
  };

  render() {
    const { incidentList, submited, taskNotEditable }: any = this.props;

    return (
      <div>
        {VLD_000051(incidentList, submited) && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({
              Label_COM_WarningMessage: 'ERR_000070',
            })}
          />
        )}
        {lodash.isArray(incidentList) &&
          incidentList.length > 0 &&
          lodash.map(incidentList, (item) => (
            <IncidentListItem key={item} total={incidentList.length} incidentId={item} />
          ))}
        {incidentList && incidentList.length === 0 && <CommonEmpty />}
        {!taskNotEditable && (
          <Row type="flex" gutter={16}>
            <Col span={8}>
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
