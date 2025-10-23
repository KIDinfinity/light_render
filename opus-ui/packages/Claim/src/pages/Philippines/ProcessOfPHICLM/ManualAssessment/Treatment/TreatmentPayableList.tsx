import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import TreatmentPayableListItem from './TreatmentPayableListItem';
import TreatmentPayableListItemOfAI from './TreatmentPayableListItemOfAI';
import TreatmentPayableListItemAdd from './TreatmentPayableListItemAdd';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

@connect(
  (
    { PHCLMOfClaimAssessmentController, claimEditable, formCommonController }: any,
    { treatmentId }: any
  ) => ({
    curTreatmentPayableList: lodash.filter(
      PHCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap,
      (item) => item.treatmentId === treatmentId
    ),
    treatmentPayableAddItem: PHCLMOfClaimAssessmentController.treatmentPayableAddItem,
    claimNo: PHCLMOfClaimAssessmentController.claimProcessData.claimNo,
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController?.submited,
    claimPayableListMap: PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    treatmentPayableListMap: PHCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap,
  })
)
class TreatmentPayableList extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      claimNo: nextClaimNo,
      curTreatmentPayableList: nextCurTreatmentPayableList,
      treatmentPayableAddItem: nextTreatmentPayableAddItem,
      taskNotEditable: nextTaskNotEditable,
      submited: nextSubmited,
      claimPayableListMap: nextClaimPayableListMap,
      treatmentPayableListMap: nextTreatmentPayableListMap,
    } = nextProps;
    const {
      claimNo,
      curTreatmentPayableList,
      treatmentPayableAddItem,
      claimPayableListMap,
      submited,
      taskNotEditable,
      treatmentPayableListMap,
    } = this.props;

    return (
      !(claimNo === nextClaimNo) ||
      !lodash.isEqual(curTreatmentPayableList, nextCurTreatmentPayableList) ||
      !lodash.isEqual(treatmentPayableAddItem, nextTreatmentPayableAddItem) ||
      !lodash.isEqual(claimPayableListMap, nextClaimPayableListMap) ||
      !lodash.isEqual(submited, nextSubmited) ||
      !lodash.isEqual(taskNotEditable, nextTaskNotEditable) ||
      !lodash.isEqual(treatmentPayableListMap, nextTreatmentPayableListMap)
    );
  }

  get exitBenefitCategory() {
    const { claimPayableListMap, treatmentPayableListMap }: any = this.props;
    const exict = lodash.some(
      claimPayableListMap,
      (item) =>
        item.benefitCategory === eBenefitCategory.Cashless ||
        item.benefitCategory === eBenefitCategory.Reimbursement
    );
    if (!exict) return '';
    return lodash.size(treatmentPayableListMap)
      ? ''
      : formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  }

  get existBenefitItem() {
    const { curTreatmentPayableList } = this.props;
    return lodash
      .chain(curTreatmentPayableList)
      .map((item) => item?.benefitItemCode)
      .compact()
      .value();
  }

  handleAdd = () => {
    const { dispatch, incidentId, treatmentId, claimNo } = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addTreatmentPayableItem',
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
      taskNotEditable,
    } = this.props;
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
              existBenefitItem={this.existBenefitItem}
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
            errorMessage={this.exitBenefitCategory}
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
