import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { isEmpty, cloneDeep } from 'lodash';
import Header from './Header';
import SlideBar from './SlideBar';
import Content from './Content';
import styles from './index.less';
import PreviewModal from './Model/PreviewModal';
import { useLocation, useNavigate } from 'umi';

const ReportCenter: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      let state = cloneDeep(location.state);
      const search = location.search;

      if (!state) {
        const params = new URLSearchParams(search);
        const stateKey = params.get('stateKey');
        const stateInSession = sessionStorage.getItem(`venus-ui_dashboard_state_${stateKey}`);

        if (stateInSession) {
          try {
            state = JSON.parse(stateInSession);
            navigate(`/navigator/reportcenter?stateKey=${stateKey}`, {
              state,
            });
          } catch (err) {
            console.error(err);
          }
        }
      }

      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: false,
        },
      });

      await dispatch({
        type: 'reportCenterController/getListReports',
        callback: () => {
          if (!isEmpty(state)) {
            setTimeout(() => {
              document.querySelector(`#${state?.linkedReportCode}`)?.scrollIntoView();
            }, 10);
          }
        },
      });

      if (!isEmpty(state)) {
        await dispatch({
          type: 'reportCenterController/saveActiveTabInfo',
          payload: {
            activeTabKey: state?.linkedReportCode || '',
          },
        });

        dispatch({
          type: 'reportCenterController/findReportMetadata',
          payload: {
            state: {
              ...state,
              reportCode: state?.linkedReportCode,
              tempReportCode: state?.originalLinkedReportCode || '',
            },
          },
        });
      }

      dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: ['Dropdown_CFG_StatisticType'],
      });
    };

    init();

    return () => {
      dispatch({
        type: 'global/changeLayoutHeader',
        payload: {
          isShowHeader: true,
        },
      });
      dispatch({
        type: 'reportCenterController/clear',
      });
    };
  }, [dispatch, location]);

  return (
    <div className={styles.report}>
      <Header />
      <div className={styles.main}>
        <SlideBar />
        <Content />
        <PreviewModal />
      </div>
    </div>
  );
};

export default ReportCenter;
