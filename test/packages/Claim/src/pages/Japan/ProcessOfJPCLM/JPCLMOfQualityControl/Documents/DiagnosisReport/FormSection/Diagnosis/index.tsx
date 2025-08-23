import React, { Component } from 'react';
import FormSection, { FormBorder } from 'basic/components/Form/FormSection';
import FormLayout from 'basic/components/Form/FormLayout';
import Layout, { FormCardLayout } from './Layout';
import DiagnosisInfo from './DiagnosisInfo';
import DiagnosisReason from './DiagnosisReason';
import DiagnosisMixin from './DiagnosisMixin';

interface IProps {
  documentId: string;
}
class Diagnosis extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormSection
        layout={Layout}
        title="app.navigator.task-detail-of-data-capture.title.diagnosis"
      >
        <FormBorder>
          <FormLayout json={FormCardLayout}>
            <DiagnosisInfo documentId={documentId} name="FormCard" />
            <DiagnosisReason documentId={documentId} />
            <DiagnosisMixin documentId={documentId} />
          </FormLayout>
        </FormBorder>
      </FormSection>
    );
  }
}

export default Diagnosis;
