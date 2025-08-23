import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { Form, Select, Input, DatePicker } from 'antd';
import ItemCard from 'bpm/pages/Envoy/components/ItemCard/ItemCard';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import getIsRequired from 'bpm/pages/Envoy/_utils/getIsRequired';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import styles from './index.less';

const Policy = ({ editable, data }: any) => {
  const { groupId, id, policy: policyData, reasonCode, claimNo, status } = data;
  const [searchValue, setSearchValue] = useState('');
  const claimLetterReasonCode = ['DE01.00', 'DE06.01'];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'envoyController/getThPendPolicyReasonsData',
      payload: {
        reasonCode,
      },
    });
    dispatch({
      type: 'envoyController/getPolicyNoInfo',
    });
  }, [reasonCode, claimNo]);
  const globalEditAuth = useSelector(
    (state: any) => lodash.get(state.authController, EGlobalAuthCode.EDIT),
    shallowEqual
  );

  const thPendPolicyReasonInfo = useSelector(
    (state: any) => lodash.get(state, `envoyController.thPendPolicyReasonInfo[${reasonCode}]`),
    shallowEqual
  );
  const errorInfo = useSelector(
    (state: any) => lodash.get(state, 'envoyController.errorInfo'),
    shallowEqual
  );

  const policyNoInfo = useSelector(
    (state: any) => lodash.get(state, `envoyController.policyNoInfo[${claimNo}]`),
    shallowEqual
  );

  const loading = useSelector(
    (state: any) => state.loading.effects['envoyController/getPolicyDataByReason']
  );

  const saveReasonPolicy = useCallback(
    (name: string, value: any) => {
      dispatch({
        type: 'envoyController/saveReasonPolicy',
        payload: {
          groupId,
          dataId: id,
          name,
          value,
        },
      });
    },
    [groupId, id]
  );

  const updatePolicyDateByReason = useCallback(
    (value: string[], idx: number) => {
      if (claimLetterReasonCode.includes(lodash.last(value))) {
        dispatch({
          type: 'envoyController/getPolicyDataByReason',
          payload: {
            groupId,
            dataId: id,
            name: `policy{${idx}}_date`,
            value,
          },
        });
      }
      if (
        claimLetterReasonCode.includes(value?.[0]) &&
        !claimLetterReasonCode.includes(lodash.last(value))
      ) {
        saveReasonPolicy(`policy{${idx}}_date`, '');
      }
    },
    [groupId, id]
  );

  const addReasonPolicy = useCallback(() => {
    dispatch({
      type: 'envoyController/addReasonPolicy',
      payload: {
        groupId,
        dataId: id,
      },
    });
  }, [groupId, id]);
  const delReasonPolicy = useCallback(
    (idx: string) => {
      dispatch({
        type: 'envoyController/delReasonPolicy',
        payload: {
          groupId,
          dataId: id,
          policyIdx: idx,
        },
      });
    },
    [groupId, id]
  );

  const allReasonList = useMemo(() => {
    return lodash.reduce(
      policyData,
      (result: any[], value: any) => {
        const reasonList = value?.reasonList[0];
        if (lodash.isArray(result) && reasonList !== 'OTHER') {
          result.push(reasonList);
        }
        return result;
      },
      []
    );
  }, [policyData]);
  const envoyAuth = lodash.get(data, 'envoyAuth');
  const disabled = useMemo(() => {
    return (
      !editable ||
      notAuthOrDraftReason({
        globalAuth: globalEditAuth,
        selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
        status,
      })
    );
  }, [globalEditAuth, envoyAuth, status, editable]);

  return (
    <ItemCard
      handleDel={lodash.get(policyData, 'length') > 1 ? delReasonPolicy : null}
      handleAdd={addReasonPolicy}
      disabled={disabled}
    >
      {lodash.map(policyData, (item: any, idx: number) => {
        const reasonListValArr = item?.reasonList;
        const reasonListErrors = lodash.get(findObj(errorInfo, id), `policy{${idx}}_reasonList`);
        const otherReasonErrors = lodash.get(findObj(errorInfo, id), `policy{${idx}}_otherReason`);
        const dateErrors = lodash.get(findObj(errorInfo, id), `policy{${idx}}_date`);
        const { requiredDate, requiredOtherReason } = getIsRequired(
          thPendPolicyReasonInfo,
          reasonListValArr
        );
        let reasonOptions = thPendPolicyReasonInfo;
        if (searchValue) {
          reasonOptions = lodash.filter(thPendPolicyReasonInfo, (reasonItem: any) => {
            return lodash.includes(lodash.toLower(reasonItem?.name), lodash.toLower(searchValue));
          });
        }
        return (
          <div key={idx} className={styles.policyItem}>
            <Form.Item
              label={
                <>
                  {reasonListErrors?.length ? <LabelTip title={reasonListErrors} /> : null}
                  {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.reason' })}
                </>
              }
              required
            >
              <Select
                loading={loading}
                name={`policy{${idx}}_reasonList`}
                mode="multiple"
                disabled={disabled}
                value={item?.reasonList}
                onChange={(value: string[]) => {
                  saveReasonPolicy(`policy{${idx}}_reasonList`, value);
                  updatePolicyDateByReason(value, idx);
                  setSearchValue('');
                }}
                onSearch={(value) => {
                  setSearchValue(value);
                }}
                filterOption={false}
                onBlur={() => {
                  setSearchValue('');
                }}
              >
                {lodash.map(reasonOptions, (reasonItem: any) => (
                  <Select.Option
                    className={classNames({
                      [styles.hideOption]: lodash.includes(allReasonList, reasonItem?.code),
                    })}
                    value={reasonItem?.code}
                    key={reasonItem?.code}
                  >
                    {reasonItem?.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {requiredOtherReason ? (
              <Form.Item
                label={
                  <>
                    {otherReasonErrors?.length ? <LabelTip title={otherReasonErrors} /> : null}
                    {formatMessageApi({ Label_Sider_Envoy: 'OtherReason' })}
                  </>
                }
                required
              >
                <div className={styles.textArea}>
                  <Input.TextArea
                    name={`policy{${idx}}_otherReason`}
                    mode="multiple"
                    maxLength={300}
                    disabled={disabled}
                    value={item?.otherReason}
                    onChange={(ev: any) =>
                      saveReasonPolicy(`policy{${idx}}_otherReason`, ev.target?.value)
                    }
                    onBlur={(ev: any) =>
                      saveReasonPolicy(`policy{${idx}}_otherReason`, lodash.trim(ev.target?.value))
                    }
                  />
                </div>
              </Form.Item>
            ) : null}
            <Form.Item label="Correspondence Remark">
              <div className={styles.textArea}>
                <Input.TextArea
                  name={`policy{${idx}}_correspondenceRemark`}
                  mode="multiple"
                  maxLength={300}
                  disabled={disabled}
                  value={item?.correspondenceRemark}
                  onChange={(ev: any) =>
                    saveReasonPolicy(`policy{${idx}}_correspondenceRemark`, ev.target.value)
                  }
                />
              </div>
            </Form.Item>
            <Form.Item label={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}>
              <Select
                className={styles.role}
                name={`policy{${idx}}_policyList`}
                mode="multiple"
                disabled={disabled}
                value={item?.policyList}
                onChange={(value: string[]) => saveReasonPolicy(`policy{${idx}}_policyList`, value)}
              >
                {lodash.map(policyNoInfo, (dictItem: any) => (
                  <Select.Option value={dictItem?.dictCode} key={dictItem?.dictCode}>
                    {dictItem?.dictName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <>
                  {dateErrors?.length ? <LabelTip title={dateErrors} /> : null}
                  {formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.date' })}
                </>
              }
              required={requiredDate}
            >
              <DatePicker
                name={`policy{${idx}}_date`}
                allowClear={false}
                disabled={disabled || !requiredDate}
                disabledDate={(date) => moment(date).isAfter(moment(new Date()), 'days')}
                value={item?.date !== '' ? moment(item?.date) : ''}
                onChange={(value: any) =>
                  saveReasonPolicy(`policy{${idx}}_date`, moment(value).format())
                }
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </div>
        );
      })}
    </ItemCard>
  );
};

export default Policy;
