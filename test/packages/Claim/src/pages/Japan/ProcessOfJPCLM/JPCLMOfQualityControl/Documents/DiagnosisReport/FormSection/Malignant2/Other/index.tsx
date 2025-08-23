import React, { Component } from 'react';
import lodash from 'lodash';

import { connect } from 'dva';

import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import MalignantOtherItem from './MalignantOtherItem';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class Procedure2 extends Component<IProps> {
  keyName = 'otherExam_MN';

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
    const { documentId, otherExam_MN, taskNotEditable } = this.props;
    return (
      <FormSection isHideBgColor isPadding={false} isMargin={false}>
        <FormBorder>
          {lodash.map(otherExam_MN, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && otherExam_MN.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <MalignantOtherItem formData={item} documentId={documentId} keyName={this.keyName} />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId="venus_claim.label.malignant_otherExaminationOfHistopathologic"
            showButton={!taskNotEditable}
          />
        </FormBorder>
      </FormSection>
    );
  }
}

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  otherExam_MN: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.otherExam_MN`,
    []
  ),
}))(Procedure2);
