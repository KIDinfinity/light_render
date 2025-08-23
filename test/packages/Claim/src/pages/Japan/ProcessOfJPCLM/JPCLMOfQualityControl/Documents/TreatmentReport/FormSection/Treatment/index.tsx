import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';

import FormSection from 'basic/components/Form/FormSection';
import DateItem from './DateItem';
import Header from './Header';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
}

class Treatment extends Component<IProps> {
  keyName = 'treatmentHistory';

  render() {
    const { documentId, treatmentHistory } = this.props;
    return (
      <FormSection layout={Layout} title="claim.title.treatmentInformation">
        <Header documentId={documentId} name="Treatment" />
        {lodash.map(treatmentHistory, (item, index) => (
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
    );
  }
}

export default connect(({ JPCLMOfQualityController }: any, { documentId }: any) => ({
  treatmentHistory: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.treatmentHistory`,
    []
  ),
}))(Treatment);
