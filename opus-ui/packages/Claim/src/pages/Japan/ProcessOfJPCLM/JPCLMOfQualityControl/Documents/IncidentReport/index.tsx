import React, { Component } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import Layout from './Layout';
import { Incident, DocumentTitle } from './FormSection';

interface IProps {
  documentId: string;
}
class IncidentReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <Incident documentId={documentId} />
      </FormLayout>
    );
  }
}

export default IncidentReport;
export { DocumentTitle };
