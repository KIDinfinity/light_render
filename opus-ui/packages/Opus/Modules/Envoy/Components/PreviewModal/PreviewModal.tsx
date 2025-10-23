import React, { useEffect, useMemo, useState } from 'react';
import { Button, Icon, Modal, Tabs, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import styles from './PreviewModal.less';
import EnvoyInput from '../EnvoyInput';
import { ReactComponent as PreviewSvg } from '../../Assets/preview.svg';
import ViewerEnclosure from './ViewerEnclosure';

const { TabPane } = Tabs;
const { Option } = Select;

export default () => {
  const dispatch = useDispatch();

  const {
    previewModeData,
    previewModeShow,
    previewEnclosure,
    EnclosureDataLoading,
    preivewModeDataLoading,
  } = useSelector(({ envoyController, loading }: any) => ({
    previewModeData: envoyController.previewModeData,
    previewModeShow: envoyController.previewModeShow,
    previewEnclosure: envoyController.previewEnclosure,
    EnclosureDataLoading: loading.effects['envoyController/getEnclosureData'],
    preivewModeDataLoading: loading.effects['envoyController/getPreivewModeData'],
  }));
  const tabList =
    lodash
      .chain(previewModeData)
      .entries()
      .map(([key, value]) => {
        return {
          key,
          title: value?.title,
        };
      })
      .value() || [];
  const [titleTab, setTitleTab] = useState();
  const [fullName, setFullName] = useState();

  useEffect(() => {
    setTitleTab(tabList?.[0]?.key);
    lodash
      .chain(previewModeData)
      .entries()
      .forEach(async ([key, item]) => {
        lodash.forEach(item?.letters, (letter, index) => {
          if (!lodash.isEmpty(letter.originalSendParam)) {
            dispatch({
              type: 'envoyController/getEnclosureData',
              payload: {
                originalSendParam: letter.originalSendParam,
                id: key,
                letterIndex: index,
                title: item.title,
              },
            });
          }
        });
      })
      .value();
  }, [previewModeData]);

  const confirmationCancel = () => {
    dispatch({
      type: 'envoyController/changePreivewModeShow',
      payload: {
        show: false,
      },
    });
    dispatch({
      type: 'envoyController/clearPreivewModeData',
      payload: {
        show: false,
      },
    });

    setFullName('');
  };
  const fullNameList = useMemo(() => {
    const fullNameMap = new Map();
    lodash
      .chain(previewEnclosure)
      .entries()
      .forEach(([key, value]) => {
        fullNameMap.set(key, lodash.flattenDeep(value));
      })
      .value();
    return Object.fromEntries(fullNameMap);
  }, [previewEnclosure, titleTab]);

  return (
    <div>
      <Modal
        className={styles.modal}
        width={1230}
        closable={false}
        centered
        visible={previewModeShow}
        title={
          <span className={styles.modalTitle}>
            <Icon component={PreviewSvg} className={styles.titleIcon} />
            <span>
              {formatMessageApi({
                Label_Sider_Envoy: 'PreviewLetter',
              })}
            </span>
          </span>
        }
        onCancel={confirmationCancel}
        footer={[
          <Button key="Cancel" type="primary" onClick={confirmationCancel}>
            {formatMessageApi({
              Label_BPM_Button: 'Close',
            })}
          </Button>,
        ]}
      >
        {EnclosureDataLoading || preivewModeDataLoading ? (
          <Spin size="large" style={{ display: 'block' }} />
        ) : (
          <>
            {lodash.size(tabList) > 1 && (
              <Tabs
                defaultActiveKey={titleTab}
                activeKey={titleTab}
                onChange={(key) => {
                  setTitleTab(key);
                  setFullName('');
                }}
              >
                {lodash.map(tabList || [], (tab: any) => {
                  return <TabPane tab={tab?.title} key={tab?.key} />;
                })}
              </Tabs>
            )}
            <EnvoyInput
              title={formatMessageApi({ Label_Sider_Envoy: 'selectPendingLetter' })}
              className={styles.input}
            >
              <Select
                value={fullName}
                style={{ width: '100%' }}
                onChange={(value) => setFullName(value)}
              >
                {titleTab &&
                  lodash.map(fullNameList[titleTab], (item) => (
                    <Option value={item?.fileCacheId}>{item?.fileFullName}</Option>
                  ))}
              </Select>
            </EnvoyInput>
            {fullName && titleTab && (
              <ViewerEnclosure
                fileCacheId={fullName}
                fileFullName={
                  lodash.find(fullNameList[titleTab], (item) => item?.fileCacheId === fullName)
                    ?.fileFullName
                }
              />
            )}
          </>
        )}
      </Modal>
    </div>
  );
};
