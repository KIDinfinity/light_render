import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import useGetPlaninfotableEditable from 'decision/components/Benefit/_hooks/useGetPlaninfotableEditable';
import useGetUWDecisionSum from 'decision/Edit/_hooks/useGetUWDecisionSum.ts';
import useJudgeCoverageAppliedChange from 'decision/_hooks/useJudgeCoverageAppliedChange.ts';
import EditFiled from './EditFiled';
import styles from './index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { showDeleteConfirmModal } from 'opus/Components/Modals/DeleteModal';

const EditeItem = ({ item, config, basicCurrencyCode }: any) => {
  const uuid = uuidv4();
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(item, 'notManualRemove') === 'Y';
  const uWDecisionTableSum = useGetUWDecisionSum({ config });
  const dispatch = useDispatch();
  if (!item?.coverageInsuredList) {
    lodash.set(item, 'coverageInsuredList', [
      {
        id: uuid,
        insuredSeqNum: '',
      },
    ]);
  }

  const removeRider = (id: string) => {
    dispatch({
      type: `${NAMESPACE}/deleteRider`,
      payload: {
        id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [id] },
    });
  };

  const coverageAppliedChange = useJudgeCoverageAppliedChange({
    coverageId: item?.id,
  });

  const showClose = !coverageAppliedChange && editable && !notManualRemove && item?.isMain === 'N';

  return (
    <div className={styles.container}>
      <div className={styles.editField}>
        <EditFiled key={item.id} data={item} basicCurrencyCode={basicCurrencyCode} />
      </div>
      <div className={classnames(styles.closeRider, { [styles.farIcon]: uWDecisionTableSum > 48 })}>
        {showClose ? (
          <div
            className={styles.icon}
            onClick={() => showDeleteConfirmModal({ onConfirm: () => removeRider(item?.id) })}
          >
            <Icon type="close" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditeItem;
