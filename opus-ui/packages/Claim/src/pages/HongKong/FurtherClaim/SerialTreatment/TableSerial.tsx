import React, { useState } from 'react';
import { connect, useDispatch } from 'dva';
import { Table, Spin } from 'antd';
import lodash from 'lodash';
import { EFollowUp } from 'claim/pages/HongKong/FurtherClaim/enum';
import { tenant, Region } from '@/components/Tenant';
import TableColum from './TableColum';

import styles from './styles.less';

const TableSerial = ({
  namespace,
  dataSource,
  treatmentId,
  dictsOfClaimType,
  dictsOfCauseOfIncident,
  dictsOfClaimStatus,
  isRegisterMcs,
  taskNotEditable,
  dictsOfDiagnosis,
  dictsOfCaseSource,
  dictsOfMainBenefit,
  loading,
}: any) => {
  const dispatch = useDispatch();

  const [selectedKey, setSelectedKey] = useState(
    lodash
      .chain(dataSource)
      .map((data: any) => (data.followUp === EFollowUp.Yes ? data?.key : null))
      .compact()
      .value()
  );

  const rowSelection = {
    selectedRowKeys: selectedKey,
    onChange: (selectedKeys: string[], records: any) => {
      const sameInquiryClaimNos = lodash.filter(dataSource, (item: any) =>
        lodash.some(records, (some) => some?.inquiryClaimNo === item?.inquiryClaimNo)
      );

      dispatch({
        type: `${namespace}/saveSelectionTreatment`,
        payload: { treatmentId, selectionTreatments: sameInquiryClaimNos, records },
      });

      setSelectedKey(selectedKeys);
    },
    getCheckboxProps: (record: any) => {
      return {
        disabled: taskNotEditable || isRegisterMcs || !lodash.has(record, 'followUp'),
        name: record.name,
        display: 'none',
      };
    },
  };

  return (
    !lodash.isEmpty(dataSource) && (
      <div className={styles.tableSerial}>
        {!loading ? (
          <Table
            pagination={false}
            rowSelection={rowSelection}
            columns={TableColum({
              dictsOfClaimType,
              dictsOfCauseOfIncident,
              dictsOfClaimStatus,
              dictsOfDiagnosis,
              dictsOfCaseSource,
              dictsOfMainBenefit,
              dispatch,
            })}
            dataSource={tenant.region({
              [Region.TH]: lodash.uniqBy(dataSource, 'inquiryClaimNo'),
              notMatch: dataSource,
            })}
            scroll={{ x: 1500, y: 200 }}
            rowClassName={(record) => record.className}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
      </div>
    )
  );
};

export default connect(
  ({ loading, dictionaryController, claimEditable, ...res }: any, { namespace }: any) => ({
    dictsOfClaimType: dictionaryController.ClaimType,
    dictsOfCauseOfIncident: dictionaryController.CauseOfIncident,
    dictsOfCaseSource: dictionaryController.CaseSource,
    dictsOfMainBenefit: dictionaryController.MainBenefit,
    dictsOfClaimStatus: dictionaryController.Dropdown_CLM_ClaimStatus,
    isRegisterMcs: lodash.get(res, `${namespace}.isRegisterMcs`),
    dictsOfDiagnosis: lodash.get(res, `${namespace}.dictsOfDiagnosis`),
    loading: loading.effects[`${namespace}/refreshSerialTreatment`],
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(TableSerial);
