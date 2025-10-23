import React, { Component } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';
import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import ProcedureItem from './ProcedureItem';
import ProdureHeader from './ProdureHeader';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class ProcedureIndex extends Component<IProps> {
  keyName = 'procedures';

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
    const { documentId, procedures, taskNotEditable } = this.props;
    return (
      <FormSection title="venus_claim.label.procedureInformation">
        <ProdureHeader documentId={documentId} />
        <FormBorder>
          {lodash.map(procedures, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && procedures.length > 1}
              handleClick={() => this.handleDelete(item.id)}
            >
              <ProcedureItem formData={item} documentId={documentId} keyName={this.keyName} />
            </FormCard>
          ))}
          <FormButton
            handleClick={this.handleAdd}
            labelId={formatMessageApi({
              Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.procedure',
            })}
            showButton={!taskNotEditable}
            formatType="button"
          />
        </FormBorder>
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    procedures: lodash.get(
      JPCLMOfQualityController,
      `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.procedures`,
      []
    ),
  })
)(ProcedureIndex);
