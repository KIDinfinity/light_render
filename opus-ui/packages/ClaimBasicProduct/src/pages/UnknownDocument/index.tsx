import React, { Component } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import { Row, Col } from 'antd';
import { namespace } from './_models';
import UDList from './views/udList';
import Header from './views/header';
import CaseList from './views/caseList';
import styles from './index.less';

@setClaimEditableHoc
class UnknownDocument extends Component {
  componentDidMount = async () => {
    const { dispatch }: any = this.props;
    // 获取caseCategory字典
    await dispatch({
      type: 'dictionaryController/findDictionaryByTypeCodes',
      payload: ['documentType_i18n', 'Gender', 'Dropdown_CFG_DocumentType'],
    });

    await dispatch({
      type: 'workspaceCases/loadCasaeCategory',
    });

    await dispatch({
      type: 'workspaceCases/getRuleSetupCaseCategory',
    });

    this.getClaimData();
  };

  componentWillUnmount = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/clearClaimProcessData`,
    });
  };

  getClaimData = async () => {
    const { dispatch, businessData = {}, taskDetail }: any = this.props;

    const newBusinessData = {
      ...businessData,
      processInstanceId: taskDetail.processInstanceId,
      taskId: taskDetail.taskId,
      taskStatus: taskDetail.taskStatus,
      submissionDate: businessData?.submissionDate || taskDetail.submissionDate,
      caseCategory: taskDetail.caseCategory,
      taskDetailSubmissionChannel: taskDetail?.submissionChannel,
    };

    await dispatch({
      type: `${namespace}/saveClaimProcessData`,
      payload: newBusinessData,
    });
  };

  render() {
    return (
      <Row gutter={16} className={styles.container}>
        <Col span={6}>
          <div className={styles.siderWrap}>
            <UDList />
          </div>
        </Col>
        <Col span={18}>
          <div className={styles.contentWrap}>
            <div className={styles.header}>
              <Header />
            </div>
            <CaseList />
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(({ UnknownDocumentBaseController }: any) => ({
  searchParams: lodash.get(UnknownDocumentBaseController, 'searchParams', {}),
  udList: lodash.get(UnknownDocumentBaseController, 'udList', []),
  activeTaskList: lodash.get(UnknownDocumentBaseController, 'activeTaskList', []),
  caseRelevantSubmissionBatchInfo: lodash.get(
    UnknownDocumentBaseController,
    'caseRelevantSubmissionBatchInfo',
    {}
  ),
}))(UnknownDocument);
