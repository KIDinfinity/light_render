import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormCard, FormButton, FormBorder } from 'basic/components/Form/FormSection';

import MedicineHeader from './MedicineHeader';
import MedicineItem from './MedicineItem';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  form: any;
  documentId: any;
  CancerFlagIII: any;
}

class Medicine3 extends Component<IProps> {
  keyName = 'palliativeCare';

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
    const { documentId, taskNotEditable, palliativeCare } = this.props;
    return (
      <FormBorder>
        <FormSection isHideBgColor isPadding={false}>
          <MedicineHeader documentId={documentId} />
          {lodash.map(palliativeCare, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && palliativeCare.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <MedicineItem formData={item} documentId={documentId} keyName={this.keyName} />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId="venus_claim.label.medicine_admission"
            showButton={!taskNotEditable}
          />
        </FormSection>
      </FormBorder>
    );
  }
}

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  palliativeCare: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.palliativeCare`,
    []
  ),
}))(Medicine3);
