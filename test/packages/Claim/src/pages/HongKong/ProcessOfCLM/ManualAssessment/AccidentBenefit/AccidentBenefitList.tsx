import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { eClaimDecision } from 'claim/enum/claimDecision';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import AccidentBenefitItem from './AccidentBenefitItem';
import styles from './styles.less';

const AccidentBenefitList = ({ treatmentPayableId }: any) => {
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable?.taskNotEditable);

  const accidentBenefitPayableList = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId]
        ?.accidentBenefitPayableList
  );
  const accidentBenefitPayableListMap = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController?.claimEntities?.accidentBenefitPayableListMap
  );
  const existCodes = lodash
    .chain(accidentBenefitPayableListMap)
    .filter((item) => lodash.includes(accidentBenefitPayableList, item?.id))
    .map((item) => formUtils.queryValue(item?.benefitItemCode))
    .compact()
    .value();

  const treatmentPayableItem = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController?.claimEntities?.treatmentPayableListMap?.[treatmentPayableId]
  );
  const handleAdd = () => {
    dispatch({
      type: 'HKCLMOfClaimAssessmentController/accidentBenefitPayableItemAdd',
      payload: {
        treatmentPayableId,
      },
    });
  };

  const claimDecision = formUtils.queryValue(
    useSelector(
      ({ HKCLMOfClaimAssessmentController }: any) =>
        HKCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap?.[
          treatmentPayableItem?.payableId
        ]?.claimDecision
    )
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController?.submited);
  const sectionErrors = useMemo(() => {
    return (
      submited &&
      lodash.isEmpty(accidentBenefitPayableList) &&
      claimDecision === eClaimDecision.approve
    );
  }, [submited, accidentBenefitPayableList, claimDecision]);

  return (
    <div>
      {sectionErrors && (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi(
            { message: 'ERR_000238' },
            treatmentPayableItem?.policyNo,
            formatMessageApi({ Dropdown_PRD_BenefitType: treatmentPayableItem?.benefitTypeCode })
          )}
        />
      )}
      {lodash.map(accidentBenefitPayableList, (item) => (
        <AccidentBenefitItem
          key={item}
          existCodes={existCodes}
          accidentBenefitId={item}
          treatmentPayableItemId={treatmentPayableId}
        />
      ))}
      {!taskNotEditable && (
        <ButtonOfClaim
          className={styles.buttonAdd}
          handleClick={handleAdd}
          buttonText={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
          })}
        />
      )}
    </div>
  );
};

export default AccidentBenefitList;
