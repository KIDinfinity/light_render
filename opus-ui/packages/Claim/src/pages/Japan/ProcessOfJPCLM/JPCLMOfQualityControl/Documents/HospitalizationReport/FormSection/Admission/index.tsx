import React, { Component } from 'react';
import lodash from 'lodash';

import { connect } from 'dva';
import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import AdmissionItem from './AdmissionItem';
import AdmissionHeader from './AdmissionHeader';

interface IProps {
  documentId: string;
  name?: string;
  admission: any;
}
class Admission extends Component<IProps> {
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

  handleDelete = (id: string) => {
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
        <AdmissionHeader documentId={documentId} />
        <FormBorder>
          {lodash.map(admission, (item: any, index: number) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && admission.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <AdmissionItem
                formData={item}
                index={index}
                documentId={documentId}
                keyName={this.keyName}
              />
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
}))(Admission);
