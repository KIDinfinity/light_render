import React, { PureComponent } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import json from './index.json';
import styles from './index.less';

const FormHeader = (props: any) => <div className={styles.form_header}>{props.children}</div>;

class FlowUpHeader extends PureComponent {
  render() {
    return (
      <FormLayout json={json}>
        <FormHeader>{formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-linkUp' })}</FormHeader>
        <FormHeader>
          {formatMessageApi({
            Label_COM_General: 'BusinessNo',
          })}
        </FormHeader>
        <FormHeader>
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-caseSource' })}
        </FormHeader>
        <FormHeader>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.claim-type',
          })}
        </FormHeader>
        <FormHeader>
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-IcdCode' })}
        </FormHeader>
        <FormHeader>
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-mainBenefit' })}
        </FormHeader>
        <FormHeader name="row3">
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-visit/admissionDate' })}
        </FormHeader>
        <FormHeader name="row3">
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-providerName' })}
        </FormHeader>
        <FormHeader name="row3">
          {formatMessageApi({ Label_BIZ_Claim: 'venus-claim-label-assessementAmount' })}
        </FormHeader>
        <FormHeader name="row3">
          {formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-claim-assessment.label.assessment-decision',
          })}
        </FormHeader>
      </FormLayout>
    );
  }
}

export default FlowUpHeader;
