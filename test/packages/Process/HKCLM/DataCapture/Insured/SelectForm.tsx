import React, { useState } from 'react';
import { NAMESPACE } from '../activity.config';

import { Table, Button, notification } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { PolicySource } from 'claim/pages/Enum';
import searchStyles from './SearchModal.less';

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
      Label_BIZ_Claim: 'app.usermanagement.basicInfo.label.gender',
    }),
    dataIndex: 'gender',
    render: (text: string, item: any) => lodash.get(item, 'gender') || '-',
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

    const { policyResultList } = selectColumns;
    await dispatch({
      type: `${NAMESPACE}/savePartyListInfo`,
      payload: {
        policyOwnerList: policyResultList,
      },
    });
    const result = await dispatch({
      type: `${NAMESPACE}/getC360Data`,
      payload: {
        insuredInfo: {
          policyId: lodash.first(selectColumns.policyIdList),
          insuredId: selectColumns.clientId,
        },
      },
    });
    const combineClaimantInfo = lodash
      .chain(result?.clientInfoList)
      .find((item) => {
        const clientId = lodash.find(
          result?.policyOwnerList,
          (item) => item?.policyId === lodash.first(selectColumns.policyIdList)
        )?.clientId;
        return item?.clientId === clientId;
      })
      .value();
    if (result) {
      await dispatch({
        type: `${NAMESPACE}/saveSelectInsuredInfo`,
        payload: {
          selectColumns,
          combineClaimantInfo,
        },
      });
    }
    hideShowModal();
  };

  const groupByInsuredInfo = (insuredInfoList: any) => {
    const groupList = lodash.map(insuredInfoList, (item) => {
      const key = item.firstName + item.surname;
      return {
        ...item,
        insured: key,
      };
    });
    const groupByInsuredList = lodash.chain(groupList).groupBy('insured').value();
    const insuredGroupList = lodash.flatten(lodash.valuesIn(groupByInsuredList));
    return insuredGroupList;
  };

  const insuredInfoList = groupByInsuredInfo(insuredList);
  return (
    <div className={searchStyles.selectInsured}>
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
