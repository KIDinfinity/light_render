import React, { Component } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import {
  DocumentTitle,
  BasicInformation,
  Recipient,
  DeathBenefitPayment,
  AnnuityDistribution,
} from './FormSection';
import Layout from './Layout';

interface IProps {
  documentId: string;
}

class DeathReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <BasicInformation documentId={documentId} />
        <Recipient documentId={documentId} />
        <DeathBenefitPayment documentId={documentId} name="DeathBenefitPayment" />
        <AnnuityDistribution documentId={documentId} name="AnnuityDistribution" />
      </FormLayout>
    );
  }
}

export default DeathReport;
export { DocumentTitle };
