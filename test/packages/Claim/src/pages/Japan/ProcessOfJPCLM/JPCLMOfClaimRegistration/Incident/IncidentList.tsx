import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import IncidentListItem from './IncidentListItem';
import { VLD_000051 } from '@/utils/validations';

interface IProps {
  incidentList?: string[];
}
@connect(({ JPCLMOfClaimRegistrationController }: any) => ({
  claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
  incidentList: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.incidentList'),
}))
class IncidentList extends Component<IProps> {
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
      type: 'JPCLMOfClaimRegistrationController/addIncidentItem',
      payload: {
        addIncidentItem,
        addDiagnosisItem,
      },
    });
  };

  handleDelete = (incidentId) => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removeIncidentItem',
      payload: {
        incidentId,
      },
    });
  };

  render() {
    const { incidentList, dataEditable } = this.props;

    return (
      <div>
        {lodash.map(lodash.compact(incidentList), (item, index) => (
          <IncidentListItem
            key={item}
            incidentNo={index + 1}
            incidentId={item}
            dataEditable={dataEditable}
            handleDelete={this.handleDelete}
          />
        ))}
        {VLD_000051(incidentList, true) && (
          <ErrorTooltipManual
            manualErrorMessage={formatMessageApi({
              Label_COM_WarningMessage: 'ERR_000070',
            })}
          />
        )}
        {dataEditable && (
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
