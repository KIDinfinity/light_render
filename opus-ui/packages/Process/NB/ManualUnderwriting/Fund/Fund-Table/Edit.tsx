import React, { useMemo } from 'react';
import lodash from 'lodash';
import { Icon, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import EditableTableProvider from 'process/NB/ManualUnderwriting/_components/EditableTable';
import useGetAutoAttachFundStatus from 'process/NB/ManualUnderwriting/_hooks/useGetAutoAttachFundStatus';
import useGetFundConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFundConfig';

import Ellipsis from '@/components/Ellipsis';
import { NAMESPACE } from '../../activity.config';
import EditItem from './EditItem';
import styles from './index.less';

const RenderTitle = ({ totalFundInfoList, config }: any) => {
  const titleList = useGetFundConfig({ config, totalFundInfoList });

  return (
    <Row type="flex" gutter={16}>
      {lodash.map(titleList, (item: any) => {
        return (
          <Col key={item.label} span={item.span}>
            <Ellipsis lines={0} length={18} fullWidthRecognition>
              {item.label}
            </Ellipsis>
          </Col>
        );
      })}
    </Row>
  );
};

const FundTable = ({ config }: any) => {
  const fundInfo =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.businessData?.policyList?.[0]?.fundInfo,
      shallowEqual
    ) || {};
  const totalFundInfoList = fundInfo?.totalFundInfoList;
  const allFundConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.allFundConfigList,
    shallowEqual
  );

  const dispatch = useDispatch();
  const data = useMemo(() => {
    return lodash.map(totalFundInfoList, (item: any) => ({
      ...item,
      fundName: lodash.find(allFundConfigList, { fundCode: item.fundCode })?.fundName,
    }));
  }, [totalFundInfoList, allFundConfigList]);
  // useAutoAttachFunds(fundInfo);
  const deleteCurrentRow = (id: any) => {
    dispatch({
      type: `${NAMESPACE}/deleteFundSelectedRow`,
      payload: {
        id,
      },
    });
  };

  const autoAttachFundStatus = useGetAutoAttachFundStatus();

  return (
    <div className={styles.container}>
      <div className={styles.customTitle}>
        <RenderTitle config={config} totalFundInfoList={totalFundInfoList} />
      </div>
      <EditableTableProvider condition={data && data?.length}>
        {lodash.map(data, (item: any) => {
          return (
            <div className={styles.column} key={item?.id}>
              <div className={styles.inputwrap}>
                <EditItem data={item} id={item.id} key={item.id} fundCode={item?.fundCode} />
              </div>
              {!autoAttachFundStatus && (
                <div className={styles.close} onClick={() => deleteCurrentRow(item.id)}>
                  <Icon type="close" />
                </div>
              )}
            </div>
          );
        })}
      </EditableTableProvider>
    </div>
  );
};

export default FundTable;
