import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormBorder } from 'basic/components/Form/FormSection';
import DateItem from './DateItem';
import Header from './Header';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
}

class Medicine1 extends Component<IProps> {
  keyName = 'hormoneTreatmentHistory';

  render() {
    const { documentId, hormoneTreatmentHistory } = this.props;
    return (
      <FormBorder>
        <FormSection layout={Layout} isPadding={false} isHideBgColor isMargin={false}>
          <Header documentId={documentId} />
          {lodash.map(hormoneTreatmentHistory, (item, index) => (
            <DateItem
              key={item.id}
              index={index}
              formData={item}
              documentId={documentId}
              keyName={this.keyName}
              id={item.id}
            />
          ))}
        </FormSection>
      </FormBorder>
    );
  }
}

export default connect(({ JPCLMOfQualityController }: any, { documentId }: any) => ({
  hormoneTreatmentHistory: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.hormoneTreatmentHistory`,
    []
  ),
}))(Medicine1);
