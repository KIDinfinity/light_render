import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import useGetLoadingColumns from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingColumns.ts';
import LoadingSection from './LoadingSection';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field/index';
import useHandleChangeLoadingCallback from 'decision/components/Header/components/Actions/_hooks/useHandleChangeLoadingCallback';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './loading.less';

const Loading = ({ record }: any) => {
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const displayUWMELink = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  const coverageId = lodash.get(record, 'id');
  const loadingList = lodash.chain(record).get('coverageLoadingList').value() || [{}];
  const loadingRule = lodash.chain(record).get('loadingRule').value();
  const loadingColumns = useGetLoadingColumns({ loadingRule, localConfig, displayUWMELink });
  const currentColumn = lodash.filter(loadingColumns, (item) => item.id !== 'remark');
  return (
    <div
      className={classnames(styles.wrap, {
        [styles.empty]: lodash.isEmpty(loadingList),
      })}
      data-id="Loading"
    >
      <>
        <div className={styles.benefit}>
          <Row gutter={[16, 16]} className={styles.fie}>
            {lodash.map(currentColumn, (item, index) => (
              <Col key={index} span={item?.span}>
                {item?.title}
              </Col>
            ))}
          </Row>
        </div>
      </>
      {lodash.map(loadingList, (item: any) => {
        return (
          <div key={item?.id} className={styles.exclusionList}>
            <div className={styles.tag} />
            <div className={styles.exclusion}>
              <LoadingSection
                item={item}
                coverageId={coverageId}
                id={item?.id}
                handleChangeLoading={handleChangeLoading}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Loading;
