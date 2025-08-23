import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { TREATMENTPAYABLEITEM } from '@/utils/claimConstant';
import{ v4 as  uuidv4 } from 'uuid';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentPayableListItem from './TreatmentPayableListItem';
import TreatmentPayableListItemOfAI from './TreatmentPayableListItemOfAI';
import TreatmentPayableListItemAdd from './TreatmentPayableListItemAdd';

const mapStateToProps = (
  { daOfClaimAssessmentController, claimEditable }: any,
  { treatmentId }: any
) => {
  const { claimEntities } = daOfClaimAssessmentController;
  const treatmentPayableListMapEntries = Object.entries(claimEntities.treatmentPayableListMap);
  const { claimPayableListMap } = claimEntities;
  const curTreatmentPayableList: any = [];
  lodash.map(treatmentPayableListMapEntries, (item: any) => {
    if (item[1].treatmentId === treatmentId) {
      curTreatmentPayableList.push({
        id: item[0],
        benefitCategory: lodash.get(claimPayableListMap, `${item[1].payableId}.benefitCategory`),
      });
    }
  });
  return {
    curTreatmentPayableList,
    treatmentPayableAddItem: daOfClaimAssessmentController.treatmentPayableAddItem,
    claimNo: daOfClaimAssessmentController.claimProcessData.claimNo,
    taskNotEditable: claimEditable.taskNotEditable,
  };
};

@connect(mapStateToProps)
class TreatmentPayableList extends Component {
  shouldComponentUpdate(nextProps: any) {
    const {
      claimNo: nextClaimNo,
      curTreatmentPayableList: nextCurTreatmentPayableList,
      treatmentPayableAddItem: nextTreatmentPayableAddItem,
    } = nextProps;
    const { claimNo, curTreatmentPayableList, treatmentPayableAddItem }: any = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(nextCurTreatmentPayableList, curTreatmentPayableList) ||
      !lodash.isEqual(nextTreatmentPayableAddItem, treatmentPayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo }: any = this.props;
    const addTreamentPayableItem = {
      ...TREATMENTPAYABLEITEM,
      claimNo,
      id: uuidv4(),
      treatmentId,
      incidentId,
    };
    dispatch({
      type: 'daOfClaimAssessmentController/addTreatmentPayableAddItem',
      payload: { addTreamentPayableItem },
    });
  };

  render() {
    const {
      curTreatmentPayableList,
      treatmentId,
      treatmentPayableAddItem,
      incidentId,
      taskNotEditable,
    }: any = this.props;
    const isBelongToCurrentItem =
      treatmentPayableAddItem && treatmentId === treatmentPayableAddItem.treatmentId;

    return (
      <div>
        {curTreatmentPayableList &&
          lodash.map(curTreatmentPayableList, (item: any) => {
            if (item.benefitCategory === 'C') {
              return <TreatmentPayableListItem treatmentPayableItemId={item.id} key={item.id} />;
            }
            if (item.benefitCategory === 'A') {
              return (
                <TreatmentPayableListItemOfAI treatmentPayableItemId={item.id} key={item.id} />
              );
            }
          })}
        {treatmentPayableAddItem && isBelongToCurrentItem && (
          <TreatmentPayableListItemAdd
            treatmentPayableItemDetail={treatmentPayableAddItem}
            incidentId={incidentId}
            treatmentId={treatmentId}
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

export default TreatmentPayableList;
