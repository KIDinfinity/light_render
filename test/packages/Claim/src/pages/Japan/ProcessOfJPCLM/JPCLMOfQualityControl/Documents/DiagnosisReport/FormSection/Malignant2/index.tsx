import React, { Component } from 'react';
import FormSection from 'basic/components/Form/FormSection';
import Header from './Header';
import Other from './Other';
import Hospitalization from './Hospitalization';
import Layout from './Layout';

interface IProps {
  documentId: string;
}
class Malignant2 extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormSection title="venus_claim.label.malignantNeoplasm2" layout={Layout}>
        <Header documentId={documentId} />
        <Other documentId={documentId} name="Other" />
        <Hospitalization documentId={documentId} name="Hospitalization" />
      </FormSection>
    );
  }
}

export default Malignant2;
