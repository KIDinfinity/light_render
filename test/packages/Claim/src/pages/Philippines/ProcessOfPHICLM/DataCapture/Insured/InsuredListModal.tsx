import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Modal, Table, Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import type { IntActiveTaskItem } from 'claimBasicProduct/pages/UnknownDocument/_models/interfaces';

import styles from './item.less';

const formLayout = {
  fieldLayout: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
  },
};

const FORMID = 'newTask';

interface IProps {
  dispatch: any;
  item: IntActiveTaskItem;
  form: any;
  caseCategoryList: string;
  submitParams: any;
  caseCategory: any;
  caseCategoryOptions: any;
  insuredNameList: any;
  policyNoList: any;
  dictsOfGender: any;
  taskNotEditable: boolean;
}

// @ts-ignore
@connect(({ PHCLMOfDataCaptureController }: any) => ({
  insured: lodash.get(PHCLMOfDataCaptureController, 'claimProcessData.insured'),
}))
class NewTask extends Component<IProps> {
  state = { selectColumns: {} };

  get tableColumns() {
    const { dictsOfGender } = this.props;
    return [
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.label.insuredName',
        }),
        dataIndex: 'firstName',
        render: (text: string, item: any) => lodash.get(item, 'firstName') || '-',
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.surname',
        }),

        dataIndex: 'surname',
        render: (text: string, item: any) => lodash.get(item, 'surname') || '-',
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
        }),
        dataIndex: 'dateOfBirth',
        render: (text: string, item: any) => {
          return moment(item?.dateOfBirth).format('L') || '-';
        },
      },
      {
        title: formatMessageApi({
          Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.gender',
        }),
        dataIndex: 'gender',
        render: (text: string, item: any) =>
          formatMessageApi({ Gender: lodash.get(item, 'gender') }) || '-',
      },
    ];
  }

  get dataSource() {
    const { insuredList } = this.props;
    return lodash.isArray(insuredList?.partyInfoList) ? insuredList?.partyInfoList : [];
  }

  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleInsureNameChoice = async () => {
    const { selectColumns } = this.state;
    const { dispatch, insured } = this.props;
    const { policyId } = lodash.pick(insured, 'policyId');

    dispatch({
      type: `PHCLMOfDataCaptureController/saveNewSubmitInsureId`,
      payload: {
        selectColumns,
        skipPolicyNo: true,
      },
    });
    await dispatch({
      type: `PHCLMOfDataCaptureController/getPolicyOwnerList`,
      payload: {
        policyNoList: [policyId],
        selectColumns,
      },
    });
    dispatch({
      type: 'PHCLMOfDataCaptureController/saveIssueAge',
    });
    this.hideShowModal();
  };

  hideShowModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `PHCLMOfDataCaptureController/updateShowModalStatus`,
      payload: {
        showModalStatus: false,
      },
    });
  };

  render() {
    const { showModal, insuredList } = this.props;
    return (
      <div className={styles.itemWrap}>
        {showModal && (
          <Modal
            visible={showModal}
            footer={[
              <div className={styles.modalFooter}>
                <Button key="submit" type="primary" onClick={this.handleInsureNameChoice}>
                  {formatMessageApi({
                    Label_BPM_Button: 'venus_claim.button.confirm',
                  })}
                </Button>
              </div>,
            ]}
            onCancel={() => {
              this.hideShowModal();
            }}
            width="50%"
            bodyStyle={{
              zIndex: 1000,
              height: 500,
              overflowY: 'scroll',
            }}
          >
            <Table
              rowSelection={{
                type: 'radio',
                onSelect: (record) => {
                  this.setState({
                    selectColumns: record,
                  });
                },
                // ...rowSelection,
              }}
              rowKey="clientId"
              pagination={false}
              columns={this.tableColumns}
              dataSource={this.dataSource}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(({ PHCLMOfDataCaptureController, dictionaryController }: any) => ({
  insuredList: PHCLMOfDataCaptureController.claimProcessData?.insuredList,
  claimProcessData: PHCLMOfDataCaptureController.claimProcessData,
  dictsOfGender: dictionaryController.Gender,
  showModal: PHCLMOfDataCaptureController.showModalStatus,
}))(NewTask);
