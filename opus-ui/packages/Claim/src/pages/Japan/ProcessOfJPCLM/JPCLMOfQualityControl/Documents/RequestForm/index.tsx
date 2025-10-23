import React, { Component } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import Layout from './Layout';
import Section from './FormSection';

interface IProps {
  documentId: string;
}
class RequestForm extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <Section.BasicInformation documentId={documentId} />
        <Section.Claimant documentId={documentId} name="Claimant" />
        <Section.ProxyRequest documentId={documentId} name="ProxyRequest" />
        <Section.Payee documentId={documentId} name="Payee" />
      </FormLayout>
    );
  }
}

export default RequestForm;
export const { DocumentTitle } = Section;
