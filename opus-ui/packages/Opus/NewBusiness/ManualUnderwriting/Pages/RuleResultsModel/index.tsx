import React from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import StpResult from './StpResult';
import UWMEResult from './UWMEResult';
import AutoUWResult from './AutoUWResult';
import styles from './index.less';

const RuleResultsModel = ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();
  const functionLoading: boolean = useSelector(
    ({ loading }: any) => loading.effects[`${NAMESPACE}/getRuleResultsModal`]
  );
  const isShowRuleResultsModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowRuleResultsModal
  );
  const ruleResultList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ruleResultList
  );

  const onClose = async () => {
    await dispatch({
      type: `${NAMESPACE}/getRuleResultsModal`,
    });
    await dispatch({
      type: `${NAMESPACE}/deleteRuleResultsModal`,
    });
  };
  const showAutoUWResult = lodash.find(ruleResultList, (item) => {
    return item?.ruleType === 'AutoUWResult';
  });
  const getData = (ruleTypeName: string) => {
    return lodash.find(ruleResultList, (item) => {
      return !!item?.ruleType && item.ruleType === ruleTypeName;
    });
  };
  return (
    <div>
      {!functionLoading ? (
        <CommonResizeModal
          confirmAuth={false}
          visible={isShowRuleResultsModal}
          onReturn={onClose}
          onCancel={onClose}
          returnAuth
          width={900}
          height={650}
        >
          <div className={styles.wrap}>
            <div className={styles.head}>
              <span className={styles.title}>
                {formatMessageApi({ Label_COM_General: 'RuleExecutionResults' })}
              </span>
            </div>
            <div>
              {showAutoUWResult ? (
                <AutoUWResult data={getData('AutoUWResult')} />
              ) : (
                <UWMEResult data={getData('UWMEResult')} />
              )}

              <StpResult data={getData('StpResult')} />
            </div>
          </div>
        </CommonResizeModal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RuleResultsModel;
