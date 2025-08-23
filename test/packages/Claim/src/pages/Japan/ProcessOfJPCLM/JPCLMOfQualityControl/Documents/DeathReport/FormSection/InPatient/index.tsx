import React, { Component } from 'react';
import lodash from 'lodash';

import { connect } from 'dva';

import FormSection, { FormButton, FormCard, FormBorder } from 'basic/components/Form/FormSection';
import InPatientInfo from './InPatientInfo';
import InPatientItem from './InPatientItem';

interface IProps {
  documentId: string;
  name?: string;
  inpatientList: any;
}

class InPatient extends Component<IProps> {
  keyName = 'admission';

  handleAdd = () => {
    const { dispatch, documentId } = this.props;
    dispatch({
      type: 'JPCLMOfQualityController/addFormDataItem',
      payload: {
        documentId,
        keyName: this.keyName,
      },
    });
  };

  handleDelete = (id: any) => {
    const { dispatch, documentId } = this.props;
    dispatch({
      type: 'JPCLMOfQualityController/deleteFormDataItem',
      payload: {
        documentId,
        id,
        keyName: this.keyName,
      },
    });
  };

  render() {
    const { documentId, admission, taskNotEditable } = this.props;
    return (
      <FormSection title="venus_claim.label.admissionInformation">
        <InPatientInfo documentId={documentId} />
        <FormBorder>
          {lodash.map(admission, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && admission.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <InPatientItem formData={item} documentId={documentId} keyName={this.keyName} />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId="venus_claim.label.admission"
            showButton={!taskNotEditable}
          />
        </FormBorder>
      </FormSection>
    );
  }
}

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  admission: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.admission`,
    []
  ),
}))(InPatient);
