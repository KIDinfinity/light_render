import React, { Component } from 'react';
import styles from './PanelContent.less';
import { connect } from 'dva';
import { Spin } from 'antd';
import lodash from 'lodash';
import FormatData from './FormatData/index';

class PanelContent extends Component<any> {
  componentDidMount = async () => {
    await this.getProcessDetail();
  };

  getProcessDetail = async () => {
    const { item, processDetailList, dispatch } = this.props;
    const index = lodash.findIndex(processDetailList, (val: any) => val?.id === item?.id);
    if (index === -1) {
      await dispatch({
        type: 'exceptionalHandlingController/getProcessDetail',
        payload: {
          id: item.id
        }
      });
    }
  };

  render() {
    const { item, processDetailList } = this.props;
    const processInfo = lodash.find(processDetailList, val => val?.id === item?.id);
    return (
      <div className={styles.content}>
        {!processInfo ?
        <div className={styles.spin}>
          <Spin />
        </div>
         :
          <><FormatData
            type="Request"
            time={processInfo?.requestTime}
            data={processInfo?.requestData}
            exceptionMsg={processInfo?.exceptionMsg}
          />
            <FormatData
              type="Response"
              time={processInfo?.responseTime}
              data={processInfo?.responseData}
              exceptionMsg={processInfo?.exceptionMsg}
            /></>
       }
      </div>
    );
  }
}

export default connect(({ exceptionalHandlingController }: any) => ({
  processDetailList:
    exceptionalHandlingController?.processDetailList,
}))(PanelContent);

