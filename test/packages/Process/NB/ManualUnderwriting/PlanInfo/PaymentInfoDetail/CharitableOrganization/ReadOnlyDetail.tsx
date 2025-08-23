import React, { useState, useMemo } from 'react';
import { Table, Icon } from 'antd';
import classnames from 'classnames';
import transTableRowsConfig from 'basic/utils/transTableRowsConfig';
import styles from './index.less';
import useGetCharityOrganizationData from 'process/NB/ManualUnderwriting/_hooks/useGetCharityOrganizationData';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const CharitableOrganization = ({ config }: any) => {
  const [isShowData, setIsShowData] = useState(false);
  const charitableOrganization = useGetCharityOrganizationData();
  const charitableOrganizationColumns = useMemo(() => {
    return transTableRowsConfig({
      config,
    });
  }, [config]);
  return (
    <>
      <div className={styles.container}>
        <div
          className={classnames(styles.amount, {
            [styles.expandAmount]: isShowData,
            [styles.packAmount]: !isShowData,
          })}
        >
          <div
            className={classnames(styles.initial, {
              [styles.expandInitial]: isShowData,
              [styles.packInitial]: !isShowData,
            })}
          >
            <div className={styles.num}>
              {' '}
              {formatMessageApi({
                Label_BIZ_Policy: 'CharityOrganization',
              })}
            </div>
            <div className={styles.currency}>
              {isShowData ? (
                <Icon
                  type="up"
                  onClick={() => setIsShowData(false)}
                  style={{ marginLeft: '4px' }}
                />
              ) : (
                <Icon
                  type="down"
                  onClick={() => setIsShowData(true)}
                  style={{ marginLeft: '4px' }}
                />
              )}
            </div>
          </div>
        </div>
        {isShowData && (
          <>
            <Table
              columns={charitableOrganizationColumns}
              dataSource={charitableOrganization}
              pagination={false}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CharitableOrganization;
