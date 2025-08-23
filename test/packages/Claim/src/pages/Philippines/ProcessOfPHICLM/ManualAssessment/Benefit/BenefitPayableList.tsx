import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { Form } from 'antd';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import FormLayout from 'basic/components/Form/FormLayout';
import BenefitPayableItem from './BenefitPayableItem';
import { formUtils } from 'basic/components/Form';
import { BenefitPayableItemLayout } from '../FormLayout.json';
import { PHBENEFITITEMPAYABLEITEM } from '@/utils/claimConstant';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import CardOfClaim from 'basic/components/Form/FormCard';

interface IProps {
  curBenefitItemPayableList: string[];
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  invoicePayableId: string;
  invoicePayableItemNextId: string;
  listPolicy: IPolicy[];
  invoicePayableItem: IInvoicePayable;
  claimDecision: string;
}

const { FormHeader } = BenefitPayableItem;

@connect(
  (
    { PHCLMOfClaimAssessmentController, claimEditable, formCommonController }: any,
    { invoicePayableId }: any
  ) => {
    return {
      claimNo: PHCLMOfClaimAssessmentController.claimProcessData.claimNo,
      taskNotEditable: claimEditable.taskNotEditable,
      policyBackgrounds: formCommonController.policyBackgrounds,
      benefitItemPayableList:
        PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap?.[invoicePayableId]
          ?.benefitItemPayableList,
      invoicePayableItem:
        PHCLMOfClaimAssessmentController.claimEntities.invoicePayableListMap?.[invoicePayableId],
      benefitItemPayableListMap:
        PHCLMOfClaimAssessmentController.claimEntities.benefitItemPayableListMap,
      listPolicy: PHCLMOfClaimAssessmentController.listPolicy,
      claimPayableListMap: PHCLMOfClaimAssessmentController.claimEntities.claimPayableListMap,
    };
  }
)
class BenefitPayableList extends Component<IProps> {
  get policyList() {
    const { listPolicy, invoicePayableItem } = this.props;
    const { policyNo, productCode, benefitTypeCode } = lodash.pick(
      formUtils.cleanValidateData(invoicePayableItem),
      ['policyNo', 'productCode', 'benefitTypeCode']
    );
    return lodash
      .chain(listPolicy)
      .compact()
      .filter(
        (item: IPolicy) =>
          item.policyNo === policyNo &&
          item.coreProductCode === productCode &&
          item.benefitTypeCode === benefitTypeCode
      )
      .uniqBy('benefitItemCode')
      .value();
  }

  get benefitItemCodeAdded() {
    const { benefitItemPayableList, benefitItemPayableListMap } = this.props;
    const list = lodash.map(benefitItemPayableList, (id) =>
      formUtils.queryValue(benefitItemPayableListMap?.[id]?.benefitItemCode)
    );
    return lodash.compact(list);
  }

  get exitBenefitCategory() {
    const { claimPayableListMap, benefitItemPayableListMap }: any = this.props;
    const exict = lodash.some(
      claimPayableListMap,
      (item) => item.benefitCategory === eBenefitCategory.Reimbursement
    );
    if (!exict) return '';
    return lodash.size(benefitItemPayableListMap)
      ? ''
      : formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' });
  }

  handleAdd = () => {
    const { dispatch, invoicePayableId, invoicePayableItem } = this.props;
    const {
      incidentId,
      treatmentId,
      invoiceId,
      payableId,
      treatmentPayableId,
    } = lodash.pick(invoicePayableItem, [
      'incidentId',
      'treatmentId',
      'invoiceId',
      'payableId',
      'treatmentPayableId',
    ]);
    dispatch({
      type: 'PHCLMOfClaimAssessmentController/addBenefitPayableItem',
      payload: {
        addBenefitPayableItem: {
          ...PHBENEFITITEMPAYABLEITEM,
          id: uuidv4(),
          invoicePayableId,
          incidentId,
          treatmentId,
          invoiceId,
          payableId,
          treatmentPayableId,
        },
      },
    });
  };

  render() {
    const { taskNotEditable, benefitItemPayableList, invoicePayableId } = this.props;
    return (
      <div>
        {!lodash.isEmpty(benefitItemPayableList) && (
          <CardOfClaim
            cardStyle={{
              background: 'none',
            }}
          >
            <Form layout="vertical">
              <FormLayout json={BenefitPayableItemLayout}>
                <FormHeader>
                  {formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
                  })}
                </FormHeader>
                <FormHeader>{formatMessageApi({ Label_CLM_Payable: 'BillAmount' })}</FormHeader>
                <FormHeader>{formatMessageApi({ Label_CLM_Payable: 'AssessAmount' })}</FormHeader>
              </FormLayout>

              {lodash.map(benefitItemPayableList, (item: any) => (
                <BenefitPayableItem
                  key={item}
                  benefitPayableId={item}
                  policyList={this.policyList}
                  invoicePayableId={invoicePayableId}
                  benefitItemCodeAdded={this.benefitItemCodeAdded}
                />
              ))}
            </Form>
          </CardOfClaim>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            errorMessage={this.exitBenefitCategory}
            buttonText={formatMessageApi({
              Label_BPM_Button: 'app.claim.button.benefit-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default BenefitPayableList;
