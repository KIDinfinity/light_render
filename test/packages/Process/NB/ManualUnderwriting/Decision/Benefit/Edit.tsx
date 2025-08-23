import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'dva';
import useGetPlaninfotableEditable from 'process/NB/ManualUnderwriting/_hooks/useGetPlaninfotableEditable';
import useGetUWDecisionSum from 'process/NB/ManualUnderwriting/_hooks/useGetUWDecisionSum';
import useJudgeCoverageAppliedChange from 'process/NB/ManualUnderwriting/_hooks/useJudgeCoverageAppliedChange';
import useHandleRemoveCoverageCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRemoveCoverageCallback';
import { NAMESPACE } from '../../activity.config';
import EditItem from './EditItem';
import styles from './index.less';

const PlaninfoTable = ({ item, config }: any) => {
  const uuid = uuidv4();
  const dispatch = useDispatch();
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(item, 'notManualRemove') === 'Y';
  const uWDecisionTableSum = useGetUWDecisionSum({ config });
  if (!item?.coverageInsuredList) {
    lodash.set(item, 'coverageInsuredList', [
      {
        id: uuid,
        insuredSeqNum: '',
      },
    ]);
  }

  const removeRider = useHandleRemoveCoverageCallback({ id: item?.id });
  const coverageAppliedChange = useJudgeCoverageAppliedChange({
    coverageId: item?.id,
  });

  return (
    <div className={styles.container}>
      <div>
        <EditItem key={item.id} data={item} />
      </div>

      <div className={classnames(styles.closeRider, { [styles.farIcon]: uWDecisionTableSum > 48 })}>
        {!coverageAppliedChange && editable && !notManualRemove && item?.isMain === 'N' ? (
          <div
            className={styles.icon}
            onClick={() => {
              removeRider();
              dispatch({
                type: `${NAMESPACE}/deleteSpareFundAllocation`,
                payload: {
                  id: item?.id,
                },
              });
            }}
          >
            <Icon type="close" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PlaninfoTable;
