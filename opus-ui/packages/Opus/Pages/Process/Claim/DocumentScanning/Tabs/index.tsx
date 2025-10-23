import React from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { Tabs } from 'opus/Components/Antd';
import { useDispatch, useSelector } from 'dva';
import Buttons from 'opus/Components/Buttons';
import { handleWarnMessageModal } from '@/utils/commonMessage';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../activity.config';

import NewRequestClaimPackReturn from '../NewRequestClaimPackReturn';

import NewRequest from '../NewRequest';
import Document from '../Document';
import PendingDocument from '../PendingDocument';

import styles from './index.less';

const Main = () => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const { type, claimProcessData } =
    useSelector(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData) || {};

  // 为了以后不同region显示不同的内容
  const config = {
    default: [
      {
        key: 'NewRequestClaimPackReturn',
        title: 'newRequestClaimPackReturn',
        component: <NewRequestClaimPackReturn item={claimProcessData?.[0]} />,
      },
      {
        key: 'NewRequest',
        title: 'newRequest',
        component: <NewRequest item={claimProcessData?.[0]} />,
      },
      {
        key: 'PendingDocument',
        title: 'PendingDocument',
        component: <PendingDocument item={claimProcessData?.[0]} />,
      },
    ],
  };
  const handleUpload = () => {
    dispatch({
      type: `${NAMESPACE}/uploadDocumentsVisible`,
      payload: {
        type,
      },
    });
  };

  const handleOCRResult = () => {
    dispatch({
      type: `${NAMESPACE}/ocrResultVisible`,
    });
  };

  const operations = (_editable: boolean) => (
    <div className={styles.operations}>
      <div className={styles.OCRButton}>
        <Buttons.OCRResult
          disabled={
            !claimProcessData?.[0]?.ocrResultList ||
            claimProcessData?.[0]?.ocrResultList?.length === 0
          }
          handleClick={handleOCRResult}
        />
      </div>
      {_editable ? (
        <div className={styles.uploadButton}>
          <Buttons.Upload disabled={!editable} handleClick={handleUpload} />
        </div>
      ) : null}
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onChangeTabs = async (type) => {
    if (type) {
      await dispatch({
        type: `${NAMESPACE}/savaType`,
        payload: {
          type,
        },
      });
      await dispatch({
        type: `${NAMESPACE}/claimProcessDataRemove`,
      });
    }
  };

  return (
    <div className={classNames(styles.tabsWrap, !editable && styles.tabWrapDisabled)}>
      <Tabs
        activeKey={type}
        tabBarExtraContent={operations(editable)}
        onChange={async (type: any) => {
          if (lodash.isEmpty(claimProcessData?.[0])) {
            await onChangeTabs(type);
          } else {
            handleWarnMessageModal(
              [
                {
                  content: formatMessageApi({
                    Label_COM_WarningMessage: 'MSG_001167',
                  }),
                },
              ],
              {
                okFn: async () => {
                  await onChangeTabs(type);
                },
                cancelFn: () => {},
              }
            );
          }
        }}
      >
        {lodash.map(config?.default || [], ({ key, title, component }: any) => (
          <Tabs.TabPane
            tab={formatMessageApi({
              Label_CLM_Opus: title,
            })}
            key={key}
          >
            <div className={styles.itemWrap} key={key}>
              {component}
              <Document />
            </div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
export default Main;
