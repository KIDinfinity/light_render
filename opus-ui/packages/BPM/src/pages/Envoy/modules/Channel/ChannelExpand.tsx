import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Tabs, Form, Checkbox } from 'antd';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from 'bpm/pages/Envoy/EnvoyList/MapComponent';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './ChannelExpand.less';
import ChannelTpl from '../ChannelTpl/ChannelTpl';
import classnames from 'classnames';

const { TabPane } = Tabs;

export default function Channel({ editable, data, type, remindersData, enableReminder }: any) {
  const dispatch = useDispatch();
  const { globalEditAuth, errorInfo, viewChannel } = useSelector(
    (state: any) => ({
      globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
      errorInfo: lodash.get(state.envoyController, 'errorInfo'),
      viewChannel: state.envoyController?.viewChannel,
    }),
    shallowEqual
  );

  const {
    groupId,
    id,
    envoyAuth,
    status,
    channelDataList,
    defaultChannel,
    displayConfig,
  } = lodash.pick(data, [
    'envoyAuth',
    'status',
    'groupId',
    'id',
    'channelDataList',
    'defaultChannel',
    'displayConfig',
  ]);
  const mapDisabled = {
    reason: notAuthOrDraftReason({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      status,
    }),
    reminder: notAuthOrActivate({
      globalAuth: globalEditAuth,
      selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
      remindersData,
      enableReminder,
      reminderData: data,
    }),
  };
  const disabled = !editable || mapDisabled[type];

  const changeViewChannel = (channel: string) => {
    dispatch({
      type: 'envoyController/setViewChannel',
      payload: {
        viewChannel: channel,
      },
    });
  };
  useEffect(() => {
    changeViewChannel(defaultChannel);
  }, [defaultChannel]);

  const setEnabelChannel = async (channelArr: string[]) => {
    if (type === EDataType.REASON) {
      dispatch({
        type: 'envoyController/saveReasonEnabelChannel',
        payload: {
          groupId,
          reasonId: id,
          enabelArr: channelArr,
        },
      });
    } else {
      dispatch({
        type: 'envoyController/saveReminderEnabelChannel',
        payload: {
          groupId,
          reminderId: id,
          enabelArr: channelArr,
        },
      });
    }
    dispatch({
      type: 'envoyController/validateFields',
      payload: {
        dataId: groupId,
      },
    });
  };
  const initEanbelChannel = lodash
    .chain(channelDataList)
    ?.filter((item: any) => item.enable)
    ?.map((item: any) => item.channel)
    .value();

  const currentChannelData = channelDataList.find(
    (channelData) => channelData?.channel === viewChannel
  );

  const currentSortModule =
    currentChannelData &&
    getSortModuleArr(
      lodash.get(displayConfig, `channelContent.children.${currentChannelData?.channel}`)
    )?.find((module) => module?.moduleName === 'channelTpl');
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {formatMessageApi({ Label_Sider_Envoy: 'Delivery Method' })}
      </div>
      <div style={{ display: 'flex' }}>
        <div className={styles.leftSection}>
          <Checkbox.Group
            defaultValue={initEanbelChannel}
            onChange={(value) => {
              setEnabelChannel(value);
            }}
          >
            {channelDataList.map((item) => (
              <Checkbox
                value={item?.channel}
                key={item?.channel}
                onMouseEnter={() => {
                  changeViewChannel(item?.channel);
                }}
              >
                <span
                  className={classnames({
                    [styles.channel]: true,
                    [styles.channelSelected]: !!item?.channel && item?.channel === viewChannel,
                  })}
                >
                  {formatMessageApi({
                    Label_BPM_Button: `app.navigator.drawer.pending.button.${item?.channel}`,
                  })}
                </span>
              </Checkbox>
            ))}
          </Checkbox.Group>
        </div>
        <div style={{ flex: 1 }}>
          {lodash.map(channelDataList, (channel: any, channelIdx: number) => {
            const { channel: channelType, enable } = channel;
            const sortModuleArr = getSortModuleArr(
              lodash.get(displayConfig, `channelContent.children.${channelType}`)
            );

            return (
              <Form>
                {lodash
                  .chain(sortModuleArr)
                  .filter((item: any) => {
                    const Component = MapComponent[item?.moduleName];
                    return !!Component && item?.moduleName !== 'channelTpl';
                  })
                  .map((item: any, idx: number) => {
                    const Component = MapComponent[item?.moduleName];
                    return (
                      <div key={idx} className={classnames(styles.section, styles.infoSection)}>
                        <Component
                          editable={item?.editable}
                          data={data}
                          type={type}
                          remindersData={remindersData}
                          enableReminder={enableReminder}
                          channel={channel}
                          channelIdx={channelIdx}
                          isExpand={true}
                        />
                      </div>
                    );
                  })
                  .value()}
              </Form>
            );
          })}
        </div>
      </div>
      <div className={styles.section}>
        {currentChannelData && (
          <ChannelTpl
            editable={currentSortModule?.editable}
            data={data}
            type={type}
            remindersData={remindersData}
            enableReminder={enableReminder}
            channel={currentChannelData}
            channelIdx={channelDataList.indexOf(currentChannelData)}
            isExpand={true}
          />
        )}
      </div>
    </div>
  );
}
