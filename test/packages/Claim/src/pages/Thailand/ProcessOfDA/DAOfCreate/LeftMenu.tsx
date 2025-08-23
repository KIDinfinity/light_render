import React, { Component } from 'react';
import { connect } from 'dva';
import SubmitButton from 'claim/components/LeftMenuButton/SubmitButton/SiderBarSubmitButton';
import ReturnButton from '@/components/BackButton/SiderBarBackButton';
import ErrorButton from '@/components/ErrorButton/SiderBarErrorButton';

@connect(({ loading, daProcessController }) => ({
  submitting: loading.effects['daProcessController/create'],
  errorCount: daProcessController.errorCount,
}))
class DataCaptureMenu extends Component {
  render() {
    const { handleSubmit, submitting, result, errorCount, compressed } = this.props;
    const hasError = errorCount > 0;
    return (
      <>
        {!hasError && <SubmitButton handleSubmit={handleSubmit} submitting={submitting}compressed={compressed}/>}
        {hasError && <ErrorButton compressed={compressed}/>}
        <ReturnButton compressed={compressed}/>
      </>
    );
  }
}

export default DataCaptureMenu;
