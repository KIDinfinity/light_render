import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormBorder } from 'basic/components/Form/FormSection';
import DateItem from './DateItem';
import MedicineHeaderInfo from './MedicineHeaderInfo';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  formData: any;
  documentId: string;
}

class Medicine1 extends Component<IProps> {
  keyName = 'painkillerHistory';

  render() {
    const { documentId, painkillerHistory } = this.props;
    return (
      <FormBorder>
        <FormSection layout={Layout} isPadding={false} isHideBgColor isMargin={false}>
          <MedicineHeaderInfo documentId={documentId} name="HeaderInfo" />
          {lodash.map(painkillerHistory, (item, index) => (
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
  painkillerHistory: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.painkillerHistory`,
    []
  ),
}))(Medicine1);
