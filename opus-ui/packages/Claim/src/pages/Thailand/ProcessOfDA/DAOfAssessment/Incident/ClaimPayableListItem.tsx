import React, { Component } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import lodash from 'lodash';
import ClaimPayableListItemOfBasicInfo from './ClaimPayableListItemOfBasicInfo';
// @ts-ignore
@connect(
  (
    { daOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { incidentPayableId }: any
  ) => ({
    policyBackgrounds: formCommonController.policyBackgrounds,
    incidentPayableItem:
      daOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ClaimPayableListItem extends Component {
  handleDelete = () => {
    const { incidentPayableId, dispatch }: any = this.props;
    dispatch({
      type: 'daOfClaimAssessmentController/removeClaimPayableItem',
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
      curIncidentPayableList,
      taskNotEditable,
    }: any = this.props;
    return (
      <CardOfClaim
        showButton={!taskNotEditable && incidentPayableItem.manualAdd === 'Y'}
        handleClick={this.handleDelete}
        cardStyle={
          formUtils.queryValue(incidentPayableItem.policyNo)
            ? {
                background: lodash.get(
                  policyBackgrounds,
                  formUtils.queryValue(incidentPayableItem.policyNo)
                ),
              }
            : {}
        }
      >
        <ClaimPayableListItemOfBasicInfo
          incidentPayableId={incidentPayableId}
          hasTreatment={hasTreatment}
          incidentPayableItem={incidentPayableItem}
          curIncidentPayableList={curIncidentPayableList}
        />
      </CardOfClaim>
    );
  }
}

export default ClaimPayableListItem;
