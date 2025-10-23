import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Collapse } from 'antd';
import ErrorTooltipManual from 'claim/components/ErrorTooltipManual';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './AccidentBenefitPayableList.less';
import AccidentBenefitPayableItem from './AccidentBenefitPayableItem';
import AccidentBenefitPayableHeader from './AccidentBenefitPayableHeader';
import { ClaimDecision as enumClaimDecision } from '../_models/dto';

const mapStateToProps = (
  { PHCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { treatmentPayableId }: any
) => {
  const treatmentPayableItem = lodash.get(
    PHCLMOfClaimAssessmentController,
    `claimEntities.treatmentPayableListMap.${treatmentPayableId}`
  );
  const {
    policyNo,
    productCode,
    benefitTypeCode,
    incidentId,
    treatmentId,
    payableId,
    id,
    fullyClaim,
  } = treatmentPayableItem;
  const idAssemble = {
    treatmentId,
    treatmentPayableId: id,
    payableId,
    incidentId,
    policyNo,
    productCode,
    benefitTypeCode,
  };
  return {
    submited: formCommonController.submited,
    accidentBenefitPayableList:
      PHCLMOfClaimAssessmentController.claimEntities.treatmentPayableListMap[treatmentPayableId]
        .accidentBenefitPayableList,
    idAssemble,
    fullyClaim,
    taskNotEditable: claimEditable.taskNotEditable,
    accidentBenefitPayableListMap:
      PHCLMOfClaimAssessmentController.claimEntities.accidentBenefitPayableListMap,
  };
};
@connect(mapStateToProps)
class AccidentBenefitPayableList extends Component {
  get errorMessage() {
    const {
      submited,
      accidentBenefitPayableList,
      policyNoList,
      policyNo,
      benefitTypeCode,
      claimDecision,
    }: any = this.props;
    const policyNoValue = formUtils.queryValue(policyNo);
    const benefitTypeName = lodash
      .chain(policyNoList)
      .find((item: any) => {
        if (lodash.isObject(item) && item) {
          return (
            item.policyNo === policyNoValue &&
            item.benefitTypeCode === formUtils.queryValue(benefitTypeCode)
          );
        }
        return false;
      })
      .get('benefitTypeName')
      .value();
    if (
      submited &&
      lodash.isEmpty(accidentBenefitPayableList) &&
      claimDecision === enumClaimDecision.approve
    ) {
      return (
        <ErrorTooltipManual
          manualErrorMessage={formatMessageApi(
            { message: 'ERR_000238' },
            policyNoValue,
            benefitTypeName
          )}
        />
      );
    }
    return '';
  }

  get getExistCodes() {
    const { accidentBenefitPayableListMap, accidentBenefitPayableList } = this.props;
    return lodash
      .chain(accidentBenefitPayableListMap)
      .filter((item) => lodash.includes(accidentBenefitPayableList, item.id))
      .map((item) => formUtils.queryValue(item.benefitItemCode))
      .compact()
      .value();
  }

  handleAdd = () => {
    const { dispatch, idAssemble }: any = this.props;
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addAccidentBenefitPayableItem',
      payload: {
        idAssemble,
      },
    });
  };

  render() {
    const { accidentBenefitPayableList, fullyClaim, taskNotEditable }: any = this.props;

    return (
      <div>
        {this.errorMessage}
        <div className={styles.benefit_payable_bg}>
          <Collapse bordered={false}>
            {lodash.map(lodash.compact(accidentBenefitPayableList), (item: any) => (
              <Collapse.Panel
                header={
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <AccidentBenefitPayableHeader
                      accidentBenefitId={item}
                      accidentBenefitPayableList={accidentBenefitPayableList}
                      existCodes={this.getExistCodes}
                      key={item}
                    />
                  </div>
                }
                key={item}
              >
                <AccidentBenefitPayableItem accidentBenefitId={item} key={item} />
              </Collapse.Panel>
            ))}
          </Collapse>
        </div>
        {!taskNotEditable && !formUtils.queryValue(fullyClaim) && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
            })}
          />
        )}
      </div>
    );
  }
}

export default AccidentBenefitPayableList;
