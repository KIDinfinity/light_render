import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { withContextData } from '@/components/_store';
import TreatmentPayableListItem from './TreatmentPayableListItem';
import TreatmentPayableListItemOfAI from './TreatmentPayableListItemOfAI';
import TreatmentPayableListItemAdd from './TreatmentPayableListItemAdd';

@connect(
  (
    { PHCLMOfAppealCaseController, claimEditable }: any,
    { treatmentId, withData: { caseType } }: any
  ) => ({
    curTreatmentPayableList: caseType
      ? lodash.filter(
          PHCLMOfAppealCaseController[caseType].claimEntities.treatmentPayableListMap,
          (item) => item.treatmentId === treatmentId
        )
      : lodash.filter(
          PHCLMOfAppealCaseController.claimEntities.treatmentPayableListMap,
          (item) => item.treatmentId === treatmentId
        ),
    treatmentPayableAddItem: caseType
      ? PHCLMOfAppealCaseController[caseType].treatmentPayableAddItem
      : PHCLMOfAppealCaseController.treatmentPayableAddItem,
    claimNo: caseType
      ? PHCLMOfAppealCaseController[caseType].claimProcessData.claimNo
      : PHCLMOfAppealCaseController.claimProcessData.claimNo,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class TreatmentPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      curTreatmentPayableList: nextCurTreatmentPayableList,
      treatmentPayableAddItem: nextTreatmentPayableAddItem,
    } = nextProps;
    const { claimNo, curTreatmentPayableList, treatmentPayableAddItem } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curTreatmentPayableList, nextCurTreatmentPayableList) ||
      !lodash.isEqual(treatmentPayableAddItem, nextTreatmentPayableAddItem)
    );
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo } = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/addTreatmentPayableItem',
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
      curTreatmentPayableList,
      incidentId,
      taskNotEditable: notEditable,
      withData,
    } = this.props;

    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    const isBelongToCurrentItem =
      treatmentPayableAddItem && treatmentId === treatmentPayableAddItem.treatmentId;

    return (
      <div>
        {lodash.map(lodash.compact(curTreatmentPayableList), (item: any) => {
          if (item.benefitCategory === 'A') {
            return <TreatmentPayableListItemOfAI treatmentPayableItemId={item.id} key={item.id} />;
          }
          return (
            <TreatmentPayableListItem
              treatmentPayableItemId={item.id}
              key={item.id}
              curTreatmentPayableList={curTreatmentPayableList}
            />
          );
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

export default withContextData(TreatmentPayableList);
