import React from 'react';
import { useSelector, useDispatch,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Card, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as expend } from 'bpm/assets/information-expend.svg';
import HistoryTabs from 'bpm/pages/Information/complex/HistoryTabs';
import useExpanderController from 'navigator/hooks/useExpanderController';
import useGetIsShowFoldButton from 'bpm/pages/Information/_hooks/useGetIsShowFoldButton';
import ContentList from './ContentList';
import ContentListShrink from './ContentListShrink';
import Count from '@/components/Count';
import styles from './index.less';

const InformationHistory = ({ authInfoVisible }: any) => {
  const dispatch = useDispatch();

  const allCategoryHistory = useSelector(
    (state: any) => state.navigatorInformationController.allCategoryHistory,
    shallowEqual
  );
  const loading = useSelector(
    (state: any) =>
      state.loading.effects['navigatorInformationController/loadAllCategoryInformation']
  );
  const { isExpanderSwitchOn } = useExpanderController();
  const tabExpendToggle = () => {
    dispatch({
      type: 'navigatorInformationController/setActivityHistoryPanel',
      payload: {
        activityHistoryPanel: [],
      },
    });
  };
  const showHistoryFoldButton =
    useGetIsShowFoldButton({
      isExpanderSwitchOn,
    }) && !isExpanderSwitchOn;
  return (
    <>
      {authInfoVisible && (
        <Card
          title={
            allCategoryHistory.length === 0 ? (
              <Count
                title={formatMessageApi({
                  Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history',
                })}
                loading={loading}
                length={allCategoryHistory.length}
              />
            ) : (
              formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.drawer.remark.title.history',
              })
            )
          }
          style={{ marginTop: 24 }}
          bordered={false}
          extra={
            showHistoryFoldButton && (
              <div onClick={() => tabExpendToggle()}>
                <Icon className={styles.expend} component={expend} />
              </div>
            )
          }
        >
          {!isExpanderSwitchOn && <HistoryTabs />}
          <div>
            {!isExpanderSwitchOn ? <ContentList loading={loading} /> : <ContentListShrink />}
          </div>
        </Card>
      )}
    </>
  );
};

InformationHistory.displayName = 'InformationHistory';

export default InformationHistory;
