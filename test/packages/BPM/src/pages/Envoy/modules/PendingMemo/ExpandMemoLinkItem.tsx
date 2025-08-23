import React, { useMemo, useCallback, useEffect } from 'react';
import { Form, Button, Select, Input, Tooltip } from 'antd';
import lodash from 'lodash';
import Received, { showReceive } from './Received';
import { useSelector, useDispatch } from 'dva';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { EMemoCode, EMemoStatus, EReasonStatus } from 'bpm/pages/Envoy/enum';
import styles from './pendingMemo.less';
import MedicalProvider from './MedicalProvider';
import { tenant, Region } from '@/components/Tenant';
import useGetShowMemoVisible from 'bpm/pages/Envoy/hooks/useGetShowMemoVisible';
import classnames from 'classnames';
import RequiredIcon from './RequiredIcon';
import useGetPendingMemoFieldsRequired from 'bpm/pages/Envoy/hooks/useGetPendingMemoFieldsRequired';
import getComponentChildrenWithString from '../../_utils/getComponentChildrenWithString.ts';

interface IProps {
  idx: number;
  disabled: boolean;
  receivedDisable: boolean;
  onDelete: Function;
  errorInfo: any;
  data: any;
  id?: string;
  onChangeReceived: Function;
  isDraft: boolean;
}

// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
export default ({
  id,
  idx,
  data,
  disabled,
  onDelete,
  errorInfo,
  onChangeReceived,
  receivedDisable,
}: IProps) => {
  const displayConfig: any = useGetShowMemoVisible({ displayConfig: data?.displayConfig });
  const fieldsRequired = useGetPendingMemoFieldsRequired({ displayConfig: data?.displayConfig });

  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
  const memoList: any[] = pendingMemoList?.filter(
    (item: any) => item?.memoStatus !== EMemoStatus.WAIVED
  );
  const listMemos =
    useSelector((state: any) => state.envoyController.listMemos[data?.reasonCode]) || [];
  const listMemoSubType = useSelector(
    (state: any) =>
      state.envoyController.listMemoSubType[data?.reasonCode]?.[pendingMemoList[`${idx}`]?.memoCode]
        ?.memoSubType
  );

  // 过滤掉同一个reason下已选择的，除了Free
  const { memoCode, memoStatus } = pendingMemoList[`${idx}`];
  const filterReason = lodash
    .chain(memoList)
    .filter((item: any) => item?.memoCode === memoCode && item?.id !== id)
    .map((item: any) =>
      lodash.compact(item?.pendingMemoSubInfoList?.map((subInfo) => subInfo?.subTypeCode) || [])
    )
    .flatten()
    .filter((otherSubTypeCode) => otherSubTypeCode && otherSubTypeCode !== EMemoCode.FREE)
    .value();

  // still not filter other reasons under same code, we will do it later
  const DictsReason: any[] = lodash.filter(
    listMemoSubType,
    (item: any) => !lodash.includes(filterReason, item?.reasonCode)
  );
  const memoCodeErrors = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_memoCode`
  );

  const memoDescErrors = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_memoDesc`
  );

  const dispatch = useDispatch();

  const saveReasonMemoCode = useCallback(
    async (name: string, value: any) => {
      dispatch({
        type: 'envoyController/saveReasonMemoCode',
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          names: [name],
          value,
        },
      });
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
    },
    [data, dispatch]
  );

  const saveLinkMemoCode = (name: string, value: any) => {
    dispatch({
      type: 'envoyController/saveLinkMemoCode',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        name,
        value,
        reasonCode: data?.reasonCode,
      },
    });

    dispatch({
      type: 'envoyController/validateFields',
      payload: {
        dataId: data?.groupId,
      },
    });
  };

  const saveReasonMemoDesc = (name: string, value: string) => {
    dispatch({
      type: 'envoyController/saveReasonMemoDesc',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        name,
        value,
      },
    });
  };

  const saveMemoReason = (idx, index, field, value: string) => {
    dispatch({
      type: 'envoyController/saveMemoReason',
      payload: {
        groupId: data?.groupId,
        dataId: data?.id,
        memoIdx: idx,
        index: index,
        field,
        value,
      },
    });

    dispatch({
      type: 'envoyController/validateFields',
      payload: {
        dataId: data?.groupId,
      },
    });
  };
  const isMultiple = data?.displayConfig.pendingMemo?.children?.subInfos?.multiple;

  useEffect(() => {
    if (
      data.status === EReasonStatus.DRAFT &&
      !pendingMemoList[`${idx}`]?.pendingMemoSubInfoList?.length
    ) {
      dispatch({
        type: 'envoyController/addMemoReason',
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          memoIdx: idx,
          value: '',
        },
      });
    }
  }, [pendingMemoList[`${idx}`]?.pendingMemoSubInfoList]);

  const memoCodeShowType = tenant.region({
    [Region.HK]: 'name',
    [Region.VN]: 'name',
    [Region.TH]: 'keyAndDesc',
    [Region.MY]: 'name',
    [Region.ID]: 'name',
    [Region.KH]: 'name',
    [Region.PH]: 'name',
    notMatch: 'both',
  });
  /* <div className={styles.creatorInfo}>
              <div className={styles.creator}>{creator}</div>
              <div className={styles.time}>{gmtCreate && moment(gmtCreate).format('L')}</div>
            </div> */
  const SelectFormItemOption = (item) => {
    const optionContent = (() => {
      if (memoCodeShowType === 'value') return item.memoCode;
      if (memoCodeShowType === 'both') return `${item.memoCode}-${item.memoName}`;
      if (memoCodeShowType === 'keyAndDesc') return `${item.memoCode}-${item.memoDesc}`;
      return item.memoName;
    })();
    return (
      <Select.Option
        value={item?.memoCode}
        key={item?.memoCode}
        className={styles.memoCodeMultipleLineDisplayOption}
      >
        <Tooltip title={optionContent}>
          <div title="">{optionContent}</div>
        </Tooltip>
      </Select.Option>
    );
  };
  return useMemo(
    () => (
      <Form>
        <div
          className={classnames({
            [styles.expandMemoRow]: true,
            [styles.clientSection]: true,
            [styles.withReceive]: showReceive({
              status: data?.status,
              disabled: receivedDisable,
              memoStatus,
            }),
          })}
        >
          <div className={styles.sectionLeftIndicator} />
          <div className={styles.expandedReceived}>
            {((!disabled && memoList?.length > 1) || !receivedDisable) &&
              memoStatus !== EMemoStatus.RECEIVED && (
                <Button
                  className={styles.delete}
                  icon="close"
                  size="small"
                  type="link"
                  onClick={() => onDelete(idx, id)}
                />
              )}
            <Received
              id={id}
              idx={idx}
              name="received"
              disabled={receivedDisable}
              status={data?.status}
              memoStatus={memoStatus}
              onChangeReceived={onChangeReceived}
            />
          </div>
          <Form.Item
            label={
              <div className={styles.label}>
                {memoCodeErrors?.length ? <LabelTip title={memoCodeErrors} /> : null}
                {formatMessageApi({ Label_Sider_Envoy: 'MemoCode' })}
                <RequiredIcon visible={fieldsRequired?.memoCode} />
              </div>
            }
          >
            <Select
              name={`pendingMemoList{${idx}}_memoCode`}
              required
              disabled={disabled}
              value={pendingMemoList[`${idx}`].memoCode}
              onChange={(value: string[]) => {
                saveLinkMemoCode(`pendingMemoList{${idx}}_memoCode`, value);
              }}
              allowClear
              showSearch
              filterOption={(input, option) =>
                String(getComponentChildrenWithString(option, 'children'))
                  .toLowerCase()
                  .indexOf(String(input).toLowerCase()) >= 0
              }
              optionLabelProp={tenant.isID() ? 'label' : 'value'}
              dropdownMatchSelectWidth={false}
              id="memoCode"
            >
              {lodash.map(listMemos, (item) => SelectFormItemOption(item))}
            </Select>
          </Form.Item>
          {displayConfig.medicalProvider && (
            <MedicalProvider
              name={`pendingMemoList{${idx}}medicalProviderCode`}
              disabled={disabled}
              value={pendingMemoList[`${idx}`]?.medicalProviderCode}
              onChange={(value: string[]) => {
                saveReasonMemoCode(`pendingMemoList{${idx}}_medicalProviderCode`, value);
              }}
              errorMessage={lodash.get(
                findObj(errorInfo, data?.id),
                `pendingMemoList{${idx}}_medicalProviderCode`
              )}
            />
          )}
          <Form.Item
            className={classnames(styles.remark, styles.expandRemark)}
            label={
              <div className={styles.label} style={{ flexGrow: 1 }}>
                {memoDescErrors?.length ? <LabelTip title={memoDescErrors} /> : null}
                {formatMessageApi({ Label_COM_ReportCenter: 'bs_memo_detail' })}
                <RequiredIcon visible={fieldsRequired?.memoDesc} />
              </div>
            }
          >
            <Input.TextArea
              name={`pendingMemoList{${idx}}_memoDesc`}
              required
              maxLength={300}
              disabled={disabled}
              value={pendingMemoList[`${idx}`].memoDesc}
              onChange={(ev: any) =>
                saveReasonMemoDesc(`pendingMemoList{${idx}}_memoDesc`, ev.target.value)
              }
              onBlur={(ev: any) =>
                saveReasonMemoDesc(`pendingMemoList{${idx}}_memoDesc`, lodash.trim(ev.target.value))
              }
              id="memoDesc"
            />
          </Form.Item>
          {pendingMemoList[`${idx}`].pendingMemoSubInfoList?.map((item, index) => {
            let memoReasonErrors = [];
            let memoRemarkErrors = [];
            if (index === 0) {
              pendingMemoList[`${idx}`].pendingMemoSubInfoList.forEach((subIndex) => {
                const subInfoReasonError = lodash.get(
                  findObj(errorInfo, data?.id),
                  `pendingMemoList{${idx}}_pendingMemoSubInfoList{${subIndex}}_memoReason`
                );
                const subInfoMemoRemarkError = lodash.get(
                  findObj(errorInfo, data?.id),
                  `pendingMemoList{${idx}}_pendingMemoSubInfoList{${index}}_memoRemark`
                );
                if (!lodash.isEmpty(subInfoReasonError)) {
                  memoReasonErrors = subInfoReasonError;
                }
                if (!lodash.isEmpty(subInfoMemoRemarkError)) {
                  memoRemarkErrors = subInfoMemoRemarkError;
                }
              });
            }

            return (
              <div
                className={classnames(styles.fullLine, styles.expandReasonLine, {
                  [styles.multipleReason]: isMultiple,
                })}
                key={`${item?.id}_${index}`}
              >
                <Form.Item
                  label={
                    index === 0 && (
                      <div className={styles.label}>
                        {memoReasonErrors?.length ? <LabelTip title={memoReasonErrors} /> : null}
                        {formatMessageApi({ Label_Sider_Envoy: 'ReasonCode' })}
                        <RequiredIcon visible={fieldsRequired?.memoReason} />
                      </div>
                    )
                  }
                >
                  <Select
                    name={`pendingMemoList{${idx}}_${index}_subTypeCode`}
                    disabled={disabled}
                    value={item?.subTypeCode}
                    onChange={(value: any) => saveMemoReason(idx, index, 'subTypeCode', value)}
                    allowClear
                    showSearch
                    filterOption={(input, option) =>
                      String(option.props.children)
                        .toLowerCase()
                        .indexOf(String(input).toLowerCase()) >= 0
                    }
                    dropdownMatchSelectWidth={false}
                    id="reasonCode"
                  >
                    {lodash.map(
                      DictsReason.filter((item) => {
                        const duplicateIndex = pendingMemoList[
                          `${idx}`
                        ]?.pendingMemoSubInfoList?.findIndex(
                          (subInfo) => subInfo.subTypeCode === item.reasonCode
                        );
                        return duplicateIndex === -1 || duplicateIndex === index;
                      }),
                      (item) => (
                        <Select.Option
                          title={`${item?.reasonCode} ${item?.reasonDesc}`}
                          value={item.reasonCode}
                          key={item?.reasonDesc}
                        >
                          {`${item?.reasonCode} ${item?.reasonDesc}`}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <div className={classnames(styles.memoEntireRow)}>
                  {displayConfig.memoRemark && (
                    <Form.Item
                      label={
                        index === 0 && (
                          <div className={styles.label}>
                            {memoRemarkErrors?.length ? (
                              <LabelTip title={memoRemarkErrors} />
                            ) : null}
                            <RequiredIcon visible={fieldsRequired?.memoRemark} />
                          </div>
                        )
                      }
                      className={classnames(
                        styles.remark,
                        styles.expandRemark,
                        styles.formItemEntireRow
                      )}
                    >
                      <Input.TextArea
                        formName={`pendingMemoList{${idx}}_pendingMemoSubInfoList${index}_subRemark`}
                        maxLength={2048}
                        disabled={disabled}
                        value={item.subRemark}
                        placeholder={'Remark'}
                        className={classnames(styles.remarkTextArea)}
                        onChange={(ev: any) =>
                          saveMemoReason(idx, index, 'subRemark', ev.target.value)
                        }
                        onBlur={() =>
                          dispatch({
                            type: 'envoyController/validateFields',
                            payload: {
                              dataId: data?.groupId,
                            },
                          })
                        }
                        id="memoRemark"
                      />
                    </Form.Item>
                  )}
                </div>
                {pendingMemoList[`${idx}`].pendingMemoSubInfoList.length > 1 && (
                  <Button
                    className={styles.delete}
                    icon="close"
                    size="small"
                    type="link"
                    onClick={() => {
                      dispatch({
                        type: 'envoyController/deleteMemoReason',
                        payload: {
                          groupId: data?.groupId,
                          dataId: data?.id,
                          memoIdx: idx,
                          index,
                        },
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
          {
            // 多reason功能是提前做的，目前需要暂时disable掉。为了避免大量改动，现只disable添加多个reason的field
            false && isMultiple && !disabled && (
              <div
                className={classnames(
                  styles.fullLine,
                  styles.expandReasonLine,
                  styles.multipleReason
                )}
              >
                <Select
                  name={`pendingMemoList{${idx}}_ADD_subTypeCode`}
                  value={void 0}
                  placeholder={'+ Reason'}
                  onChange={(value: any) => {
                    dispatch({
                      type: 'envoyController/addMemoReason',
                      payload: {
                        groupId: data?.groupId,
                        dataId: data?.id,
                        memoIdx: idx,
                        value,
                      },
                    });
                  }}
                  // style={{ marginTop: 10 }}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    String(option.props.children)
                      .toLowerCase()
                      .indexOf(String(input).toLowerCase()) >= 0
                  }
                  id="reasonCode"
                >
                  {lodash.map(
                    DictsReason.filter((item) => {
                      const duplicateIndex = pendingMemoList[
                        `${idx}`
                      ]?.pendingMemoSubInfoList?.findIndex(
                        (subInfo) => subInfo.subTypeCode === item.reasonCode
                      );
                      return duplicateIndex === -1 || duplicateIndex === void 0;
                    }),
                    (item) => (
                      <Select.Option
                        title={`${item?.reasonCode} ${item?.reasonDesc}`}
                        value={item.reasonCode}
                        key={item?.reasonDesc}
                      >
                        {`${item?.reasonCode} ${item?.reasonDesc}`}
                      </Select.Option>
                    )
                  )}
                </Select>
              </div>
            )
          }
        </div>
      </Form>
    ),
    [pendingMemoList, memoStatus, memoCodeErrors, DictsReason, receivedDisable]
  );
};
