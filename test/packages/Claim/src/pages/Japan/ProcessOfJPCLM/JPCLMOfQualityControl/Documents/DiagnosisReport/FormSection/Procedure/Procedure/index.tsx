import React, { Component } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';

import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import ProcedureItem from './ProcedureItem';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class ProcedureIndex extends Component<IProps> {
  keyName = 'procedure';

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
    const { documentId, procedure, taskNotEditable } = this.props;
    return (
      <FormSection isHideBgColor isPadding={false} isMargin={false}>
        <FormBorder>
          {lodash.map(procedure, (item: any) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && procedure.length > 1}
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

export default connect(({ JPCLMOfQualityController, claimEditable }: any, { documentId }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  procedure: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.procedure`,
    []
  ),
}))(ProcedureIndex);
