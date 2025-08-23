import React, { useContext, useEffect, useState, useMemo } from 'react';
import lodash from 'lodash';
import { history } from 'umi';
import classNames from 'classnames';
import { useGetQueryPageAtomConfig, useShowLabelHead } from 'bpm/pages/OWBEntrance/_hooks';
import context from 'bpm/pages/OWBEntrance/Context/context';
import getIndicator from 'bpm/pages/OWBEntrance/Header/getIndicator';
import InfoLabel from 'bpm/pages/OWBEntrance/Header/InfoLabel';
import styled from 'styled-components';
import { Spin } from 'antd';
import styles from './index.less';

enum Info {
  CaseNo = 'Case No.',
}

const HeaderInfo = ({ list, processInstanceId, caseCategory, getTaskDetail }: any) => {
  const caseNo = lodash.find(list, (item: any) => item?.title === Info.CaseNo)?.value;
  const [indicator, setIndicator] = useState({});
  const { dispatch } = useContext(context);

  const taskDetail = useMemo(() => {
    return { processInstanceId: processInstanceId, caseCategory: caseCategory };
  }, [processInstanceId, caseCategory]);

  useEffect(() => {
    if (!lodash.isEmpty(taskDetail?.processInstanceId)) {
      getIndicator({ caseNo: taskDetail.processInstanceId, setIndicator });
    }
  }, [taskDetail]);

  useGetQueryPageAtomConfig({
    taskDetail,
    sectionId: 'HeadLabel',
    dispatch,
  });

  const isShowLabelHead = useShowLabelHead({ indicator });

  getTaskDetail({
    processInstanceId: caseNo,
  });

  const Jump = styled.span`
    text-decoration: underline;
    color: var(--task-header-info-color);
    &:hover {
      color: var(--primary-color);
      cursor: pointer;
    }
  `;

  const contentRnder = (item) => {
    if (item.loading) {
      return <Spin size="small" />;
    }
    if (item?.jumpable && item?.value) {
      return (
        <Jump onClick={() => history.push(`/navigator/case/detail/${item?.value}`)}>
          {item?.value}
        </Jump>
      );
    }
    return item.value;
  };

  return (
    <>
      {isShowLabelHead ? (
        <div className={styles.head}>
          <div className={styles.headTop}>
            <ul className={classNames(styles.info, styles.infoLabel)}>
              {lodash.map(lodash.slice(list, 0, 1), (item) => (
                <li key={item?.title}>
                  <div className={styles.label}>{item?.title}</div>
                  <div className={`${styles.text} ${item.loading ? styles.loadig : ''}`}>
                    {contentRnder(item)}
                  </div>
                </li>
              ))}
              <li>
                <InfoLabel indicator={indicator} />
              </li>
            </ul>
          </div>
          <ul className={classNames(styles.info, styles.infoLabel)}>
            {lodash.map(lodash.slice(list, 1), (item) => (
              <li key={item?.title}>
                <div className={styles.label}>{item?.title}</div>
                <div className={`${styles.text} ${item.loading ? styles.loadig : ''}`}>
                  {contentRnder(item)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className={styles.info}>
          {lodash.map(list, (item) => (
            <li key={item?.title}>
              <div className={styles.label}>{item?.title}</div>
              <div className={`${styles.text} ${item.loading ? styles.loadig : ''}`}>
                {contentRnder(item)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default HeaderInfo;
