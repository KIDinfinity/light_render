import React, { Component } from 'react';
import lodash from 'lodash';

import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import ProcedureItem from './ProcedureItem';
import ProcedureHeader from './ProcedureHeader';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class BreastReconstructionIndex extends Component<IProps> {
  keyName = 'procedure_breastRecon';

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
    const { documentId, procedure_breastRecon, taskNotEditable } = this.props;
    return (
      <FormSection isHideBgColor isPadding={false} isMargin={false}>
        <FormBorder>
          <ProcedureHeader documentId={documentId} />
          {lodash.map(procedure_breastRecon, (item: any, index: number) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && procedure_breastRecon.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <ProcedureItem
                formData={item}
                index={index}
                documentId={documentId}
                keyName={this.keyName}
              />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId={formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.breast-reconstruction_procedure',
            })}
            showButton={!taskNotEditable}
            formatType="button"
          />
        </FormBorder>
      </FormSection>
    );
  }
}

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  procedure_breastRecon: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.procedure_breastRecon`,
    []
  ),
}))(BreastReconstructionIndex);
