import React from 'react';
import { useDispatch, connect } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import styles from './ContentListShrink.less';
import useHistoryExpenderOn from 'bpm/pages/Information/_hooks/useHistoryExpenderOn';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';

const ContentListShrink = (props: any) => {
  const { allCategoryHistory, activityHistoryItem, expenderModel, readData, isAssinee } = props;
  const { isExpanderSwitchOn } = useExpanderController();
  const dispatch = useDispatch();

  const loadHistoryExpander = (categoryCode: any) => {
    dispatch({
      type: 'navigatorInformationController/setActivityHistoryItem',
      payload: {
        activityHistoryItem: categoryCode,
      },
    });
    dispatch({
      type: 'navigatorInformationController/setExpenderContentModel',
      payload: {
        expenderModel: 'history',
      },
    });
  };
  useHistoryExpenderOn({ isExpanderSwitchOn });

  const showUnRead = (data: any) => {
    if (!isAssinee) {
      return false;
    }

    return lodash
      .chain(data?.informationList || [])
      .reduce((show: any, { informationDOList = [] }: any) => {
        let newShow = show;
        informationDOList.forEach((doItem: any) => {
          if (!lodash.includes(readData[ESubjectType.INFORMATION], doItem.id)) {
            newShow = true;
          }
        });

        return newShow;
      }, false)
      .value();
  };
  return (
    <div className={styles.wrap}>
      {lodash.map(allCategoryHistory, (item: any, index: number) => {
        return (
          <div
            onClick={() => loadHistoryExpander(item?.categoryCode)}
            key={`${item?.categoryCode}_${index}`}
            className={classNames(styles.content, {
              [styles.selected]:
                !showUnRead(item) &&
                activityHistoryItem === item?.categoryCode &&
                expenderModel === 'history',
            })}
          >
            <Read
              type={EType.ITEM}
              subjectType={ESubjectType.INFORMATION}
              id={item.id}
              forbiClick
              show={showUnRead(item)}
            >
              {formatMessageApi({
                category: item?.categoryCode,
              })}
            </Read>
          </div>
        );
      })}
      <div
        onClick={() => loadHistoryExpander('auditLog')}
        key="auditLog"
        className={classNames(
          styles.content,
          activityHistoryItem === 'auditLog' ? styles.selected : null
        )}
      >
        {formatMessageApi({
          category: 'auditLog',
        })}
      </div>
    </div>
  );
};

export default connect(({ navigatorInformationController, solutionRead }: any) => ({
  allCategoryHistory: navigatorInformationController?.allCategoryHistory,
  defaultKey: navigatorInformationController?.defaultKey,
  activityHistoryItem: navigatorInformationController?.activityHistoryItem,
  expenderModel: navigatorInformationController?.expenderModel,
  readData: solutionRead?.readData || {},
  isAssinee: solutionRead?.isAssinee || false,
}))(ContentListShrink);
