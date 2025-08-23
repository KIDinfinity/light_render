import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { CLAIMPAYABLEITEM } from '@/utils/claimConstant';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { getClaimPayableIdList } from 'claim/pages/utils/selector';
import ClaimPayableListItem from './ClaimPayableListItem';

@connect(({ bpOfClaimAssessmentController, claimEditable }: any, { incidentId }: any) => ({
  claimNo: bpOfClaimAssessmentController.claimProcessData.claimNo,
  curIncidentPayableList: getClaimPayableIdList(
    incidentId,
    bpOfClaimAssessmentController.claimEntities.claimPayableListMap
  ),
  taskNotEditable: claimEditable.taskNotEditable,
}))
class ClaimPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      hasTreatment: nextHasTreatment,
      claimNo: nextClaimNo,
      curIncidentPayableList: nextCurIncidentPayableList,
    } = nextProps;
    const { hasTreatment, claimNo, curIncidentPayableList }: any = this.props;

    return (
      !(hasTreatment === nextHasTreatment) ||
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curIncidentPayableList, nextCurIncidentPayableList)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, claimNo }: any = this.props;

    const addClaimPayableItem = {
      ...CLAIMPAYABLEITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'bpOfClaimAssessmentController/addClaimPayableItem',
      payload: { addClaimPayableItem },
    });
  };

  render() {
    const { hasTreatment, curIncidentPayableList, taskNotEditable }: any = this.props;

    return (
      <div>
        {curIncidentPayableList &&
          lodash.map(curIncidentPayableList, (item) => (
            <ClaimPayableListItem key={item} incidentPayableId={item} hasTreatment={hasTreatment} />
          ))}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button:
                'app.navigator.task-detail-of-claim-assessment.button.incident-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default ClaimPayableList;
