import React, { useState } from 'react';
import { NAMESPACE } from '../activity.config';
import { Table, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicySource } from 'claim/pages/Enum';
import searchStyles from './SearchModal.less';

const tableColumns = [
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'PolicyNo',
    }),
    dataIndex: 'policyId',
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
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.clientId') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.first-name',
    }),
    dataIndex: 'firstName',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.firstName') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Individual: 'MiddleName',
    }),
    dataIndex: 'middleName',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.middleName') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.surname',
    }),
    dataIndex: 'surname',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.surname') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.date-of-birth',
    }),
    dataIndex: 'dateOfBirth',
    render: (text: string, item: any) => moment(lodash.get(item, 'insuredClientInfo.dateOfBirth')).format('MM/DD/YYYY') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.gender',
    }),
    dataIndex: 'gender',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.gender') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.occupation',
    }),
    dataIndex: 'occupation',
    render: (text: string, item: any) =>
      lodash.get(item, 'insuredClientInfo.occupationCode') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.nationality',
    }),
    dataIndex: 'nationality',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.nationality') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'isCorporation',
    }),
    dataIndex: 'isCorporation',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.isCorporation') || '-',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'Company',
    }),
    dataIndex: 'companyName',
    render: (text: string, item: any) => lodash.get(item, 'insuredClientInfo.companyName') || '-',
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

const SelectInsuredForm = () => {
  const dispatch = useDispatch();
  const insuredList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.insuredList
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const [selectColumns, setSelectColumns] = useState({});
  const hideShowModal = () => {
    dispatch({
      type: `${NAMESPACE}/updateShowSearchModal`,
      payload: {
        showSearchModel: false,
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

    await dispatch({
      type: `${NAMESPACE}/savePartyListInfo`,
      payload: {
        policyOwnerList: insuredList,
      },
    });
   await dispatch({
      type: `${NAMESPACE}/getC360Data`,
      payload: {
        policySource: selectColumns?.policySource,
        insuredInfo: {
          policyId: selectColumns?.policyId,
          memberNo:selectColumns.memberNo,
          insuredId: selectColumns?.insuredClientInfo.clientId,
          ...lodash.pick(selectColumns?.insuredClientInfo, [
            'firstName',
            'middleName',
            'surname',
            'dateOfBirth',
            'gender',
          ]),
        },
      },
    });

    hideShowModal();
  };

  const getRowKey = data => data?.policyId + data?.insuredClientInfo?.clientId
  return (
    <div className={searchStyles.selectInsured}>
      <Table
        rowSelection={{
          type: 'radio',
          onSelect: (record) => {
            setSelectColumns(record);
          },
          selectedRowKeys: [getRowKey(selectColumns)],
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectColumns(record);
            },
          };
        }}
        rowKey={ record => getRowKey(record) }
        pagination={false}
        columns={tableColumns}
        dataSource={insuredList}
        scroll={{ x: 'max-content' }}
      />
      {!!editable && (
        <div className={searchStyles.searchButton}>
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
