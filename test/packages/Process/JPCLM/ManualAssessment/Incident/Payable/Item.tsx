import React, { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import lodash from 'lodash';
import { getClaimPayableItemList } from 'claim/pages/utils/selector';
import Life from './Life';
import Basic from './Basic';
import { useSelector, useDispatch } from 'dva';
import { BenefitCategory } from 'claim/pages/utils/claim';
import ClaimIncident from './ClaimIncident';

const CardOfClaimElement = ({ incidentPayableItem, children, id }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const payoutCurrency = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimProcessData.claimDecision?.payoutCurrency
  );
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const handleDelete = () => {
    if (incidentPayableItem.benefitCategory === BenefitCategory.MajorIllnessCashBenefit) {
      dispatch({
        type: 'JPCLMOfClaimAssessment/removeClaimIncidentPayableItem',
        payload: {
          claimIncidentPayableId: id,
        },
      });
      return;
    }
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeClaimPayableItem',
      payload: {
        incidentPayableId: id,
      },
    });

    dispatch({
      type: 'JPCLMOfClaimAssessment/saveClaimPayablePolicyCurrency',
      payload: { payoutCurrency },
    });
  };

  return (
    <CardOfClaim
      className="incidentPayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && formUtils.queryValue(incidentPayableItem.policyNo)
          ? {
              background: policyBackgrounds[formUtils.queryValue(incidentPayableItem.policyNo)],
            }
          : {}
      }
    >
      {children}
    </CardOfClaim>
  );
};

const RenderElement = ({
  incidentPayableItem,
  incidentPayableId,
  hasTreatment,
  curIncidentPayableList,
  noPolicyNo,
}: any) => {
  if (
    incidentPayableItem.benefitCategory === BenefitCategory.life &&
    incidentPayableItem.lifePayable
  ) {
    return (
      <CardOfClaimElement incidentPayableItem={incidentPayableItem} id={incidentPayableId}>
        <Life
          incidentPayableId={incidentPayableId}
          hasTreatment={hasTreatment}
          incidentPayableItem={incidentPayableItem}
          curIncidentPayableList={curIncidentPayableList}
          noPolicyNo={noPolicyNo}
        />
      </CardOfClaimElement>
    );
  }

  if (incidentPayableItem.benefitCategory === BenefitCategory.MajorIllnessCashBenefit) {
    return lodash.map(incidentPayableItem?.claimIncidentPayableList, (claimIncidentPayableId) => (
      <CardOfClaimElement
        incidentPayableItem={incidentPayableItem}
        id={claimIncidentPayableId}
        key={claimIncidentPayableId}
      >
        <ClaimIncident
          claimIncidentPayableId={claimIncidentPayableId}
          hasTreatment={hasTreatment}
        />
      </CardOfClaimElement>
    ));
  }

  return (
    <CardOfClaimElement incidentPayableItem={incidentPayableItem} id={incidentPayableId}>
      <Basic
        incidentPayableId={incidentPayableId}
        hasTreatment={hasTreatment}
        incidentPayableItem={incidentPayableItem}
        curIncidentPayableList={curIncidentPayableList}
        noPolicyNo={noPolicyNo}
      />
    </CardOfClaimElement>
  );
};

const ClaimPayableListItem = ({ incidentPayableId, hasTreatment, incidentId, noPolicyNo }: any) => {
  const incidentPayableItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.claimPayableListMap[incidentPayableId]
  );

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities.claimPayableListMap
  );
  const claimPayableList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimProcessData.claimPayableList
  );

  const curIncidentPayableList = useMemo(() => {
    return getClaimPayableItemList(incidentId, claimPayableListMap, claimPayableList);
  }, [claimPayableListMap, claimPayableList]);

  return (
    <RenderElement
      incidentPayableItem={incidentPayableItem}
      incidentPayableId={incidentPayableId}
      hasTreatment={hasTreatment}
      curIncidentPayableList={curIncidentPayableList}
      noPolicyNo={noPolicyNo}
    />
  );
};

export default ClaimPayableListItem;
