import React, { Component } from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import Layout from './Layout';
import {
  Death,
  DocumentTitle,
  InPatient,
  Procedure,
  Radiotherapy,
  OtherInformation,
} from './FormSection';

interface IProps {
  documentId: string;
  form: any;
}
class DeathReport extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormLayout json={Layout}>
        <Death documentId={documentId} />
        <InPatient documentId={documentId} name="InPatient" />
        <Procedure documentId={documentId} name="Procedure" />
        <Radiotherapy documentId={documentId} />
        <OtherInformation documentId={documentId} />
      </FormLayout>
    );
  }
}
export default DeathReport;
export { DocumentTitle };
