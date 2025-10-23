

import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col, Row, Icon } from 'antd';
import Tabs from './Tabs'

import configIcon from './configIcon';
import styles from './index.less';



const Summary = () => {
  const { datas, currentTab } = useSelector(({ navigatorHomeWatching }: any) => navigatorHomeWatching.dashboardData) || {};

  // 获取宽度
  const getWith = (singleData: number, allDataSum: number) => {
    return Math.min((Number(singleData) / Number(allDataSum)) * 100, 100)
  }

  const list = useMemo(() => {
    return lodash
      .chain(datas?.[currentTab] || [])
      .map(((item: any) => {
        const total = Number(item.todo) + Number(item.pending) + Number(item.completed)
        return ({
          ...item,
          pendingWith: getWith(item.pending, total),
          inProgressWith: getWith(item.todo, total),
          completedWith: getWith(item.completed, total),
          total
        })
      }))
      .value()
  }, [datas, currentTab])

  return (
    <Row className={styles.summaryWrap}>
      <Col span={12}>
        <div style={{display: 'flex'}}>
          <div className={styles.cardWrap}>
            <div className={styles.identification}>
              {currentTab?.toUpperCase()}
            </div>
            <div className={styles.title}>
              Submission Summary
            </div>
            <div className={styles.concent}>
              {list.map(({ region, todo, pending, completed, pendingWith, inProgressWith, total }: any) => (
                <div className={styles.item} key={region}>
                  <Row gutter={15}>
                    <Col span={2}>
                      {/* <span className={styles.center}> */}
                        <Icon style={{ fontSize: "24px" }} component={configIcon?.[region]} />
                      {/* </span> */}
                    </Col>
                    <Col span={20} className={styles.progressWrap}>
                      <div className={styles.desp}>
                        {/* formatMessageApi({ DropDown_COM_Region: region }) */}
                        <span className={styles.region}>{region}</span>
                        <span className={styles.pending}>Pending({pending})</span>
                        <span className={styles.inProgress}>In Progress({todo})</span>
                        <span className={styles.completed}>Completed({completed})</span>
                      </div>
                      <div className={styles.progress}>
                        <span className={styles.pending} style={{ width: pendingWith + '%' }} />
                        <span className={styles.inProgress} style={{ width: pendingWith + inProgressWith + '%' }} />
                        <span className={styles.completed} />
                      </div>
                    </Col>
                    <Col span={2}>
                      ({total})
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </div>
          <Tabs list={list} />
        </div>
      </Col>
      <Col span={6} />
      <Col span={6} />
    </Row>
  );
}

export default Summary
