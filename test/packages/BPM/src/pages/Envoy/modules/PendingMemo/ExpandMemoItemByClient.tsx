import React, { useCallback, useState, useEffect } from 'react';
import { Form, Button, Select, Tooltip, Icon } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import Received, { showReceive } from './Received';
import { useSelector, useDispatch, connect } from 'dva';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { EMemoStatus } from 'bpm/pages/Envoy/enum';
import useGetShowMemoVisible from 'bpm/pages/Envoy/hooks/useGetShowMemoVisible';
import getFilterMemoCodeList from 'bpm/pages/Envoy/_utils/getFilterMemoCodeList';
import { tenant, Region } from '@/components/Tenant';
import useLoadClientInfoListByRole from 'bpm/pages/Envoy/hooks/useLoadClientInfoListByRole';
import styles from './pendingMemo.less';
import MedicalProvider from './MedicalProvider';
import { formUtils, FormItemTextArea } from 'basic/components/Form';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import RequiredIcon from './RequiredIcon';
import useGetPendingMemoFieldsRequired from 'bpm/pages/Envoy/hooks/useGetPendingMemoFieldsRequired';
import useJudgeMemoDeleteButtonAvailable from 'bpm/pages/Envoy/hooks/useJudgeMemoDeleteButtonAvailable';
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
  memoItems?: any;
  sectionId?: string;
  form?: any;
  addMemoData: (obj: any) => void;
  isDraft: boolean;
}

// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
const MemoItemByClient = ({
  data,
  disabled,
  onDelete,
  errorInfo,
  onChangeReceived,
  receivedDisable,
  memoItems,
  sectionId,
  form,
  addMemoData,
  errorReceivedComponent,
  isDraft,
}: IProps) => {
  const Dropdown_Evy_CustomerRole_FurtherReq = getDrowDownList(
    'Dropdown_Evy_CustomerRole_FurtherReq'
  );
  const handleSearchClient = useLoadClientInfoListByRole();
  const [requestClientInfoList, setClientInfoList] = useState([]);
  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
  const displayConfig: any = useGetShowMemoVisible({ displayConfig: data?.displayConfig });
  const fieldsRequired = useGetPendingMemoFieldsRequired({ displayConfig: data?.displayConfig });

  const listMemos =
    useSelector((state: any) => state.envoyController.listMemos[data?.reasonCode]) || [];

  const readData = useSelector(({ solutionRead }: any) => solutionRead?.readData) || {};

  // getMultiMemoCodeList
  const dispatch = useDispatch();
  const saveReasonMemoCode = useCallback(
    async (names: string[], value: any) => {
      dispatch({
        type: 'envoyController/saveReasonMemoCode',
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          names,
          value,
        },
      });
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
      if (/requestedClientRole/.test(names?.[0])) {
        const list = await handleSearchClient({
          requestedClientRole: value,
        });
        const clientId =
          lodash.isArray(list) && list.length === 1 ? list[0]?.requestedClientId : '';
        saveReasonMemoCode(
          names.map((name) => name.replace('requestedClientRole', 'requestedClientId')),
          clientId
        );
      }
    },
    [data, dispatch]
  );

  // const label = ({ errorKey, title }: any) => {
  //   const errorMessage = lodash.get(
  //     findObj(errorInfo, data?.id),
  //     `pendingMemoList{${idx}}_${errorKey}`
  //   );

  //   return (
  //     <>
  //       {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
  //       {!!title && formatMessageApi({ Label_Sider_Envoy: title })}
  //     </>
  //   );
  // };
  const SelectFormItemOption = (item, fileKey, selectObj, optionShowType) => {
    const optionContent = (() => {
      if (optionShowType === 'value') return item[selectObj.key];
      if (optionShowType === 'both') return `${item[selectObj.key]}-${item[selectObj.name]}`;
      if (optionShowType === 'keyAndDesc') return `${item[selectObj.key]}-${item.memoDesc}`;
      return item[selectObj.name];
    })();
    return (
      <Select.Option
        value={item[selectObj.key]}
        title={fileKey === 'memoCode' ? '' : item[selectObj.name]}
        key={item[selectObj.key]}
        className={fileKey === 'memoCode' ? styles.memoCodeMultipleLineDisplayOption : ''}
      >
        {fileKey === 'memoCode' ? (
          <Tooltip title={optionContent}>
            <div title="">{optionContent}</div>
          </Tooltip>
        ) : (
          optionContent
        )}
      </Select.Option>
    );
  };
  const SelectFormItem = ({
    fileKey,
    title,
    selectObj,
    classId,
    required = false,
    optionLabelProp = '',
    optionShowType = 'name',
    idx,
    groupUpdate = false,
    hideLabel = false,
    onChange,
    selectProps,
    className,
    placeholder,
  }: any) => {
    const errorMessage = lodash.get(
      findObj(errorInfo, data?.id),
      `pendingMemoList{${idx}}_${fileKey}`
    );
    const names = groupUpdate
      ? memoItems.map((memo) => `pendingMemoList{${memo?.idx}}_${fileKey}`)
      : [`pendingMemoList{${idx}}_${fileKey}`];

    return (
      <Form.Item
        required={required}
        className={className}
        label={
          !hideLabel ? (
            <>
              {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
              {!!title && formatMessageApi({ Label_Sider_Envoy: title })}
            </>
          ) : errorMessage?.length ? (
            <LabelTip title={errorMessage} />
          ) : null
        }
      >
        <Select
          name={`pendingMemoList{${idx}}${fileKey}`}
          disabled={disabled}
          value={pendingMemoList[`${idx}`]?.[`${fileKey}`]}
          onChange={(value: string) => {
            if (onChange) onChange(value);
            else saveReasonMemoCode(names, value);
          }}
          allowClear
          showSearch
          required
          placeholder={placeholder}
          filterOption={(input, option) =>
            String(getComponentChildrenWithString(option, 'title'))
              .toLowerCase()
              .indexOf(String(input).toLowerCase()) >= 0
          }
          id={classId}
          {...(selectProps || {})}
          {...(optionLabelProp ? { optionLabelProp } : {})}
        >
          {lodash.map(selectObj?.list || [], (item) =>
            SelectFormItemOption(item, fileKey, selectObj, optionShowType)
          )}
        </Select>
      </Form.Item>
    );
  };

  // TODO:下拉需要用配置的方式去做
  // const showUnRead = (item: any) => {
  //   return item.readFlag === 'Y' && !lodash.includes(readData[ESubjectType.ENVOYMEMO], item.id);
  // };
  const firstIdx = memoItems[0].idx;
  const { requestedClientRole } = pendingMemoList[firstIdx];
  useEffect(() => {
    (async () => {
      const list = await handleSearchClient({
        requestedClientRole,
      });
      setClientInfoList(list);
    })();
  }, [requestedClientRole, handleSearchClient]);

  const addItemFilterMemoCodeList = getFilterMemoCodeList({
    pendingMemoList,
    thisItem: {},
    listMemos,
  });

  const currentGroupCode = memoItems[0].groupCode;
  useEffect(() => {
    requestIdleCallback(
      () => {
        if (memoItems.some((memoItem) => memoItem.groupCode !== currentGroupCode)) {
          dispatch({
            type: 'envoyController/unifyGroupCode',
            payload: {
              requestedClientRole: memoItems[0]?.requestedClientRole,
              requestedClientId: memoItems[0]?.requestedClientId,
              groupId: data.reasonGroupId,
              id: data.id,
            },
          });
        }
      },
      { timeout: 300 }
    );
  }, [memoItems]);

  const memoDeleteButtonAvailable = useJudgeMemoDeleteButtonAvailable({
    displayConfig: data?.displayConfig?.pendingMemo,
    isDraft,
  });
  return (
    <div key={sectionId} id={`memo${sectionId}`}>
      {errorReceivedComponent}
      <Form>
        <div className={classnames(styles.memoToHeader)}>
          {displayConfig.memoClientRole && <Icon type="user" style={{ fontSize: 20 }} />}
          {displayConfig.memoClientRole &&
            SelectFormItem({
              fileKey: 'requestedClientRole',
              placeholder: 'Memo To',
              required: fieldsRequired?.requestedClientId,
              selectObj: {
                list: Dropdown_Evy_CustomerRole_FurtherReq,
                key: 'dictCode',
                name: 'dictName',
                requestClientInfoList,
              },
              classId: 'memoTo',
              groupUpdate: true,
              idx: firstIdx,
              className: styles.noRequireMark,
              hideLabel: true,
              selectProps: {
                dropdownMatchSelectWidth: false,
              },
            })}
          {displayConfig.memoClientId &&
            SelectFormItem({
              fileKey: 'requestedClientId',
              title: '',
              required: fieldsRequired?.requestedClientId,
              selectObj: {
                list: requestClientInfoList,
                key: 'requestedClientId',
                name: 'requestedClientName',
              },
              classId: 'requestedClientId',
              groupUpdate: true,
              idx: firstIdx,
              className: styles.noRequireMark,
              hideLabel: true,
              selectProps: {
                dropdownMatchSelectWidth: false,
              },
            })}
        </div>
        {memoItems.map((memoItem) => {
          const memoDescErrorMessage = lodash.get(
            findObj(errorInfo, data?.id),
            `pendingMemoList{${memoItem.idx}}_memoDesc`
          );
          const memoRemarkErrors = lodash.get(
            findObj(errorInfo, data?.id),
            `pendingMemoList{${memoItem.idx}}_pendingMemoSubInfoList{0}_memoRemark`
          );
          const filterMemoCodeList = getFilterMemoCodeList({
            pendingMemoList,
            thisItem: memoItem || {},
            listMemos,
          });

          const hasRepeatCode =
            memoItems.filter((item) => item.memoCode === memoItem.memoCode).length > 1 &&
            memoItem.memoCode &&
            !listMemos.find(({ memoCode }) => memoCode === memoItem.memoCode)?.multiSelect;
          // creator 和gmtCreate要在每个memo下单独渲染，但因为确定该UI应该摆放的位置，现注释，以后要挪进遍历逻辑中

          //.ant-form-item-label label

          return (
            <div
              key={memoItem.id || memoItem.idx}
              className={classnames({
                [styles.editable]: !disabled,
                [styles.expandMemoRow]: true,
                [styles.differentGroup]: currentGroupCode !== memoItem.groupCode,
                [styles.notDifferentGroup]: currentGroupCode === memoItem.groupCode,
                [styles.repeatedGroup]: hasRepeatCode,
                [styles.clientSection]: true,
                [styles.withReceive]: showReceive({
                  status: data?.status,
                  disabled: receivedDisable,
                  memoStatus: memoItem.memoStatus,
                }),
              })}
            >
              <div className={styles.sectionLeftIndicator} />
              <div className={styles.expandedReceived}>
                {((!disabled && pendingMemoList?.length > 1) || !receivedDisable) &&
                  memoItem.memoStatus !== EMemoStatus.RECEIVED &&
                  memoDeleteButtonAvailable && (
                    <Button
                      className={styles.delete}
                      icon="close"
                      size="small"
                      type="link"
                      onClick={() => onDelete(memoItem.idx, memoItem.id)}
                    />
                  )}
                <Received
                  id={memoItem.id}
                  idx={memoItem.idx}
                  name="received"
                  disabled={receivedDisable}
                  status={data?.status}
                  memoStatus={memoItem.memoStatus}
                  onChangeReceived={onChangeReceived}
                />
              </div>
              {/* <div className={styles.creatorInfo}>
                  <div className={styles.creator}>{creator}</div>
                  <div className={styles.time}>{gmtCreate && moment(gmtCreate).format('L')}</div>
                </div> */}
              {SelectFormItem({
                fileKey: 'memoCode',
                title: 'MemoCode',
                required: fieldsRequired?.memoCode,
                selectObj: {
                  list: filterMemoCodeList,
                  key: 'memoCode',
                  name: 'memoName',
                },
                classId: 'memoCode',
                idx: memoItem?.idx,
                optionLabelProp: !tenant.isID() && 'value',
                optionShowType: tenant.region({
                  [Region.HK]: 'name',
                  [Region.VN]: 'name',
                  [Region.TH]: 'keyAndDesc',
                  [Region.MY]: 'name',
                  [Region.ID]: 'name',
                  [Region.KH]: 'name',
                  [Region.PH]: 'name',
                  notMatch: 'both',
                }),
                selectProps: {
                  dropdownMatchSelectWidth: false,
                },
              })}
              {displayConfig.medicalProvider && (
                <div style={{ minWidth: '99px' }}>
                  <MedicalProvider
                    name={`pendingMemoList{${memoItem.idx}}medicalProviderCode`}
                    disabled={disabled}
                    value={pendingMemoList[`${memoItem.idx}`]?.medicalProviderCode}
                    onChange={(value: string[]) => {
                      saveReasonMemoCode(
                        [`pendingMemoList{${memoItem.idx}}_medicalProviderCode`],
                        value
                      );
                    }}
                    errorMessage={lodash.get(
                      findObj(errorInfo, data?.id),
                      `pendingMemoList{${memoItem.idx}}_medicalProviderCode`
                    )}
                    required={fieldsRequired?.medicalProviderCode}
                  />
                </div>
              )}
              <FormItemTextArea
                required={fieldsRequired?.memoDesc}
                form={form}
                labelId={'Memo Detail'}
                formName={`pendingMemoList{${memoItem.idx}}_memoDesc`}
                className={styles.remark}
                maxLength={1000}
                disabled={disabled}
              />
              {lodash.size(memoDescErrorMessage) > 0 && (
                <Tooltip
                  title={memoDescErrorMessage?.[0]}
                  className={styles.required}
                  overlayClassName={styles.myErrorTooltip}
                >
                  <Icon component={ErrorSvg} />
                  {memoDescErrorMessage?.[0]}
                </Tooltip>
              )}
              <div className={classnames(styles.memoEntireRow)}>
                {displayConfig.memoRemark && (
                  <Form.Item
                    className={classnames(styles.formItemEntireRow)}
                    label={
                      fieldsRequired?.memoRemark ? (
                        <div className={styles.label}>
                          {memoRemarkErrors?.length ? <LabelTip title={memoRemarkErrors} /> : null}
                          <RequiredIcon visible={fieldsRequired?.memoRemark} />
                        </div>
                      ) : null
                    }
                  >
                    <FormItemTextArea
                      form={form}
                      placeholder={'Remark'}
                      formName={`pendingMemoList{${memoItem.idx}}_pendingMemoSubInfoList{0}_subRemark`}
                      maxLength={2048}
                      disabled={disabled}
                      className={classnames(styles.remark, styles.fullLine)}
                    />
                  </Form.Item>
                )}
              </div>
            </div>
          );
        })}
        {!disabled && (
          <div
            key={'addMemoByData'}
            className={classnames({
              [styles.editable]: !disabled,
              [styles.expandMemoRow]: true,
              [styles.clientSection]: true,
            })}
          >
            <div className={styles.sectionLeftIndicator} />
            {SelectFormItem({
              fileKey: 'memoCode',
              selectObj: {
                list: addItemFilterMemoCodeList,
                key: 'memoCode',
                name: 'memoName',
              },
              placeholder: '+ Memo Code',
              classId: 'memoCode',
              idx: 'addMemoIdx',
              optionLabelProp: !tenant.isID() && 'value',
              optionShowType: tenant.region({
                [Region.HK]: 'name',
                [Region.VN]: 'name',
                [Region.TH]: 'keyAndDesc',
                [Region.MY]: 'name',
                [Region.ID]: 'name',
                [Region.KH]: 'name',
                [Region.PH]: 'name',
                notMatch: 'both',
              }),
              hideLabel: true,
              onChange: (value: string) => {
                const memoDesc = listMemos.find((memo: any) => memo?.memoCode === value)?.memoDesc;
                addMemoData({
                  requestedClientRole: memoItems[0].requestedClientRole,
                  requestedClientId: memoItems[0].requestedClientId,
                  groupCode: memoItems[0].groupCode,
                  memoCode: value,
                  memoDesc,
                });
              },
              selectProps: {
                dropdownMatchSelectWidth: false,
              },
            })}
          </div>
        )}
      </Form>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, dispatch } = props;
      const name = lodash.keys(changedFields)?.[0];
      const value = formUtils.queryValue(changedFields[name]);
      const action = name.includes('memoDesc') ? 'saveReasonMemoDesc' : 'saveReasonMemoRemark';

      dispatch({
        type: `envoyController/${action}`,
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          name,
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
    mapPropsToFields(props: any) {
      const { memoItems } = props;
      const obj = {};
      memoItems.map((memo) => {
        obj[`pendingMemoList{${memo?.idx}}_memoDesc`] = formatMessageApi({
          DropDown_ENV_PendingMemoDescription: memo?.memoDesc,
        });
        obj[`pendingMemoList{${memo?.idx}}_pendingMemoSubInfoList{0}_subRemark`] = memo?.memoRemark;
      });
      return formUtils.mapObjectToFields(obj);
    },
  })(MemoItemByClient)
);
