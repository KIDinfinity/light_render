import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import setEnvoyHoc from 'bpm/components/Hoc/setEnvoyHoc';
import setInformationHoc from 'bpm/components/Hoc/setInformationHoc';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import changeWorkSpaceHoc from 'bpm/components/Hoc/changeWorkSpaceHoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import styles from './index.less';
import RecipientBasicInformation from './JPDPOfDocumentDispatch/RecipientBasicInformation';
import CheckList from './JPDPOfDocumentDispatch/CheckList';

@connect()
@changeWorkSpaceHoc
@setEnvoyHoc
@setInformationHoc
@setInsured360Hoc
@setClaimEditableHoc
class JPDPOfDocumentDispatch extends Component {
  static contextTypes = {
    setDataForSubmit: PropTypes.func,
    setHeaderInfo: PropTypes.func,
    setRemoveHeaderInfoItem: PropTypes.func,
    setButtonStatus: PropTypes.func,
    taskDetail: PropTypes.object,
    setAfterHook: PropTypes.func,
    setValidateHook: PropTypes.func,
  };

  getApplicationOptions = async () => {
    const { dispatch } = this.props;
    const result = await dispatch({
      type: 'selectOptionsDictionary/get',
      payload: {
        typeCode: 'applicationType',
      },
    });
    dispatch({
      type: 'selectOptionsDictionary/get',
      payload: {
        typeCode: 'documentTypeEnvelope',
      },
    });
    return result;
  };

  componentDidMount = async () => {
    const { dispatch, businessData } = this.props;
    this.getApplicationOptions();
    await dispatch({
      type: 'JPDPOfDocumentDispatchController/saveBusinessData',
      payload: businessData,
    });
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'JPDPOfDocumentDispatchController/clearjPDPProcessData',
    });
  };

  render() {
    const { taskDetail } = this.props;
    const taskStatus = lodash.get(taskDetail, 'taskStatus', '');
    return (
      <div className={styles.document_dispatch}>
        <Row>
          <Col>
            <RecipientBasicInformation />
            <CheckList taskStatus={taskStatus} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default JPDPOfDocumentDispatch;
