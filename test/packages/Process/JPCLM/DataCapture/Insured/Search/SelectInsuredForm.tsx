import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Table, Button, notification } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IntActiveTaskItem } from 'claimBasicProduct/pages/UnknownDocument/_models/interfaces';
import { PolicySource } from 'claim/pages/Enum';

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
      Label_BIZ_Policy: 'PolicySource',
    }),

    dataIndex: 'policySource',
    render: (text: string, item: any) =>
      lodash.get(item, 'policySource') || PolicySource.individualVal,
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
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    }),
    dataIndex: 'dateOfBirth',

    render: (text: string, item: any) => {
      const date = lodash.get(item, 'dateOfBirth');
      return date ? moment(date).format('L') : '-';
    },
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.gender',
    }),
    dataIndex: 'gender',
    render: (text: string, item: any) => lodash.get(item, 'gender') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.id-entity-type',
    }),
    dataIndex: 'identityType',
    render: (text: string, item: any) => lodash.get(item, 'identityType') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.identity-no',
    }),
    dataIndex: 'identityNo',
    render: (text: string, item: any) => lodash.get(item, 'identityNo') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.occupation',
    }),
    dataIndex: 'occupation',
    render: (text: string, item: any) => lodash.get(item, 'occupation') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.nationality',
    }),
    dataIndex: 'nationality',
    render: (text: string, item: any) => lodash.get(item, 'nationality') || '-',
  },

  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.email',
    }),
    dataIndex: 'email',
    render: (text: string, item: any) => lodash.get(item, 'email') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.phone-no',
    }),
    dataIndex: 'phoneNo',
    render: (text: string, item: any) => lodash.get(item, 'phoneNo') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.address',
    }),
    dataIndex: 'address',
    render: (text: string, item: any) => lodash.get(item, 'address') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'isCorporation',
    }),
    dataIndex: 'isCorporation',
    render: (text: string, item: any) => lodash.get(item, 'isCorporation') || '-',
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
@Form.create({})
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
    const { dispatch, taskDetail, insuredList }: any = this.props;
    if (lodash.isEmpty(selectColumns)) {
      notification.error({
        message: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000390',
        }),
      });
      return;
    }

    const { policyResultList } = selectColumns;
    const { clientId } = policyResultList?.[0]?.ownerClientInfo;
    const policyList = lodash
      .chain(insuredList)
      .map((item) => item?.clientId === clientId && item?.policyIdList)
      .flatten()
      .uniq()
      .compact()
      .value();

    await dispatch({
      type: 'JPCLMOfDataCapture/policyListUpdate',
      payload: { policyList },
    });

    await dispatch({
      type: `JPCLMOfDataCapture/savePartyListInfo`,
      payload: {
        policyOwnerList: policyResultList,
      },
    });
    await dispatch({
      type: `JPCLMOfDataCapture/saveSelectInsuredInfo`,
      payload: {
        selectColumns,
        taskDetail,
      },
    });
    dispatch({
      type: 'JPCLMOfDataCapture/saveBusinessProcess',
      payload: {
        selectColumns,
      },
    });
    await dispatch({
      type: `JPCLMOfDataCapture/getC360Data`,
    });
    this.hideShowModal();
  };

  hideShowModal = () => {
    const { dispatch } = this.props;
    dispatch({
      type: `JPCLMOfDataCapture/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
      },
    });
  };

  groupByInsuredInfo = (insuredInfoList) => {
    const groupList = lodash.forEach(insuredInfoList, (item) => {
      const key = item.firstName + item.surname;
      item.insured = key;
    });
    const groupByInsuredList = lodash.chain(groupList).groupBy('insured').value();
    const insuredGroupList = lodash.flatten(lodash.valuesIn(groupByInsuredList));
    return insuredGroupList;
  };

  render() {
    const { taskNotEditable, insuredList } = this.props;
    const { selectColumns } = this.state;
    const insuredInfoList = this.groupByInsuredInfo(insuredList);
    return (
      <div className={searchStyles.selectInsured}>
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

export default connect(({ JPCLMOfDataCapture, claimEditable, processTask }: any) => ({
  insuredList: JPCLMOfDataCapture.insuredList,
  taskNotEditable: claimEditable.taskNotEditable,
  claimProcessData: JPCLMOfDataCapture.claimProcessData,
  taskDetail: processTask.getTask,
}))(SelectInsuredForm);
