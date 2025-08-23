import React, { useCallback } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon, Row, Col } from 'antd';
import lodash from 'lodash';
import useGetLoadingColumns from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingColumns';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import LoadingSection from './LoadingSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useHandleChangeLoadingCallback from 'decision/components/Header/components/Actions/_hooks/useHandleChangeLoadingCallback';
import useGetPlanExtraPremiumLoadingRule from './_hooks/useGetPlanExtraPremiumLoadingRule';

import styles from './index.less';
import useGetSustainabilityCaseCheckStatus from 'process/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

const Loading = ({ record }: any) => {
  const dispatch = useDispatch();
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const displayUWMELink = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const coverageId = lodash.get(record, 'id');
  const coverageList = useGetCoverageList();
  const buttonDisable = useGetPlanExtraPremiumLoadingRule({ coverageId });

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
  const handleAddLoading = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addLoadingList`,
      payload: {
        coverageId,
      },
    });
  }, [coverageId, dispatch]);
  const { editableOfSustainability = true } = useGetSustainabilityCaseCheckStatus();
  return (
    <div
      className={classnames(styles.wrap, {
        [styles.empty]: lodash.isEmpty(loadingList),
      })}
      data-id="Loading"
    >
      <div className={styles.header}> {formatMessageApi({ Label_BIZ_policy: 'loading' })}</div>
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
                  isCopyLoading={!lodash.isEmpty(item?.copyId)}
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
