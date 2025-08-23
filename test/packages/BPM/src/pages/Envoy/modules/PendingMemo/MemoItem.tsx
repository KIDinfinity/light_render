import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import Received from './Received';
import Submitted from './Submitted';
import { useSelector, useDispatch } from 'dva';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import { tenant, Region } from '@/components/Tenant';
import { EMemoStatus } from 'bpm/pages/Envoy/enum';
import useGetShowMemoVisible from 'bpm/pages/Envoy/hooks/useGetShowMemoVisible';
import useGetFilterMemoCodeList from 'bpm/pages/Envoy/_utils/getFilterMemoCodeList';
import useLoadClientInfoListByRole from 'bpm/pages/Envoy/hooks/useLoadClientInfoListByRole';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import styles from './pendingMemo.less';
import MemoTextAreaForm from './MemoTextAreaForm';
import MedicalProvider from './MedicalProvider';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useJudgeMemoDeleteButtonAvailable from 'bpm/pages/Envoy/hooks/useJudgeMemoDeleteButtonAvailable';
import SelectFormItem from './SelectFormItem';
import useGetPendingMemoFieldsRequired from 'bpm/pages/Envoy/hooks/useGetPendingMemoFieldsRequired';

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
export default ({
  id,
  idx,
  data,
  disabled,
  onDelete,
  errorInfo,
  onChangeReceived,
  receivedDisable,
  memoItem,
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
  const memoList: any[] = pendingMemoList?.filter(
    (item: any) => item?.memoStatus !== EMemoStatus.WAIVED
  );
  const listMemos =
    useSelector((state: any) => state.envoyController.listMemos[data?.reasonCode]) || [];
  // 过滤掉同一个reason下已选择的，除了Free
  const { creator, gmtCreate, requestedClientRole } = pendingMemoList[`${idx}`];
  const memoStatus = lodash.get(pendingMemoList, `[${idx}].memoStatus`);

  const readData = useSelector(({ solutionRead }: any) => solutionRead?.readData) || {};
  const filterMemoCodeList = useGetFilterMemoCodeList({
    pendingMemoList,
    thisItem: pendingMemoList[`${idx}`] || {},
    listMemos,
  });

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
      if (/requestedClientRole/.test(name)) {
        const list = await handleSearchClient({
          requestedClientRole: value,
        });
        const requestedClientIdValue =
          lodash.isArray(list) && list.length === 1 ? list[0]?.requestedClientId : '';
        saveReasonMemoCode([`pendingMemoList[${idx}]_requestedClientId`], requestedClientIdValue);
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

  // TODO:下拉需要用配置的方式去做

  const showUnRead = (item: any) => {
    return item.readFlag === 'Y' && !lodash.includes(readData[ESubjectType.ENVOYMEMO], item.id);
  };

  const memoDeleteButtonAvailable = useJudgeMemoDeleteButtonAvailable({
    displayConfig: data?.displayConfig?.pendingMemo,
    isDraft,
  });

  return useMemo(
    () => (
      <>
        {memoStatus !== EMemoStatus.WAIVED && (
          <div className={styles.item} key={idx} id={`memo${idx}`}>
            <Read
              type={EType.ITEM}
              subjectType={ESubjectType.ENVOYMEMO}
              id={memoItem.id}
              show={showUnRead(memoItem)}
            >
              <div className={styles.creatorInfo}>
                <div className={styles.creator}>{creator}</div>
                <div className={styles.time}>{gmtCreate && moment(gmtCreate).format('L')}</div>
              </div>
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
              <Form layout="vertical">
                {displayConfig.memoClientRole && (
                  <SelectFormItem
                    idx={idx}
                    data={data}
                    fileKey={'requestedClientRole'}
                    title={'Memo To'}
                    disabled={disabled}
                    errorInfo={errorInfo}
                    required={fieldsRequired?.requestedClientRole}
                    selectObj={{
                      list: Dropdown_Evy_CustomerRole_FurtherReq,
                      key: 'dictCode',
                      name: 'dictName',
                      requestClientInfoList,
                    }}
                    classId={'memoTo'}
                  />
                )}
                {displayConfig.memoClientId && (
                  <SelectFormItem
                    idx={idx}
                    data={data}
                    fileKey={'requestedClientId'}
                    title={''}
                    disabled={disabled}
                    errorInfo={errorInfo}
                    required={fieldsRequired?.requestedClientId}
                    selectObj={{
                      list: requestClientInfoList,
                      key: 'requestedClientId',
                      name: 'requestedClientName',
                    }}
                    classId={'requestedClientId'}
                  />
                )}
                <div className={classnames(styles.select, { [styles.editable]: !disabled })}>
                  <SelectFormItem
                    idx={idx}
                    data={data}
                    fileKey={'memoCode'}
                    title={'MemoCode'}
                    disabled={disabled}
                    errorInfo={errorInfo}
                    required={fieldsRequired?.memoCode}
                    selectObj={{
                      list: filterMemoCodeList,
                      key: 'memoCode',
                      name: 'memoName',
                    }}
                    classId={'memoCode'}
                    optionLabelProp={!tenant.isID() && 'value'}
                    optionShowType={tenant.region({
                      [Region.HK]: 'name',
                      [Region.VN]: 'name',
                      [Region.TH]: 'keyAndDesc',
                      [Region.MY]: 'name',
                      [Region.ID]: 'name',
                      [Region.KH]: 'name',
                      [Region.PH]: 'name',
                      notMatch: 'both',
                    })}
                  />
                </div>
                <div className={classnames(styles.select, { [styles.editable]: !disabled })}>
                  {displayConfig.medicalProvider && (
                    <MedicalProvider
                      name={`pendingMemoList{${idx}}medicalProviderCode`}
                      disabled={disabled}
                      value={pendingMemoList[`${idx}`]?.medicalProviderCode}
                      onChange={(value: string[]) => {
                        saveReasonMemoCode([`pendingMemoList{${idx}}_medicalProviderCode`], value);
                      }}
                      errorMessage={lodash.get(
                        findObj(errorInfo, data?.id),
                        `pendingMemoList{${idx}}_medicalProviderCode`
                      )}
                      required={fieldsRequired?.medicalProviderCode}
                    />
                  )}
                </div>
                <div
                  className={classnames(styles.selectSubmitted, { [styles.editable]: !disabled })}
                >
                  <Submitted
                    id={id}
                    idx={idx}
                    name="submitted"
                    disabled={receivedDisable}
                    data={data}
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
              </Form>
              <MemoTextAreaForm
                data={data}
                idx={idx}
                disabled={disabled}
                showMemoRemark={displayConfig.memoRemark}
                errorInfo={errorInfo}
                fieldsRequired={fieldsRequired}
              />
            </Read>
          </div>
        )}
      </>
    ),
    [
      pendingMemoList,
      memoStatus,
      requestClientInfoList,
      errorInfo,
      receivedDisable,
      filterMemoCodeList,
      displayConfig,
      disabled,
    ]
  );
};
