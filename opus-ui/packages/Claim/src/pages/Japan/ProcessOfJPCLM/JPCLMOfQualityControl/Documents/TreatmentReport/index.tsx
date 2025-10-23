import React, { Component } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import { DocumentTitle, Claimant, Treatment } from './FormSection';
import Layout from './Layout';

interface IProps {
  documentId: string;
}

class TreatmentReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <Treatment documentId={documentId} />
        <Claimant documentId={documentId} />
      </FormLayout>
    );
  }
}

export default TreatmentReport;
export { DocumentTitle };
