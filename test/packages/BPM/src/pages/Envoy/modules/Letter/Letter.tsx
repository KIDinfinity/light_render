import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { Form, Select } from 'antd';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { formatMessageApi, hasFormatMessageHTMLFn } from '@/utils/dictFormatMessage';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';

const { Option } = Select;

export default function Letter({ editable, data, item }: any) {
  const { groupId, id, envoyAuth, status, letterCode } = data;

  const { globalEditAuth } = useSelector((state: any) => ({
    globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
  }));

  const { errorInfo } = useSelector((state: any) => ({
    ...lodash.pick(state.envoyController, ['errorInfo']),
  }));

  const letterErrors = lodash.get(findObj(errorInfo, id), 'letter');

  const dispatch = useDispatch();
  const saveReasonLetter = (value: string) => {
    dispatch({
      type: 'envoyController/saveReasonLetter',
      payload: {
        groupId,
        dataId: id,
        value,
      },
    });
  };

  const getReasonText = (item: any): string => {
    return hasFormatMessageHTMLFn({
      Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item.code}`,
    })
      ? formatMessageApi({
          Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item.code}`,
        })
      : item?.letterType || '';
  };

  return (
    <Form.Item
      label={
        <>
          {letterErrors?.length ? <LabelTip title={letterErrors} /> : null}
          {formatMessageApi({
            Label_Sider_Envoy: 'LetterType',
          })}
        </>
      }
      required
    >
      <Select
        name="letter"
        value={letterCode}
        showSearch
        disabled={
          !editable ||
          notAuthOrDraftReason({
            globalAuth: globalEditAuth,
            selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
            status,
          })
        }
        onChange={saveReasonLetter}
        id="letterType"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {lodash.map(item?.dropDownList || [], (item: any, idx: number) => (
          <Option
            value={item?.letterCode}
            key={item?.letterCode || idx}
            title={getReasonText(item)}
          >
            {getReasonText(item)}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}
