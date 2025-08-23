import React, { Component } from 'react';
import { connect } from 'dva';
import SubmitButton from 'claim/components/LeftMenuButton/SubmitButton/SiderBarSubmitButton';
import ReturnButton from '@/components/BackButton/SiderBarBackButton';

@connect(({ loading }) => ({
  submitting: loading.effects['daProcessController/create'],
}))
class DataCaptureMenu extends Component {
  render() {
    const { handleSubmit, submitting, compressed } = this.props;

    return (
      <>
        <SubmitButton handleSubmit={handleSubmit} submitting={submitting} compressed={compressed} />
        <ReturnButton compressed={compressed} />
      </>
    );
  }
}

export default DataCaptureMenu;
