import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import FormLayout from 'basic/components/Form/FormLayout';
import { formattingMoney } from '@/utils/utils';
import json from './index.json';
import styles from './index.less';

const FormItem = (props: any) => (
  <div className={styles.flowup_item_field} title={props.title ? props.title : props.children}>
    {props.children}
  </div>
);

class FlowUpItem extends Component {
  toDictName = (
    ditcList: any,
    fieldName: string,
    dictCodeKey: string = 'dictCode',
    dictNameKey: string = 'dictName'
  ) => {
    const { flowUpItem }: any = this.props;
    const dictCode = lodash.get(flowUpItem, fieldName);
    const codeList = Array.isArray(dictCode) ? dictCode : [dictCode];
    const nameList = lodash.map(ditcList, (item) => {
      if (lodash.includes(codeList, item[dictCodeKey])) {
        return item[dictNameKey];
      }
      return '';
    });

    return nameList.length > 0 ? lodash.compact(nameList).join() : lodash.compact(codeList).join();
  };

  toDate = () => {
    const { flowUpItem }: any = this.props;
    const visitOfDate = lodash.get(flowUpItem, 'visitOfDate');
    const dateOfAdmission = lodash.get(flowUpItem, 'dateOfAdmission');
    const dateOfDischarge = lodash.get(flowUpItem, 'dateOfDischarge');
    if (visitOfDate) {
      return moment(visitOfDate).format('L');
    }
    if (dateOfAdmission && dateOfDischarge) {
      return `${moment(dateOfAdmission).format('L')}~${moment(dateOfDischarge).format('L')}`;
    }
    return '--';
  };

  checkboxChange = (event: any) => {
    const { dispatch, flowUpItem }: any = this.props;
    const { target } = event;

    dispatch({
      type: 'followUpClaim/saveFlowUpItem',
      payload: {
        checked: target.checked,
        flowUpItem,
      },
    });
  };

  render() {
    const {
      flowUpItem,
      dictsOfMainBenefit,
      dictsOfCaseSource,
      dictsOfClaimType,
      dictsOfAssessmentDecision,
      medicalProviderDropdown,
      taskNotEditable,
    }: any = this.props;
    const { disabled } = flowUpItem;

    return (
      <div className={styles.flowup_item}>
        <FormLayout json={json}>
          <Checkbox
            checked={flowUpItem.checked}
            onChange={this.checkboxChange}
            disabled={disabled || taskNotEditable}
          />
          <FormItem>{lodash.get(flowUpItem, 'inquiryClaimNo')}</FormItem>
          <FormItem>{this.toDictName(dictsOfCaseSource, 'caseResource')}</FormItem>
          <FormItem>{this.toDictName(dictsOfClaimType, 'claimType')}</FormItem>
          <FormItem>{lodash.compact(lodash.get(flowUpItem, 'icdCode')).join()}</FormItem>
          <FormItem>{this.toDictName(dictsOfMainBenefit, 'mainBenefit')}</FormItem>
          <FormItem name="row3">{this.toDate()}</FormItem>
          <FormItem name="row3">
            {this.toDictName(
              medicalProviderDropdown,
              'provideName',
              'medicalProviderCode',
              'medicalProviderName'
            )}
          </FormItem>
          <FormItem name="row3">
            {formattingMoney(lodash.get(flowUpItem, 'assessmentAmount'))}
          </FormItem>
          <FormItem name="row3">
            {this.toDictName(dictsOfAssessmentDecision, 'assessmentDecision')}
          </FormItem>
        </FormLayout>
      </div>
    );
  }
}

export default connect(({ dictionaryController }: any) => ({
  dictsOfMainBenefit: dictionaryController.MainBenefit,
  dictsOfCaseSource: dictionaryController.CaseSource,
  dictsOfClaimType: dictionaryController.APDAClaimType,
  dictsOfAssessmentDecision: dictionaryController.AssessmentDecision,
  medicalProviderDropdown: lodash.get(dictionaryController, 'medicalProviderDropdown.list'),
}))(FlowUpItem);
