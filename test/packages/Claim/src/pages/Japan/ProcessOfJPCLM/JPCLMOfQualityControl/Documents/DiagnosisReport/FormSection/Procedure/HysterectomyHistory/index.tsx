import React, { Component } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';
import FormSection, { FormBorder, FormCard, FormButton } from 'basic/components/Form/FormSection';
import ProcedureItem from './ProcedureItem';
import ProcedureHeader from './ProcedureHeader';

interface IProps {
  documentId: string;
  name?: string;
  produces: any;
}
class HysterectomyHistoryIndex extends Component<IProps> {
  keyName = 'hysterectomyHistory';

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
    const { documentId, hysterectomyHistory, taskNotEditable } = this.props;
    return (
      <FormSection isHideBgColor isPadding={false} isMargin={false}>
        <FormBorder>
          <ProcedureHeader documentId={documentId} />
          {lodash.map(hysterectomyHistory, (item: any, index: number) => (
            <FormCard
              key={item.id}
              showButton={!taskNotEditable && hysterectomyHistory.length > 1}
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
              Label_BPM_Button: 'venus_claim.button.hysterectomy-history_procedure',
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
  hysterectomyHistory: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.hysterectomyHistory`,
    []
  ),
}))(HysterectomyHistoryIndex);
