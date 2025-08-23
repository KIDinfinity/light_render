import React from 'react';
import classnames from 'classnames';
import { Row, Col } from 'antd';
import lodash from 'lodash';
import useGetLoadingColumns from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingColumns';
import LoadingSection from './LoadingSection';
import { localConfig } from 'process/NB/ManualUnderwriting/Decision/Benefit/Loading-Field/Section';
import useHandleChangeLoadingCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeLoadingCallback';
import useGetUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useGetUWMELinkRule';
import useAddRidersLoading from 'process/NB/ManualUnderwriting/_hooks/useAddRidersLoading';

import styles from './loading.less';

const Loading = ({ record }: any) => {
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const displayUWMELink = useGetUWMELinkRule();
  const coverageId = lodash.get(record, 'id');
  useAddRidersLoading({ coverageId });
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
