import PageLoading from '@/components/PageLoading';
import { useSelector, useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Home/activity.config';
import React, { useEffect } from 'react';

import { Region } from '@/components/Tenant';
import lodash from 'lodash';

import { ModalTabs, FieldType } from 'opus/Enums';
import { getConfigurationItem } from 'opus/Hooks';

import ButtonWrap from '../ButtonWrap';
import Header from './Header';
import styles from './index.less';
import Summary from './Summary';

const TeamSummary = () => {
  const data =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.teamSummary) || {};

  const config = [
    { status: 'todo' },
    { status: 'pending' },
    { status: 'unassign', region: [Region.TH] },
    { status: 'complete' },
  ];

  return <Summary config={config} data={data} />;
};

const TeamButtonWrap = ({ tabKey }: any) => {
  const dispatch = useDispatch();
  const { categoryCode, searchConfigs } = getConfigurationItem({
    modalTabs: tabKey,
    myTaskTab: 'todo',
  });

  const durationType =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.durationType) || '';

  const config = [
    {
      key: 'organization',
    },
    {
      key: 'duration',
      code: durationType,
      callback: async (value: string) => {
        await dispatch({
          type: `${NAMESPACE}/saveDurationType`,
          payload: {
            durationType: value,
            type: ModalTabs.myTeamTask,
          },
        });
        await dispatch({
          type: `${NAMESPACE}/getTeamSummary`,
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

const Main = ({ tabKey }: any) => {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.loading.effects[`${NAMESPACE}/getTeamSummary`]);

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getTeamSummary`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <Header Actions={<TeamButtonWrap tabKey={tabKey} />} />
        {!!loading ? <PageLoading /> : <TeamSummary />}
      </div>
    </div>
  );
};

export default Main;
