import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';

import { NAMESPACE } from './activity.config';
import List from './List';
import View from './View';
import styles from './index.less';

@connect(() => ({}))
@changeWorkSpaceHoc
@setClaimEditableHoc
class Document extends Component {
  componentDidMount = async () => {
    await this.getClaimData();
    await this.getDropdown();
  };
  getClaimData = async () => {
    const { dispatch, businessData = {} }: any = this.props;

    await dispatch({
      type: `${NAMESPACE}/saveBusinessData`,
      payload: {
        businessData: { ...businessData },
      },
    });
  };
  componentWillUnmount = () => {
    const { dispatch }: any = this.props;

    dispatch({
      type: 'formCommonController/clearForm',
    });
    dispatch({
      type: 'formCommonController/handleUnSubmited',
    });
  };

  getDropdown = () => {
    const { dispatch }: any = this.props;
  };

  render() {
    return (
      <div className={styles.wrap}>
        <Row gutter={16}>
          <Col span={6} className={styles.content}>
            <List />
          </Col>
          <Col span={18} className={styles.content}>
            <View />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Document;
