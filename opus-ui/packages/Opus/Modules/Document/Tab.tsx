import React from 'react';
import { useDispatch } from 'dva';
import { Tabs } from 'antd';
import styles from './styles.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

const { TabPane } = Tabs;

export default () => {
  // const { showType } = useSelector(({ documentManagement }: any) => ({
  //   showType: documentManagement.showType,
  // }));
  const dispatch = useDispatch();

  // const handleChangeType = (type: string) => {
  //   if (type === showType) return;
  //   dispatch({
  //     type: 'documentManagement/saveState',
  //     payload: {
  //       showType: type,
  //       fileObject: {},
  //       selectedDocId: '',
  //     },
  //   });

  //   dispatch({
  //     type: 'documentManagement/changeSelectdData',
  //     payload: {
  //       type: 'clear',
  //     },
  //   });
  // };

  const saveViewActived = (key: any) => {
    dispatch({
      type: 'documentManagement/saveViewActived',
      payload: {
        viewActived: key === 'viewAll' ? true : false,
      },
    });
  };

  const tabList = (() => {
    return tenant.region({
      // [Region.JP]: {
      //   onChange: handleChangeType,
      //   TabPane: [
      //     {
      //       tab: formatMessageApi({
      //         Label_BPM_Button: 'View by Case No.',
      //       }),
      //       key: 'caseNo',
      //     },
      //     {
      //       tab: formatMessageApi({
      //         Label_BPM_Button: 'View by Business No.',
      //       }),
      //       key: 'businessNo',
      //     },
      //   ],
      // },
      notMatch: {
        onChange: saveViewActived,
        TabPane: [
          {
            tab: formatMessageApi({
              Label_BPM_Button: 'ViewValidDocuments',
            }),
            key: 'viewValid',
          },
          {
            tab: formatMessageApi({
              Label_BPM_Button: 'viewAll',
            }),
            key: 'viewAll',
          },
        ],
      },
    });
  })();

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={tabList?.onChange} className={styles.Tabs}>
        {lodash.map(tabList?.TabPane || [], (tabItem: any) => (
          <TabPane tab={tabItem.tab} key={tabItem.key} />
        ))}
      </Tabs>
    </>
  );
};
