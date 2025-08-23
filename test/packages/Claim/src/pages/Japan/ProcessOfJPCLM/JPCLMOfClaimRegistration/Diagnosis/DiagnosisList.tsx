import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import DiagnosisListItem from './DiagnosisListItem';
import styles from './DiagnosisList.less';

interface IProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  claimNo: string;
}

@connect(
  ({ JPCLMOfClaimRegistrationController, formCommonController }: any, { incidentId }: any) => ({
    claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
    diagnosisList: lodash.get(
      JPCLMOfClaimRegistrationController.claimEntities.incidentListMap[incidentId],
      'diagnosisList'
    ),
    submited: formCommonController.submited,
  })
)
class DiagnosisList extends Component<IProps> {
  handleAdd = () => {
    const { dispatch, claimNo, incidentId } = this.props;
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addDiagnosisItem',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  render() {
    const { incidentId, diagnosisList, dataEditable } = this.props;
    const isShow = lodash.compact(diagnosisList).length || dataEditable;

    return (
      <div className={isShow ? styles.diagnosiCard : ''}>
        {isShow && (
          <div>
            <h3 className={styles.title}>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
              })}
            </h3>
            {lodash.map(lodash.compact(diagnosisList), (item) => (
              <DiagnosisListItem
                incidentId={incidentId}
                diagnosisId={item}
                key={item}
                dataEditable={dataEditable}
              />
            ))}
          </div>
        )}
        {dataEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
            })}
          />
        )}
      </div>
    );
  }
}

export default DiagnosisList;
