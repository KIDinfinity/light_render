import React, { Component } from 'react';
import { FormLayout, FormRow } from 'basic/components/Form/FormSection';
import Layout from './Layout';
import { Diagnosis, Signature, Admission, DocumentTitle } from './FormSection';

interface IProps {
  documentId: string;
}
class HospitalizationReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <FormRow>
          <Diagnosis documentId={documentId} />
          <Signature documentId={documentId} />
        </FormRow>
        <FormRow>
          <Admission documentId={documentId} name="Admission" />
        </FormRow>
      </FormLayout>
    );
  }
}

export default HospitalizationReport;
export { DocumentTitle };
