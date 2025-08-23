import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { IDictionary } from '@/dtos/dicts';

import FormSection, { FormBorder } from 'basic/components/Form/FormSection';
import DateItem from './DateItem';
import Header from './Header';
import Layout from './Layout';

interface IProps {
  dispatch: Dispatch<any>;
  CancerFlagIII: IDictionary[];
  formData: any;
  documentId: string;
  taskNotEditable: boolean;
  form: any;
}

class Medicine1 extends Component<IProps> {
  keyName = 'antiCancerMedsHistory';

  render() {
    const { documentId, antiCancerMedsHistory } = this.props;
    return (
      <FormBorder>
        <FormSection layout={Layout} isPadding={false} isHideBgColor isMargin={false}>
          <Header documentId={documentId} />
          {lodash.map(antiCancerMedsHistory, (item, index) => (
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
  antiCancerMedsHistory: lodash.get(
    JPCLMOfQualityController,
    `claimProcessData.claimEntities.bpoFormDataList.${documentId}.formData.antiCancerMedsHistory`,
    []
  ),
}))(Medicine1);
