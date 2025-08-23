import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import ClaimPayableListItemOfLife from './ClaimPayableListItemOfLife';
import ClaimPayableListItemOfBasicInfo from './ClaimPayableListItemOfBasicInfo';

@connect(
  (
    { bpOfClaimAssessmentController, formCommonController, claimEditable }: any,
    { incidentPayableId }: any
  ) => ({
    policyBackgrounds: formCommonController.policyBackgrounds,
    incidentPayableItem:
      bpOfClaimAssessmentController.claimEntities.claimPayableListMap[incidentPayableId],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
class ClaimPayableListItem extends PureComponent {
  sectionRef = React.createRef();

  handleDelete = () => {
    const { incidentPayableId, dispatch }: any = this.props;
    deleteWarning({
      sectionRef: this.sectionRef,
      sectionID: SectionID.IncidentPayable,
    }).then(() => {
      dispatch({
        type: 'bpOfClaimAssessmentController/removeClaimPayableItem',
        payload: {
          incidentPayableId,
        },
      });
    });
  };

  render() {
    const {
      hasTreatment,
      policyBackgrounds,
      incidentPayableItem,
      incidentPayableId,
      taskNotEditable,
    }: any = this.props;

    return (
      <CardOfClaim
        showButton={!taskNotEditable}
        handleClick={this.handleDelete}
        cardStyle={
          policyBackgrounds && formUtils.queryValue(incidentPayableItem.policyNo)
            ? {
                background: policyBackgrounds[formUtils.queryValue(incidentPayableItem.policyNo)],
              }
            : {}
        }
        ref={this.sectionRef}
      >
        <ClaimPayableListItemOfBasicInfo
          incidentPayableId={incidentPayableId}
          hasTreatment={hasTreatment}
          incidentPayableItem={incidentPayableItem}
        />
        {incidentPayableItem.benefitCategory === 'L' && incidentPayableItem.lifePayable && (
          <ClaimPayableListItemOfLife
            incidentPayableId={incidentPayableId}
            hasTreatment={hasTreatment}
            incidentPayableItem={incidentPayableItem}
          />
        )}
      </CardOfClaim>
    );
  }
}

export default ClaimPayableListItem;
