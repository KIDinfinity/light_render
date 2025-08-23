import React, { Component } from 'react';
import { connect } from 'dva';
import Header from './Header/Header';
import Main from './Main/Main';

interface IProps {
  dispatch: Dispatch;
}

@connect()
class ReportCenter extends Component<IProps> {
  componentWillMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: false,
      },
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowHeader: true,
      },
    });
  }

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default ReportCenter;
