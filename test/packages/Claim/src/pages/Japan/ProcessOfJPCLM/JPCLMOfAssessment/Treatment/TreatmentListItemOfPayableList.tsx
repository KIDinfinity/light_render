import React, { PureComponent } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getTreatmentPayableIdList } from 'claim/pages/utils/selector';
import TreatmentListItemOfPayableListItem from './TreatmentListItemOfPayableListItem';
import TreatmentItemPayableItemAdd from './TreatmentListItemOfPayableListItemAdd';

@connect(({ JPCLMOfClaimAssessmentController, claimEditable }, { treatmentId }) => ({
  curTreatmentPayableList: getTreatmentPayableIdList(
    treatmentId,
    JPCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap
  ),
  treatmentPayableAddItem: JPCLMOfClaimAssessmentController.treatmentPayableAddItem,
  claimNo: JPCLMOfClaimAssessmentController.claimProcessData.claimNo,
  taskNotEditable: claimEditable.taskNotEditable,
}))
class TreatmentListItemOfPayableList extends PureComponent {
  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo } = this.props;
    dispatch({
      type: 'JPCLMOfClaimAssessmentController/addTreatmentPayableItem',
      payload: {
        incidentId,
        treatmentId,
        claimNo,
      },
    });
  };

  render() {
    const {
      treatmentId,
      treatmentPayableAddItem,
      incidentId,
      curTreatmentPayableList,
      taskNotEditable,
    } = this.props;
    const isBelongToCurrentItem = treatmentId === treatmentPayableAddItem?.treatmentId;

    return (
      <div>
        {!lodash.isEmpty(curTreatmentPayableList) &&
          lodash.map(curTreatmentPayableList, (item) => (
            <TreatmentListItemOfPayableListItem treatmentPayableItemId={item} key={item} />
          ))}
        {treatmentPayableAddItem && isBelongToCurrentItem && (
          <TreatmentItemPayableItemAdd
            treatmentPayableItemDetail={treatmentPayableAddItem}
            incidentId={incidentId}
          />
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.treatment-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default TreatmentListItemOfPayableList;
