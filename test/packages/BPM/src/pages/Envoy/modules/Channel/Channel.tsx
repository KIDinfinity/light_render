import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Tabs, Form } from 'antd';
import { EGlobalAuthCode, ESelfAuthCode, EDataType } from 'bpm/pages/Envoy/enum';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from 'bpm/pages/Envoy/EnvoyList/MapComponent';
import { notAuthOrDraftReason, notAuthOrActivate } from 'bpm/pages/Envoy/_utils/getDisabled';
import TabBar from 'bpm/pages/Envoy/modules/Channel/TabBar';
import LetterParams from 'bpm/pages/Envoy/modules/LetterParams';

const { TabPane } = Tabs;

export default function Channel({ editable, data, type, remindersData, enableReminder }: any) {
  const dispatch = useDispatch();
  const { globalEditAuth, errorInfo } = useSelector(
    (state: any) => ({
      globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
      errorInfo: lodash.get(state.envoyController, 'errorInfo'),
    }),
    shallowEqual
  );

  const { groupId, id, envoyAuth, status, channelDataList, defaultChannel, displayConfig } =
    lodash.pick(data, [
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

  const [viewChannel, setViewChannel] = useState(defaultChannel);
  const changeViewChannel = (channel: string) => {
    setViewChannel(channel);
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

  const notMcChannelList = lodash
    .chain(channelDataList)
    .filter((item) => item.channel !== 'mc')
    .value();
  const mcChannelData = lodash.find(channelDataList, (item) => item.channel === 'mc');
  return (
    <>
      <Tabs
        renderTabBar={() => (
          <TabBar
            viewChannel={viewChannel}
            setViewChannel={changeViewChannel}
            data={notMcChannelList}
            dataId={id}
            errorInfo={errorInfo}
            disabled={disabled}
            handleChangeChannel={setEnabelChannel}
          />
        )}
        activeKey={viewChannel}
      >
        {lodash.map(notMcChannelList, (channel: any, channelIdx: number) => {
          const { channel: channelType, enable } = channel;
          const sortModuleArr = getSortModuleArr(
            lodash.get(displayConfig, `channelContent.children.${channelType}`)
          );

          return (
            <TabPane key={channelType} disabled={!enable}>
              <Form layout="vertical">
                {lodash
                  .chain(sortModuleArr)
                  .filter((item: any) => {
                    const Component = MapComponent[item?.moduleName];
                    return !!Component;
                  })
                  .map((item: any, idx: number) => {
                    const Component = MapComponent[item?.moduleName];
                    return (
                      <div key={idx}>
                        <Component
                          editable={item?.editable}
                          data={data}
                          type={type}
                          remindersData={remindersData}
                          enableReminder={enableReminder}
                          channel={channel}
                          channelIdx={channelIdx}
                        />
                      </div>
                    );
                  })
                  .value()}
              </Form>
            </TabPane>
          );
        })}
      </Tabs>
      {mcChannelData && (
        <LetterParams
          paramsData={mcChannelData}
          channelDisplayConfig={lodash.get(displayConfig, `channelContent.children.mc`)}
          channel="mc"
          groupId={data?.groupId}
          dataId={data?.id}
        />
      )}
    </>
  );
}
