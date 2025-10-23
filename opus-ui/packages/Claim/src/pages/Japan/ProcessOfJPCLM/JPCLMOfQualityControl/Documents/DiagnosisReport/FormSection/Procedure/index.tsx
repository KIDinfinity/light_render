import React, { Component } from 'react';
import FormSection from 'basic/components/Form/FormSection';
import Procedure from './Procedure';
import Mastectomy from './Mastectomy';
import BreastReconstruction from './BreastReconstruction';
import Ovariectomy from './Ovariectomy';
import HysterectomyHistory from './HysterectomyHistory';

interface IProps {
  documentId: string;
}
class ProcedureIndex extends Component<IProps> {
  render() {
    const { documentId } = this.props;
    return (
      <FormSection title="venus_claim.label.procedureInformation">
        <Procedure documentId={documentId} />
        <Mastectomy documentId={documentId} />
        <BreastReconstruction documentId={documentId} />
        <Ovariectomy documentId={documentId} />
        <HysterectomyHistory documentId={documentId} />
      </FormSection>
    );
  }
}

export default ProcedureIndex;
