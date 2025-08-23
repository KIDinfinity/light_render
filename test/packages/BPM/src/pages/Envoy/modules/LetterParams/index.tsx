import React from 'react';
import Editor from 'basic/components/Editor';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
interface IProps {
  paramsData: any;
  channelDisplayConfig: any;
  channel: string;
  groupId: string;
  dataId: string;
}

export default (props: IProps) => {
  const { paramsData, channelDisplayConfig, channel, groupId, dataId } = props;

  const templateParams = lodash.chain(paramsData).get('content.params').value();

  const dispatch = useDispatch();
  const labelMapping = {
    remarkInLetter: {
      labelTypeCode: 'Label_Sider_Envoy',
      labelDictCode: 'RemarkInLetter',
    },
  };
  return (
    <>
      {lodash
        .chain(templateParams)
        .filter(() => {
          const visible = lodash.get(channelDisplayConfig, `channelTpl.visible`);
          return visible;
        })
        .sortBy(['sort'])
        .map((item: any, index: number) => {
          const { value, name } = item;
          const { labelTypeCode, labelDictCode } = lodash
            .chain(labelMapping)
            .get(name)
            .pick(['labelTypeCode', 'labelDictCode'])
            .value();
          return (
            <div key={index} className={styles.container}>
              <div className={styles.label}>
                {formatMessageApi({
                  [labelTypeCode]: labelDictCode,
                })}
              </div>
              <Editor
                value={value}
                placeholder={'Remark in Letter'}
                onChange={(newValue: string) => {
                  dispatch({
                    type: 'envoyController/saveTemplateParams',
                    payload: {
                      name,
                      value: newValue,
                      channel,
                      groupId,
                      dataId,
                      channelId: paramsData?.id,
                    },
                  });
                }}
              />
            </div>
          );
        })
        .value()}
    </>
  );
};
