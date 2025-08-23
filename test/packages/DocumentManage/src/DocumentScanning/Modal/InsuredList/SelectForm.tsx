import React, { useState } from 'react';
import { Table, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicySource } from 'claim/pages/Enum';
import { relationshipWithInsuredForHK } from 'claim/enum';
import Styles from './index.less';

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

// ts-ignore

const SelectInsuredForm = ({ taskDetail }: any) => {
  const dispatch = useDispatch();

  const insuredList = useSelector(
    ({ documentScanningController }: any) => documentScanningController.insuredList
  );
  const policyNo = useSelector(
    ({ documentScanningController }: any) =>
      documentScanningController?.claimProcessData?.indexInformation?.policyNo || ''
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const [selectColumns, setSelectColumns] = useState({});
  const hideShowModal = () => {
    dispatch({
      type: `documentScanningController/saveShowInsuredList`,
      payload: {
        showInsuredList: false,
      },
    });
    dispatch({
      type: `documentScanningController/saveInsuredList`,
      payload: {
        insuredList: [],
      },
    });
  };
  const handleSelectInsured = async () => {
    if (lodash.isEmpty(selectColumns)) {
      notification.error({
        message: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000390',
        }),
      });
      return;
    }
    const { clientId, dateOfBirth, status, firstName, surname }: any = selectColumns;
    await dispatch({
      type: `documentScanningController/savePolicyInfo`,
      payload: {
        insured: {
          policyNo,
          insuredId: clientId,
          currentState: status,
          firstName,
          surname,
          dateOfBirth,
        },
        claimant: {
          relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
        },
        payeeList: [
          {
            relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
          },
        ],
      },
    });
    await hideShowModal();

    await dispatch({
      type: 'insured360/saveTaskInfo',
      payload: {
        taskDetail: {
          ...taskDetail,
          clientId,
        },
      },
    });
  };

  const groupByInsuredInfo = (insuredInfoList: any) => {
    const groupList = lodash.forEach(insuredInfoList, (item) => {
      const key = item.firstName + item.surname;
      item.insured = key;
    });
    const groupByInsuredList = lodash.chain(groupList).groupBy('insured').value();
    const insuredGroupList = lodash.flatten(lodash.valuesIn(groupByInsuredList));
    return insuredGroupList;
  };

  const insuredInfoList = groupByInsuredInfo(insuredList);
  return (
    <div className={Styles.selectInsured}>
      <Table
        rowSelection={{
          type: 'radio',
          selectedRowKeys: [selectColumns?.clientId],
          onSelect: (record) => {
            setSelectColumns(record);
          },
          // ...rowSelection,
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectColumns(record);
            },
          };
        }}
        rowKey="clientId"
        pagination={false}
        columns={tableColumns}
        dataSource={insuredInfoList}
        scroll={{ x: 'max-content' }}
      />
      {!!editable && (
        <div className={Styles.searchButton}>
          <Button key="submit" type="primary" onClick={handleSelectInsured}>
            {formatMessageApi({
              Label_BPM_Button: 'venus_claim.button.confirm',
            })}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SelectInsuredForm;
