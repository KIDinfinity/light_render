import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import { useSelector } from 'dva';
import useGetExistingAuthorisedSignatoryList from 'process/NB/CustomerIdentification/_hooks/useGetExistingAuthorisedSignatoryList';
import useDeleteAuthorisedSignatory from 'process/NB/CustomerIdentification/_hooks/useDeleteAuthorisedSignatory';
import useGetFieldsCustomerTypeConfig from 'basic/hooks/useGetFieldsCustomerTypeConfig';
import useGetColumnsByConfig from 'process/NB/CustomerIdentification/_hooks/useGetColumnsByConfig';
import getExistingASData from './getExistingASData';
import { tenant } from '@/components/Tenant';
import styles from './ExistingAuthorisedSignatory.less';
import classNames from 'classnames';

const ExistingASWrap = ({ tableData, data }: any) => {
  const taskNotEditable: boolean = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable
  );
  const deleteAuthorisedSignatory = useDeleteAuthorisedSignatory();

  return (
    <div className={styles.row}>
      <div
        className={classNames({
          [styles.icon]: !taskNotEditable,
          [styles.disabled]: taskNotEditable,
        })}
      >
        {!taskNotEditable && !tenant.isMY() && (
          <div
            className={styles.close}
            onClick={() => deleteAuthorisedSignatory(data?.id, data?.parentId)}
          >
            <Icon type="close" />
          </div>
        )}
      </div>
      {lodash.map(tableData, (item: any) => {
        return (
          <div className={styles.col} style={{ width: item.width }}>
            {item?.value}
          </div>
        );
      })}
    </div>
  );
};

export default ({ policy, columnList, ASClientDate }: any) => {
  const ExistingAuthorisedSignatoryList = useGetExistingAuthorisedSignatoryList({ policy });
  const atomConfig = useGetFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT002',
  });
  const clientColumnsList = useGetColumnsByConfig({
    columnList,
    item: ASClientDate,
    atomConfig,
  });

  return (
    <>
      {lodash.map(ExistingAuthorisedSignatoryList, (item: any, index: number) => {
        return (
          <ExistingASWrap
            tableData={getExistingASData({ columnList: clientColumnsList, item, index })}
            data={item}
          />
        );
      })}
    </>
  );
};
