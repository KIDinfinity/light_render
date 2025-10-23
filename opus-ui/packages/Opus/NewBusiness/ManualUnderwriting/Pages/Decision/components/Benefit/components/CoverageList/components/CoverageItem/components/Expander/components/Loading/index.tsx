import React, { useCallback, useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Icon, Row, Col } from 'antd';
import lodash from 'lodash';
import useGetLoadingColumns from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetLoadingColumns';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import LoadingSection from './LoadingSection';
import { localConfig } from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Loading-Field';
import useGetCoverageList from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import useHandleChangeLoadingCallback from './_hooks/useHandleChangeLoadingCallback';
import useGetPlanExtraPremiumLoadingRule from './_hooks/useGetPlanExtraPremiumLoadingRule';
import { Collapse } from 'antd';
import BenefitLevelDecision from 'opus/NewBusiness/Enum/BenefitLevelDecision';
import { formUtils } from 'basic/components/Form';
import { ReactComponent as DeleteIcon } from 'packages/Opus/Assets/icon-delete.svg';
import { ReactComponent as PlusIcon } from 'packages/Opus/Assets/icon-plus.svg';

const { Panel } = Collapse;

import styles from './index.less';
import useGetSustainabilityCaseCheckStatus from 'opus/NewBusiness/ManualUnderwriting/Pages/SustainabilityCaseModal/CheckingProvider/hooks/useGetSustainabilityCaseCheckStatus';

const Loading = ({ record, loadingDisabled }: any) => {
  const dispatch = useDispatch();
  const handleChangeLoading = useHandleChangeLoadingCallback();
  const displayUWMELink = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.displayUWMELink,
    shallowEqual
  );
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const coverageId = lodash.get(record, 'id');
  const coverageList = useGetCoverageList();

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

  const removeLoading = async (id: any) => {
    await dispatch({
      type: `${NAMESPACE}/deleteLoadingList`,
      payload: {
        id,
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
      <>
        <div className={styles.benefit}>
          <Row gutter={[16, 16]} className={styles.fie} align="middle">
            {lodash.map(currentColumn, (item, index) => (
              <Col key={index} span={item?.span} className={styles.loadingTitle}>
                {item?.title}
              </Col>
            ))}
          </Row>
        </div>
      </>
      {lodash.map(loadingList, (item: any) => {
        return (
          <div key={item?.id} className={styles.exclusionList}>
            <div className={styles.exclusion}>
              <LoadingSection
                item={item}
                coverageId={coverageId}
                id={item?.id}
                handleChangeLoading={handleChangeLoading}
                loadingDisabled={loadingDisabled}
                editableOfSustainability={editableOfSustainability}
              />
            </div>
            {!taskNotEditable && !loadingDisabled && editableOfSustainability ? (
              <div className={styles.btnWrap}>
                {item?.loadingFunctionType !== 'C' ? (
                  <div className={styles.icon} onClick={() => removeLoading(item?.id)}>
                    <Icon component={DeleteIcon} />
                  </div>
                ) : null}
                {item?.id === loadingList[loadingList?.length - 1]?.id &&
                item?.loadingFunctionType !== 'C' ? (
                  <div className={styles.icon} onClick={handleAddLoading}>
                    <Icon component={PlusIcon} />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

const LoadingCollapse = (props) => {
  const { record } = props;
  const dispatch = useDispatch();
  const [activityKey, setActiveKey] = useState('Loading');
  const coverageId = lodash.get(record, 'id');
  const decision = formUtils.queryValue(lodash.get(record?.coverageDecision, 'uwDecision'));
  const coverageLoadingList = lodash.get(record, 'coverageLoadingList', []);
  const handleAddLoading = useCallback(async () => {
    await dispatch({
      type: `${NAMESPACE}/addLoadingList`,
      payload: {
        coverageId,
      },
    });
  }, [coverageId, dispatch]);
  const handleChange = (key) => {
    setActiveKey(key?.[0]);
  };
  useEffect(() => {
    setActiveKey(coverageLoadingList?.length ? 'Loading' : '');
  }, [coverageLoadingList?.length]);
    
  const loadingDisabled = useGetPlanExtraPremiumLoadingRule({ coverageId });

  const Extra = () => {
    return (
      <>
        {!coverageLoadingList?.length && activityKey !== 'Loading' && !loadingDisabled ? (
          <div className={styles.addLoading} onClick={handleAddLoading}>
            <Icon component={PlusIcon} />
            <span>Add Loading</span>
          </div>
        ) : null}
      </>
    );
  };
  
  return decision === BenefitLevelDecision.NonStandard ? (
    <div className={styles.container}>
      <Collapse
        expandIconPosition="right"
        activeKey={activityKey}
        onChange={handleChange}
        defaultActiveKey={'Loading'}
      >
        <Panel header="Loading" key="Loading" extra={<Extra />}>
          <Loading {...props} loadingDisabled={loadingDisabled} />
        </Panel>
      </Collapse>
    </div>
  ) : null;
};

LoadingCollapse.displayName = 'loading';

export default LoadingCollapse;
