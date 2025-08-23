import React, { Component } from 'react';
import { FormLayout } from 'basic/components/Form/FormSection';
import Layout from './Layout';
import Section from './FormSection';

interface IProps {
  documentId: any;
}

class DiagnosisReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <Section.Diagnosis documentId={documentId} />
        <div name="InPatientMedicine">
          <Section.InPatient documentId={documentId} />
          <Section.Medicine documentId={documentId} />
        </div>
        <Section.Procedure documentId={documentId} name="Procedure" />
        <Section.Support documentId={documentId} name="Support" />
        <Section.Disability documentId={documentId} name="Disability" />
        <Section.Radioactive documentId={documentId} name="Radioactive" />
        <Section.Advanced documentId={documentId} name="Advanced" />
        <Section.Malignant1 documentId={documentId} />
        <Section.Malignant2 documentId={documentId} />
        <Section.Intraepithelial documentId={documentId} />
        <Section.CIN documentId={documentId} name="CIN" />
        <Section.AMI documentId={documentId} name="AMI" />
        <Section.Stroke documentId={documentId} name="Stroke" />
        <Section.OtherInformation documentId={documentId} />
      </FormLayout>
    );
  }
}

export default DiagnosisReport;
export const { DocumentTitle } = Section;
