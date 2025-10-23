import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { getCurrentTabFieldsVal, resetCurrentTabFieldsVal } from 'navigator/pages/ReportCenter/_utils/utils';
import styles from './btnGroup.less';

interface IProps {
  dispatch: Dispatch;
  form: any;
  activeTabKey: string;
  printLoading: boolean;
}

@connect(({ reportCenterOldController, loading }) => ({
  form: reportCenterOldController.form,
  activeTabKey: reportCenterOldController.activeTabKey,
  printLoading: loading.effects['reportCenterOldController/print'],
}))
class BtnGroup extends Component<IProps> {
  searchFn = async () => {
    const { dispatch, form, activeTabKey } = this.props;
    const currentTabFieldsVal = getCurrentTabFieldsVal(form, activeTabKey);
    await dispatch({
      type: 'reportCenterOldController/search',
      payload: {
        reportId: activeTabKey,
        currentTabFieldsVal,
      }
    })
  }

  resetFn = () => {
    const { form, activeTabKey } = this.props;
    resetCurrentTabFieldsVal(form, activeTabKey);
  }

  printFn = async () => {
    const { dispatch, form, activeTabKey } = this.props;
    const currentTabFieldsVal = getCurrentTabFieldsVal(form, activeTabKey);
    await dispatch({
      type: 'reportCenterOldController/print',
      payload: {
        reportId: activeTabKey,
        currentTabFieldsVal,
        type: 'print',
      }
    })
  }

  render() {
    const { printLoading } = this.props;
    return (
      <div className={styles.btnGroup}>
        <Button
          type="primary"
          block
          onClick={this.searchFn}
        >
          Search
        </Button>
        <Button
          block
          onClick={this.resetFn}
        >
          Reset
        </Button>
        <Button
          block
          loading={printLoading}
          onClick={this.printFn}
        >
          Print
        </Button>
      </div>
    );
  }
}

export default BtnGroup;
