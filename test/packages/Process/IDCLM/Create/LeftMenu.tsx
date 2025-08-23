import React, { Component } from 'react';
import { connect } from 'dva';
import SubmitButton from 'claim/components/LeftMenuButton/SubmitButton/SiderBarSubmitButton';
import ReturnButton from '@/components/BackButton/SiderBarBackButton';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';
import ErrorButton from '@/components/ErrorButton/SiderBarErrorButton';

@connect(({ loading, idProcessController }: any) => ({
  submitting: loading.effects['idProcessController/create'],
  claimProcessData: idProcessController.claimProcessData,
  claimEntities: idProcessController.claimEntities,
}))
class DataCaptureMenu extends Component {

  get errors() {
    const { claimEntities, claimProcessData} = this.props;
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const errors = formUtils.getErrorArray(denormalizedData);
    return lodash.size(errors);
  }

  render() {
    const { handleSubmit, submitting, compressed } = this.props;
    const errors = this.errors;
    return (
      <>
        {!errors && (<SubmitButton handleSubmit={handleSubmit} submitting={submitting} compressed={compressed} />)}
        {!!errors && (<ErrorButton errors={errors} compressed={compressed}/>) }
        <ReturnButton compressed={compressed} />
      </>
    );
  }
}

export default DataCaptureMenu;
