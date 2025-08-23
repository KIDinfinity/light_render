import React from 'react';
import ExpandableCard from 'process/NewBusiness/ManualUnderwriting/_components/ExpandableCard';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Edit from './Edit';
import styles from './index.less';
import { useInitProductConfig, useShowTakeOver } from './hooks';
import Show from './Show';
import { useDispatch } from 'dva';
import { OptionType } from '../../_enum';

const TakeOver = () => {
  const dispatch = useDispatch();
  const showTakeOver = useShowTakeOver();
  useInitProductConfig();
  return (
    <>
      {showTakeOver && (
        <ExpandableCard
          title="Take Over"
          errorBoundaryName="Take Over"
          contentClassName={styles.content}
          editModalProps={{
            onAfterConfirm: async () => {
              dispatch({
                type: `${NAMESPACE}/setTakeOverProcessData`,
              });
              const result: boolean = await dispatch<any>({
                type: `${NAMESPACE}/submit`,
                payload: {
                  type: OptionType.takeover,
                  formKeys: ['TakeOver-Field', 'TakeOver-Table'],
                },
              });
              return result;
            },
            onBeforeBack: async () => {},
            onBeforeOpen: async () => {
              dispatch({
                type: `${NAMESPACE}/resetTakeOverModalData`,
              });
            },
            children: <Edit />,
          }}
        >
          <Show />
        </ExpandableCard>
      )}
    </>
  );
};

TakeOver.displayName = 'takeOver';
export default TakeOver;
