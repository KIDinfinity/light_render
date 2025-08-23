import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { withContextData } from '@/components/_store';
import { SwitchEnum } from 'claim/pages/utils/claim';
import ClaimPayableListItemOfBasicInfo from './ClaimPayableListItemOfBasicInfo';

@connect(
  (
    { PHCLMOfAppealCaseController, formCommonController, claimEditable }: any,
    { incidentPayableId, withData: { caseType } }: any
  ) => ({
    policyBackgrounds: formCommonController.policyBackgrounds,
    incidentPayableItem: caseType
      ? PHCLMOfAppealCaseController[caseType].claimEntities.claimPayableListMap[incidentPayableId]
      : PHCLMOfAppealCaseController.claimEntities.claimPayableListMap[incidentPayableId],

    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ClaimPayableListItem extends PureComponent {
  handleDelete = () => {
    const { incidentPayableId, dispatch }: any = this.props;
    dispatch({
      type: 'PHCLMOfAppealCaseController/removeClaimPayableItem',
      payload: {
        incidentPayableId,
      },
    });
  };

  render() {
    const {
      hasTreatment,
      policyBackgrounds,
      incidentPayableItem,
      incidentPayableId,
      taskNotEditable: notEditable,
      withData,
    }: any = this.props;

    const { appealNotEditable }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;

    return (
      <>
        {incidentPayableItem ? (
          <CardOfClaim
            showButton={!taskNotEditable && incidentPayableItem.manualAdd === SwitchEnum.YES}
            handleClick={this.handleDelete}
            cardStyle={
              policyBackgrounds && formUtils.queryValue(incidentPayableItem.policyNo)
                ? {
                    background:
                      policyBackgrounds[formUtils.queryValue(incidentPayableItem.policyNo)],
                  }
                : {}
            }
          >
            <ClaimPayableListItemOfBasicInfo
              incidentPayableId={incidentPayableId}
              hasTreatment={hasTreatment}
              incidentPayableItem={incidentPayableItem}
            />
          </CardOfClaim>
        ) : null}
      </>
    );
  }
}

export default withContextData(ClaimPayableListItem);
