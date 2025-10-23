import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import lodash from 'lodash';
import CardLayout from 'opus/Components/CardLayout';
import { Region, tenant } from '@/components/Tenant';
import { ReactComponent as chartBar } from 'packages/Opus/Assets/icon-chart-bar.svg';
import React from 'react';

import styles from './TeamPipeline.less';
import UserTask from './UserTask';

const Main = () => {
  const list = tenant.region({
    [Region.JP]: [
      {
        key: 'todo',
        title: formatMessageApi({ Label_COM_Opus: 'RemainingToDoCases' }),
        code: 'remainingTodo',
      },
      {
        key: 'pending',
        title: formatMessageApi({ Label_COM_Opus: 'DueTodayCases' }),
        code: 'dueTodayCase',
      },
      {
        key: 'complete',
        title: formatMessageApi({ Label_COM_Opus: 'OverdueCases' }),
        code: 'overdueCase',
      },
    ],
    notMatch: [
      {
        key: 'todo',
        title: formatMessageApi({
          Dropdown_COM_TaskStatus: 'todo',
        }),
        code: 'todo',
      },
      {
        key: 'pending',
        title: formatMessageApi({
          Dropdown_COM_TaskStatus: 'pending',
        }),
        code: 'pending',
      },
      {
        key: 'complete',
        title: formatMessageApi({
          Dropdown_COM_TaskStatus: 'complete',
        }),
        code: 'complete',
      },
    ],
  });

  const content = (
    <>
      <div className={styles.despWrap}>
        {lodash.map(list, ({ key, title }: any) => (
          <span className={styles.item} key={key}>
            <span
              className={classNames(
                [Region.TH, Region.HK].includes(tenant.region())
                  ? styles.diamondTH
                  : styles.diamond,
                styles[key]
              )}
            />
            <span className={styles.title}>{title}</span>
          </span>
        ))}
      </div>
      <UserTask config={list} />
    </>
  );

  return (
    <CardLayout
      headerTitle={formatMessageApi({ Label_COM_Opus: 'TeamPipeline' })}
      headerIcon={chartBar}
      collapsable
      className={styles.teamPipeline}
      content={content}
    />
  );
};

export default Main;
