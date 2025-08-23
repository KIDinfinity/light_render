import React, { Component } from 'react';
import { connect } from 'dva';
import SubmitButton from 'claim/components/LeftMenuButton/SubmitButton/SiderBarSubmitButton';
import BackButton from '@/components/BackButton/SiderBarBackButton';

@connect(({ loading }) => ({
  submitting: loading.effects['bpProcessController/create'],
}))
class DataCaptureMenu extends Component {
  render() {
    const { handleSubmit, submitting, compressed } = this.props;

    return (
      <>
        <SubmitButton handleSubmit={handleSubmit} submitting={submitting} compressed={compressed} />
        <BackButton compressed={compressed} />
      </>
    );
  }
}

export default DataCaptureMenu;
