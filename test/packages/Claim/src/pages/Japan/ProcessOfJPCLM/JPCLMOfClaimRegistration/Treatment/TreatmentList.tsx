import React, { Component } from 'react';
import { connect } from 'dva';
import{ v4 as  uuidv4 } from 'uuid';
import lodash from 'lodash';
import { TREATMENTITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentListItem from './TreatmentListItem';
import styles from './TreatmentList.less';

@connect(({ JPCLMOfClaimRegistrationController }, { incidentId }) => ({
  claimNo: lodash.get(JPCLMOfClaimRegistrationController, 'claimProcessData.claimNo'),
  treatmentList: lodash.get(
    JPCLMOfClaimRegistrationController.claimEntities.incidentListMap[incidentId],
    'treatmentList'
  ),
}))
class TreatmentList extends Component {
  handleAdd = () => {
    const { dispatch, incidentId, claimNo, treatmentList } = this.props;
    const treatmentId = uuidv4();
    let treatmentNo = 1;
    if (lodash.isArray(treatmentList)) {
      treatmentNo = treatmentList.length + 1;
    }

    const addTreatmentItem = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      treatmentNo,
    };

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/addTreatmentItem',
      payload: {
        incidentId,
        addTreatmentItem,
      },
    });
  };

  handleDelete = ({ incidentId, treatmentId }) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'JPCLMOfClaimRegistrationController/removeTreatmentItem',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  render() {
    const { treatmentList, incidentId, dataEditable } = this.props;

    return (
      <div className={styles.treatmentListWrap}>
        {lodash.isArray(treatmentList) &&
          lodash.map(treatmentList, (item, index) => (
            <TreatmentListItem
              incidentId={incidentId}
              treatmentId={item}
              treatmentNo={index + 1}
              key={item}
              dataEditable={dataEditable}
              handleDelete={this.handleDelete}
            />
          ))}
        {dataEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
            })}
            buttonStyle={{ width: '100%', height: '36px' }}
          />
        )}
      </div>
    );
  }
}

export default TreatmentList;
