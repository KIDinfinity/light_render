import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Form, Button, Select, Tooltip } from 'antd';
import lodash from 'lodash';
import Received, { showReceive } from './Received';
import Submitted, { showSubmitted } from './Submitted';
import { useSelector, useDispatch, connect } from 'dva';
import { formUtils, FormItemTextArea } from 'basic/components/Form';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import { EMemoStatus } from 'bpm/pages/Envoy/enum';
import useGetShowMemoVisible from 'bpm/pages/Envoy/hooks/useGetShowMemoVisible';
import useGetFilterMemoCodeList from 'bpm/pages/Envoy/_utils/getFilterMemoCodeList';
import useLoadClientInfoListByRole from 'bpm/pages/Envoy/hooks/useLoadClientInfoListByRole';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import styles from './pendingMemo.less';
import MedicalProvider from './MedicalProvider';
import classnames from 'classnames';
import useGetPendingMemoFieldsRequired from 'bpm/pages/Envoy/hooks/useGetPendingMemoFieldsRequired';
import RequiredIcon from './RequiredIcon';
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
  memoItem?: any;
  isDraft: boolean;
}

// memoCode 过滤掉同一个reason下已选择的，除了Free, 且未发送的
const ExpandMemoItem = ({
  id,
  idx,
  data,
  disabled,
  onDelete,
  errorInfo,
  onChangeReceived,
  receivedDisable,
  memoItem,
  form,
  isDraft,
}: IProps) => {
  const handleSearchClient = useLoadClientInfoListByRole();
  const [requestClientInfoList, setClientInfoList] = useState([]);
  const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
  const displayConfig: any = useGetShowMemoVisible({ displayConfig: data?.displayConfig });
  const fieldsRequired = useGetPendingMemoFieldsRequired({ displayConfig: data?.displayConfig });
  const memoList: any[] = pendingMemoList?.filter(
    (item: any) => item?.memoStatus !== EMemoStatus.WAIVED
  );
  const listMemos =
    useSelector((state: any) => state.envoyController.listMemos[data?.reasonCode]) || [];
  // 过滤掉同一个reason下已选择的，除了Free
  const { requestedClientRole } = pendingMemoList[`${idx}`];
  const memoStatus = lodash.get(pendingMemoList, `[${idx}].memoStatus`);

  const readData = useSelector(({ solutionRead }: any) => solutionRead?.readData) || {};
  const filterMemoCodeList = useGetFilterMemoCodeList({
    pendingMemoList,
    thisItem: pendingMemoList[`${idx}`] || {},
    listMemos,
  });

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
      if (/requestedClientRole/.test(name)) {
        const list = await handleSearchClient({
          requestedClientRole: value,
        });
        const requestedClientIdValue =
          lodash.isArray(list) && list.length === 1 ? list[0]?.requestedClientId : '';
        saveReasonMemoCode(`pendingMemoList[${idx}]_requestedClientId`, requestedClientIdValue);
      }
    },
    [data, idx, dispatch]
  );

  useEffect(() => {
    (async () => {
      const list = await handleSearchClient({
        requestedClientRole,
      });
      setClientInfoList(list);
    })();
  }, [requestedClientRole]);

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
  const SelectFormItemOption = (item, selectObj, optionShowType) => {
    const optionContent = (() => {
      if (optionShowType === 'value') return item[selectObj.key];
      if (optionShowType === 'both') return `${item[selectObj.key]}-${item[selectObj.name]}`;
      if (optionShowType === 'keyAndDesc') return `${item[selectObj.key]}-${item.memoDesc}`;
      return item[selectObj.name];
    })();
    return (
      <Select.Option
        value={item[selectObj.key]}
        key={item[selectObj.key]}
        className={styles.memoCodeMultipleLineDisplayOption}
      >
        <Tooltip title={optionContent}>
          <div title="">{optionContent}</div>
        </Tooltip>
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
    hideLabel,
    selectProps = {},
  }: any) => {
    const errorMessage = lodash.get(
      findObj(errorInfo, data?.id),
      `pendingMemoList{${idx}}_${fileKey}`
    );

    return (
      <Form.Item
        label={
          !hideLabel && (
            <div className={styles.label}>
              {errorMessage?.length ? <LabelTip title={errorMessage} /> : null}
              {!!title && formatMessageApi({ Label_Sider_Envoy: title })}
              <RequiredIcon visible={required} />
            </div>
          )
        }
      >
        <Select
          name={`pendingMemoList{0}}${fileKey}`}
          disabled={disabled}
          value={pendingMemoList[`${idx}`]?.[`${fileKey}`]}
          onChange={(value: string[]) => {
            saveReasonMemoCode(`pendingMemoList{${idx}}_${fileKey}`, value);
          }}
          allowClear
          showSearch
          required
          filterOption={(input, option) =>
            String(getComponentChildrenWithString(option, 'title'))
              .toLowerCase()
              .indexOf(String(input).toLowerCase()) >= 0
          }
          id={classId}
          {...(optionLabelProp ? { optionLabelProp } : {})}
          {...selectProps}
        >
          {lodash.map(selectObj?.list || [], (item) =>
            SelectFormItemOption(item, selectObj, optionShowType)
          )}
        </Select>
      </Form.Item>
    );
  };

  // TODO:下拉需要用配置的方式去做

  const showUnRead = (item: any) => {
    return item.readFlag === 'Y' && !lodash.includes(readData[ESubjectType.ENVOYMEMO], item.id);
  };

  const memoDescErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_memoDesc`
  );

  const memoRemarkErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_memoRemark`
  );
  const memoDeleteButtonAvailable = useJudgeMemoDeleteButtonAvailable({
    displayConfig: data?.displayConfig?.pendingMemo,
    isDraft,
  });
  return useMemo(
    () => (
      <div
        className={classnames({
          [styles.expandMemoRow]: true,
          [styles.clientSection]: true,
          [styles.withReceive]: showReceive({
            status: data?.status,
            disabled: receivedDisable,
            memoStatus: memoItem.memoStatus,
          }),
          [styles.showSubmitted]: showSubmitted({
            status: data?.status,
            disabled: receivedDisable,
          }),
          [styles.withReceiveAndShowSubmitted]:
            showReceive({
              status: data?.status,
              disabled: receivedDisable,
              memoStatus: memoItem.memoStatus,
            }) &&
            showSubmitted({
              status: data?.status,
              disabled: receivedDisable,
            }),
        })}
        key={idx}
        id={`memo${idx}`}
      >
        <Read
          type={EType.ITEM}
          subjectType={ESubjectType.ENVOYMEMO}
          id={memoItem.id}
          show={showUnRead(memoItem)}
        >
          <div className={styles.sectionLeftIndicator} />
          <div className={styles.expandedReceived}>
            {((!disabled && memoList?.length > 1) || !receivedDisable) &&
              memoStatus !== EMemoStatus.RECEIVED &&
              memoDeleteButtonAvailable && (
                <Button
                  className={styles.delete}
                  icon="close"
                  size="small"
                  type="link"
                  onClick={() => onDelete(idx, id)}
                />
              )}
            <Submitted
              id={id}
              idx={idx}
              name="submitted"
              disabled={receivedDisable}
              data={data}
              expand={true}
            />
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
              required={fieldsRequired?.medicalProviderCode}
            />
          )}
          <Form.Item
            className={styles.expandMemo}
            label={
              <div className={styles.label}>
                {memoDescErrorMessage?.length ? <LabelTip title={memoDescErrorMessage} /> : null}
                {formatMessageApi({ Label_Sider_Envoy: 'Memo Detail' })}
                <RequiredIcon visible={fieldsRequired?.memoDesc} />
              </div>
            }
          >
            <FormItemTextArea
              form={form}
              className={classnames(styles.remark)}
              formName={`pendingMemoList{${idx}}_memoDesc`}
              maxLength={2048}
              required={fieldsRequired?.memoDesc}
              disabled={disabled}
            />
          </Form.Item>
          <div className={classnames(styles.memoEntireRow)}>
            {displayConfig.memoRemark && (
              <Form.Item
                className={classnames(styles.expandRemark, styles.inside, styles.formItemEntireRow)}
                label={
                  <div className={styles.label}>
                    {memoRemarkErrorMessage?.length ? (
                      <LabelTip title={memoRemarkErrorMessage} />
                    ) : null}
                    <RequiredIcon visible={fieldsRequired?.memoRemark} />
                  </div>
                }
              >
                <FormItemTextArea
                  required={fieldsRequired?.memoRemark}
                  form={form}
                  // labelId={idx === 0 ? 'Memo Remark' : void 0}
                  placeholder={'Remark'}
                  formName={`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`}
                  maxLength={2048}
                  disabled={disabled}
                  className={classnames(styles.remark, styles.fullLine)}
                />
              </Form.Item>
            )}
          </div>
        </Read>
      </div>
    ),
    [
      pendingMemoList,
      memoStatus,
      requestClientInfoList,
      errorInfo,
      receivedDisable,
      filterMemoCodeList,
      displayConfig,
      memoDescErrorMessage,
      form,
    ]
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
      const { memoItem, idx, data } = props;
      const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
      const obj = formUtils.mapObjectToFields({
        ...(memoItem || {}),
        [`pendingMemoList{${idx}}_memoDesc`]: formatMessageApi({
          DropDown_ENV_PendingMemoDescription: pendingMemoList[`${idx}`]?.memoDesc,
        }),
        [`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`]:
          pendingMemoList[`${idx}`]?.memoRemark,
      });

      return formUtils.mapObjectToFields(obj);
    },
  })(ExpandMemoItem)
);
