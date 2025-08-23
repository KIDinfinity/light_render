import React, { useEffect } from 'react';
import { useDispatch, connect, useSelector } from 'dva';
import { Collapse, List } from 'antd';
import lodash from 'lodash';
import HistoryListItem from 'bpm/pages/Information/complex/HistoryListItem';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';
import useExpanderController from 'navigator/hooks/useExpanderController';
import CommonEmpty from '@/components/Empty';
import AuditLog from './AuditLog';
import Count from '@/components/Count';
import styles from './ContentList.less';
import wrapStyles from './styles/wrap.less';
import useHistoryExpenderOff from 'bpm/pages/Information/_hooks/useHistoryExpenderOff';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';

const { Panel } = Collapse;

function ContentList(props: any) {
  const {
    saveHistoryActiveKey,
    allCategoryHistory,
    categoryCode,
    activityHistoryPanel: activeKey,
    readData,
    isAssinee,
    auditList,
  } = props;

  const dispatch = useDispatch();
  const triggerActiveTab = useSelector((state) => state.workspaceSwitchOn.triggerActiveTab);
  const setActiveKey = (keys) => {
    dispatch({
      type: 'navigatorInformationController/setActivityHistoryPanel',
      payload: {
        activityHistoryPanel: keys,
      },
    });
  };
  const { isExpanderSwitchOn } = useExpanderController();
  useHistoryExpenderOff({ isExpanderSwitchOn });
  useEffect(() => {
    // 点击已读未读的时候，history中原有的折叠板的展示状态保持不变
    if (saveHistoryActiveKey) {
      dispatch({
        type: 'navigatorInformationController/saveHistoryActiveKey',
        payload: {
          saveHistoryActiveKey: false,
        },
      });
    }
  }, [categoryCode]);
  const onChange = (keys: string[]) => {
    dispatch({
      type: 'navigatorInformationController/setActivityHistoryItem',
      payload: {
        activityHistoryItem: lodash.last(keys),
      },
    });
    dispatch({
      type: 'navigatorInformationController/setExpenderContentModel',
      payload: {
        expenderModel: 'history',
      },
    });
    setActiveKey(keys);
  };

  useEffect(() => {
    if (
      triggerActiveTab &&
      lodash.find(allCategoryHistory, { categoryCode: triggerActiveTab }) &&
      lodash.size(activeKey) === 0
    ) {
      onChange([triggerActiveTab]);
      dispatch({
        type: 'workspaceSwitchOn/saveTriggerActiveTab',
        payload: {
          triggerActiveTab: '',
        },
      });
    }
  }, [triggerActiveTab, activeKey, allCategoryHistory]);

  const renderContent = (item: any) => {
    return item.informationList && item.informationList.length > 0 ? (
      <List
        itemLayout="horizontal"
        dataSource={item.informationList}
        className={styles.historyList}
        renderItem={(children, index) => (
          <HistoryListItem
            item={children}
            activeKey={activeKey}
            index={index}
            categoryCode={item.categoryCode}
          />
        )}
      />
    ) : (
      <CommonEmpty />
    );
  };

  const showUnRead = (data: any) => {
    if (lodash.includes(activeKey, data.categoryCode) || !isAssinee) {
      return false;
    }

    return (
      !lodash.includes(activeKey, data.categoryCode) &&
      lodash
        .chain(data?.informationList || [])
        .reduce((show: any, { informationDOList = [] }: any) => {
          let newShow = show;
          informationDOList.forEach((doItem: any) => {
            if (
              doItem?.content &&
              !lodash.includes(readData[ESubjectType.INFORMATION], doItem.id)
            ) {
              newShow = true;
            }
          });

          return newShow;
        }, false)
        .value()
    );
  };

  return (
    <Collapse
      activeKey={activeKey}
      defaultActiveKey={activeKey}
      // accordion={true}
      className={styles.allCategroyCollapse}
      onChange={(keys) => onChange(keys)}
      bordered={false}
    >
      {lodash.map(allCategoryHistory, (item: any) => {
        return (
          <Panel
            key={`${item.categoryCode}`}
            header={
              <Read
                type={EType.ITEM}
                subjectType={ESubjectType.INFORMATION}
                id={item.id}
                forbiClick
                show={showUnRead(item)}
              >
                <Count
                  title={formatMessageApi({
                    category: item.categoryCode,
                  })}
                  loading={false}
                  length={item.informationList.length}
                />
              </Read>
            }
            className={classNames(styles.panelWrap, styles.scrollWrap)}
          >
            <div className={classNames(wrapStyles.wrapper, styles.allCategoryWrap)}>
              {renderContent(item)}
            </div>
          </Panel>
        );
      })}
      <Panel
        key="auditLog"
        header={formatMessageApi({
          category: 'auditLog',
        })}
      >
        <AuditLog isExpanderSwitchOn={isExpanderSwitchOn} />
      </Panel>
    </Collapse>
  );
}

export default connect(({ navigatorInformationController, solutionRead }: any) => ({
  saveHistoryActiveKey: navigatorInformationController?.saveHistoryActiveKey,
  allCategoryHistory: navigatorInformationController?.allCategoryHistory,
  categoryCode: formUtils.queryValue(navigatorInformationController?.informationData?.categoryCode),
  activityHistoryPanel: navigatorInformationController?.activityHistoryPanel,
  readData: solutionRead?.readData || {},
  isAssinee: solutionRead?.isAssinee || false,
}))(ContentList);
