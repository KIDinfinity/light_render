import React, { Component } from 'react';
import lodash from 'lodash';

import { connect } from 'dva';

import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import MalignantHospitalizationItem from './MalignantHospitalizationItem';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class MalignantHospitalization extends Component<IProps> {
  keyName = 'regularTreatment_MN';

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
    const { documentId, regularTreatment_MN, taskNotEditable } = this.props;
    return (
      <FormSection isHideBgColor isPadding={false} isMargin={false}>
        <FormBorder>
          {lodash.map(regularTreatment_MN, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && regularTreatment_MN.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <MalignantHospitalizationItem
                formData={item}
                documentId={documentId}
                keyName={this.keyName}
              />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId="venus_claim.label.malignant_histopathologicHospitalization"
            showButton={!taskNotEditable}
          />
        </FormBorder>
      </FormSection>
    );
  }
}

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  regularTreatment_MN: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.regularTreatment_MN`,
    []
  ),
}))(MalignantHospitalization);
