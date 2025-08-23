import React, { Component } from 'react';
import FormSection from 'basic/components/Form/FormSection';
import Medicine1 from './Medicine1';
import Medicine2 from './Medicine2';
import Medicine3 from './Medicine3';
import Medicine4 from './Medicine4';
import MedicineHeader from './MedicineHeader';

interface IProps {
  documentId: string;
}

class Medicine extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormSection title="venus_claim.label.medicineInformation">
        <MedicineHeader documentId={documentId} />
        <Medicine1 documentId={documentId} />
        <Medicine2 documentId={documentId} />
        <Medicine3 documentId={documentId} />
        <Medicine4 documentId={documentId} />
      </FormSection>
    );
  }
}

export default Medicine;
