import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Button } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IntActiveTaskItem } from 'claimBasicProduct/pages/UnknownDocument/_models/interfaces';

import searchStyles from './SearchInsuredModal.less';

const FORMID = 'selectInsuredForm';

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

const tableColumns = [
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'PolicyNo',
    }),
    dataIndex: 'policyIdList',
    render: (text: string, item: any) => {
      const policyIdList = lodash.get(item, 'policyIdList') || '-';
      if (lodash.isArray(policyIdList) && !lodash.isEmpty(policyIdList)) {
        const policyNo = policyIdList.join(',');
        return policyNo;
      }
      return '-';
    },

  },
  {
    title: formatMessageApi({
      Label_BIZ_Individual: 'ClientID',
    }),

    dataIndex: 'clientId',
    render: (text: string, item: any) => lodash.get(item, 'clientId') || '-',

  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.first-name',
    }),
    dataIndex: 'firstName',
    render: (text: string, item: any) => lodash.get(item, 'firstName') || '-',

  },
  {
    title: formatMessageApi({
      Label_BIZ_Individual: 'MiddleName',
    }),
    dataIndex: 'middleName',
    render: (text: string, item: any) => lodash.get(item, 'middleName') || '-',
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
      Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.policyOwnerInformation.extName',
    }),
    dataIndex: 'extName',
    render: (text: string, item: any) => lodash.get(item, 'extName') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    }),
    dataIndex: 'dateOfBirth',

    render: (text: string, item: any) => {
      const date = lodash.get(item, 'dateOfBirth');
      return date ? moment(date).format('L') : '-';
    }
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.gender',
    }),
    dataIndex: 'gender',
    render: (text: string, item: any) => formatMessageApi({Gender: lodash.get(item, 'gender')}) || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'Company',
    }),
    dataIndex: 'companyName',
    render: (text: string, item: any) => lodash.get(item, 'companyName') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'MemberNO',
    }),
    dataIndex: 'memberNo',
    render: (text: string, item: any) => lodash.get(item, 'memberNo') || '-',
  },
];

// @ts-ignore
@Form.create({
})
class SelectInsuredForm extends Component<IProps> {
  state = { selectColumns: {} };


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


  handleSelectInsured = async () => {
    const { selectColumns } = this.state;
    const { dispatch } = this.props;
    if (!lodash.isEmpty(selectColumns)) {
      const policyNoList = [];
      const { policyIdList } = selectColumns;
      policyNoList.push(lodash.toUpper(policyIdList[0]))
      await dispatch({
        type: `PHCLMOfDataCaptureController/getPolicyOwnerList`,
        payload: {
          policyNoList,
          selectColumns,
        },
      });
      dispatch({
        type: 'PHCLMOfDataCaptureController/saveIssueAge'
      })
      await dispatch({
        type: `PHCLMOfDataCaptureController/saveNewSubmitInsureId`,
        payload: {
          selectColumns,
        },
      });

      this.hideShowModal();
    }
  };

  hideShowModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `PHCLMOfDataCaptureController/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
      }
    });

  }

  groupByInsuredInfo = (insuredInfoList) => {
    const groupList = lodash.forEach(insuredInfoList?.partyInfoList, item => {
      const key = item.firstName + item.surname;
      item.insured = key;
    })
    const groupByInsuredList = lodash.chain(groupList).groupBy('insured').value();
    const insuredGroupList = lodash.flatten(lodash.valuesIn(groupByInsuredList))
    return insuredGroupList;
  }

  render() {
    const { taskNotEditable, insuredList } = this.props;
    const { selectColumns } = this.state;
    const insuredInfoList = this.groupByInsuredInfo(insuredList);
    return (
      <div className={searchStyles.selectInsured} >
        {insuredList?.moreIndicator === 'Y' && <div className={searchStyles.errorMessage}>
          {formatMessageApi({Label_BIZ_Claim: 'MoreSearchResult'})}
        </div>}
        <Table
          rowSelection={{
            type: 'radio',
            selectedRowKeys: [selectColumns?.clientId],
            onSelect: (record) => {
              this.setState({
                selectColumns: record,
              });
            },
            // ...rowSelection,
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                this.setState({
                  selectColumns: record,
                });
              },
            };
          }}
          rowKey="clientId"
          pagination={false}
          columns={tableColumns}
          dataSource={insuredInfoList}
          scroll={{ x: 'max-content' }}

        />
        {!taskNotEditable && (
          <div className={searchStyles.searchButton}>
            <Button key="submit" type="primary" onClick={this.handleSelectInsured}>
              {formatMessageApi({
                Label_BPM_Button: 'venus_claim.button.confirm',
              })}
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({
    PHCLMOfDataCaptureController,
    claimEditable
  }: any) => ({
    insuredList: PHCLMOfDataCaptureController.claimProcessData?.insuredList,
    taskNotEditable: claimEditable.taskNotEditable,
    claimProcessData: PHCLMOfDataCaptureController.claimProcessData,
  })
)(SelectInsuredForm);
