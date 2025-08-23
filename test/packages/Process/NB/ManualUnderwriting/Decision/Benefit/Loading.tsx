import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { Icon, Row, Col } from 'antd';
import lodash from 'lodash';
import useGetLoadingColumns from 'process/NB/ManualUnderwriting/_hooks/useGetLoadingColumns';
import { NAMESPACE } from '../../activity.config';
import LoadingSection from './Loading-Field/LoadingSection';
import { localConfig } from './Loading-Field/Section';
import useHandleAddLoadingCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleAddLoadingCallback';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useHandleChangeLoadingCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeLoadingCallback';
import useGetUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useGetUWMELinkRule';
import useGetPlanExtraPremiumLoadingRule from 'process/NB/ManualUnderwriting/_hooks/useGetPlanExtraPremiumLoadingRule';
import useAddRidersLoading from 'process/NB/ManualUnderwriting/_hooks/useAddRidersLoading';
import useGetSustainabilityCaseCheckStatus from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

import styles from './index.less';

const Loading = ({ record }: any) => {
  const dispatch = useDispatch();
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const displayUWMELink = useGetUWMELinkRule();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const coverageId = lodash.get(record, 'id');
  const coverageList = useGetCoverageList();
  const buttonDisable = useGetPlanExtraPremiumLoadingRule({ coverageId });
  useAddRidersLoading({ coverageId });
  const loadingList = lodash
    .chain(coverageList)
    .find((item) => item?.id === coverageId)
    .get('coverageLoadingList')
    .value();
  const loadingRule = lodash
    .chain(coverageList)
    .find((item) => item?.id === coverageId)
    .get('loadingRule')
    .value();
  const loadingColumns = useGetLoadingColumns({ loadingRule, localConfig, displayUWMELink });
  const currentColumn = lodash.filter(loadingColumns, (item) => item.id !== 'waiveTerm');

  const removeLoading = async (id: any, itemId: any) => {
    await dispatch({
      type: `${NAMESPACE}/deleteLoadingList`,
      payload: {
        id,
        coverageId: itemId,
      },
    });
    await dispatch({
      type: `${NAMESPACE}/supplyUwDecisionEditInd`,
    });
  };
  const handleAddLoading = useHandleAddLoadingCallback({ coverageId });
  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();

  return (
    <div
      className={classnames(styles.wrap, {
        [styles.empty]: lodash.isEmpty(loadingList),
      })}
      data-id="Loading"
    >
      <div className={styles.header}>Loading</div>
      <div className={styles.content}>
        <div className={styles.benefit}>
          <Row gutter={[16, 16]} className={styles.fie}>
            {lodash.map(currentColumn, (item, index) => (
              <Col key={index} span={item?.span}>
                {item?.title}
              </Col>
            ))}
          </Row>
        </div>
        {lodash.map(loadingList, (item: any) => {
          return (
            <div key={item?.id} className={styles.exclusionList}>
              <div className={styles.exclusion}>
                <LoadingSection
                  item={item}
                  coverageId={coverageId}
                  id={item?.id}
                  handleChangeLoading={handleChangeLoading}
                  editableOfSustainability={editableOfSustainability}
                />
              </div>
              {!taskNotEditable && !buttonDisable && editableOfSustainability ? (
                <div className={styles.btnWrap}>
                  {item?.loadingFunctionType !== 'C' ? (
                    <div
                      className={styles.icon}
                      onClick={() => removeLoading(item?.id, coverageId)}
                    >
                      <Icon type="close" />
                    </div>
                  ) : null}
                  {item?.id === loadingList[loadingList?.length - 1]?.id &&
                  item?.loadingFunctionType !== 'C' ? (
                    <div className={styles.icon} onClick={handleAddLoading}>
                      <Icon type="plus" />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Loading;
