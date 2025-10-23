import PageLoading from '@/components/PageLoading';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import React, { useEffect } from 'react';
import lodash from 'lodash';
import { Region } from '@/components/Tenant';
import ButtonWrap from '../../../Components/ButtonWrap';
import { ModalTabs, FieldType } from 'opus/Enums';
import { getConfigurationItem } from 'opus/Hooks';
import Header from '../../../Components/CountTaskStatus/Header';
import Summary from '../../../Components/CountTaskStatus/Summary';
import styles from './index.less';

const TaskSummary = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getTaskSummary`,
    });
  }, []);

  const loading = useSelector((state: any) => state.loading.effects[`${NAMESPACE}/getTaskSummary`]);

  const data =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskSummary) || {};

  const config = [
    { status: 'todo' },
    { status: 'pending' },
    { status: 'unassigned', region: [Region.TH] },
    { status: 'complete' },
  ];

  return !!loading ? (
    <PageLoading />
  ) : (
    <Summary className={styles.taskSummary} config={config} data={data} isMyTask />
  );
};

const TeamButtonWrap = ({ tabKey }: any) => {
  const dispatch = useDispatch();
  const { categoryCode, searchConfigs } = getConfigurationItem({
    modalTabs: tabKey,
    myTaskTab: 'todo',
  });
  const durationType =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskDurationType) || '';

  const config = [
    {
      key: 'duration',
      code: durationType,
      callback: async (value: string) => {
        await dispatch({
          type: `${NAMESPACE}/saveDurationType`,
          payload: {
            durationType: value,
            type: ModalTabs.myTask,
          },
        });

        await dispatch({
          type: `${NAMESPACE}/getTaskSummary`,
        });
        await dispatch({
          type: `${NAMESPACE}/getTaskList`,
          payload: {
            categoryCode,
          },
        });
        if (!lodash.isEmpty(searchConfigs)) {
          searchConfigs.forEach(({ fieldType, fieldCode }: any) => {
            if (String(fieldType) === FieldType.Select) {
              dispatch({
                type: `${NAMESPACE}/getFilterDatas`,
                payload: {
                  fieldName: fieldCode,
                  categoryCode,
                  modalTabs: ModalTabs.myTeamTask,
                },
              });
            }
          });
        }
      },
      region: [Region.TH, Region.HK],
    },
  ];
  return <ButtonWrap config={config} />;
};

export default () => {
  return (
    <div className={styles.card}>
      <Header Actions={<TeamButtonWrap />} />
      <TaskSummary />
    </div>
  );
};
