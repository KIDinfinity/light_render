import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import moment from 'moment';
import { Icon } from 'antd';
import { EGlobalAuthCode, ESelfAuthCode, EReasonStatus, EMemoStatus } from 'bpm/pages/Envoy/enum';
import { notAuthOrDraftReason, notAuthOrActiveReason } from 'bpm/pages/Envoy/_utils/getDisabled';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import classnames from 'classnames';
import ExpandMemoItem from './ExpandMemoItem';
import ExpandMemoLinkItem from './ExpandMemoLinkItem';
import ExpandWaivedList from './ExpandWaivedList';
import useHandleJudgeTaskStatusReload from 'bpm/pages/Envoy/hooks/useHandleJudgeTaskStatusReload';
import styles from './pendingMemo.less';
import useGetShowMemoVisible from 'bpm/pages/Envoy/hooks/useGetShowMemoVisible';
import ExpandMemoItemByClient from './ExpandMemoItemByClient';
import { v4 as uuidv4 } from 'uuid';
import useLoadClientInfoListByRole from 'bpm/pages/Envoy/hooks/useLoadClientInfoListByRole';
import AddMemoByMemoTo from './AddMemoByMemoTo';
import AddMemoByMemoCode from './AddMemoByMemoCode';
import groupLogic from '../../_utils/groupLogic';

export default ({ editable, data, isDraft }: any) => {
  const { id, groupId, reasonCode, envoyAuth, status, pendingMemoList } = data;
  const handleReload = useHandleJudgeTaskStatusReload();
  const dispatch = useDispatch();
  const { globalEditAuth, errorInfo } = useSelector(
    (state: any) => ({
      globalEditAuth: lodash.get(state.authController, EGlobalAuthCode.EDIT),
      ...lodash.pick(state.envoyController, ['errorInfo']),
    }),
    shallowEqual
  );

  const caseCategory = useSelector(({ envoyController }) => envoyController.caseCategory);

  const reasonHaveMemoSubType = useSelector(
    (state: any) => state.envoyController.reasonHaveMemoSubType,
    shallowEqual
  );

  const options = {
    globalAuth: globalEditAuth,
    selfAuth: lodash.get(envoyAuth, ESelfAuthCode.EDIT),
    status,
  };

  const disabled = !editable || notAuthOrDraftReason(options);
  const receivedDisable = !editable || notAuthOrActiveReason(options);
  const errorReceived = useMemo(() => {
    return lodash.get(findObj(errorInfo, id), `pendingMemoList_received`);
  }, [errorInfo, id]);

  useEffect(() => {
    dispatch({
      type: 'envoyController/getListMemos',
      payload: {
        reasonCode,
        caseCategory,
      },
    });
  }, [caseCategory, reasonCode]);

  const handleSearchClient = useLoadClientInfoListByRole();
  const addByMemoTo = useCallback(
    async (requestedClientRole) => {
      await dispatch({
        type: 'envoyController/saveTplDetail',
        payload: {
          type: 'reason',
          tplCtn: {
            ...data,
            pendingMemoList: pendingMemoList.concat([
              {
                memoCode: undefined,
                memoDesc: undefined,
                pendingDate: moment().format(),
                groupCode: uuidv4(),
                id: uuidv4(),
                requestedClientRole,
              },
            ]),
          },
        },
      });
      const list = await handleSearchClient({
        requestedClientRole,
      });
      if (lodash.isArray(list) && list.length === 1) {
        dispatch({
          type: 'envoyController/saveReasonMemoCode',
          payload: {
            groupId: data?.groupId,
            dataId: data?.id,
            names: [`pendingMemoList{${pendingMemoList.length}}_requestedClientId`],
            value: list[0]?.requestedClientId,
          },
        });
        dispatch({
          type: 'envoyController/validateFields',
          payload: {
            dataId: data?.groupId,
          },
        });
      }
    },
    [data, pendingMemoList]
  );

  const AddByMemoData = useCallback(
    (memoData) => {
      dispatch({
        type: 'envoyController/saveTplDetail',
        payload: {
          type: 'reason',
          tplCtn: {
            ...data,
            pendingMemoList: pendingMemoList.concat([
              {
                ...memoData,
                pendingDate: moment().format(),
                id: uuidv4(),
              },
            ]),
          },
        },
      });
    },
    [data, pendingMemoList]
  );
  // 删除，已发送的，call接口删除刷新列表（后端排序， 更改顺序
  const onDelete = useCallback(
    async (idx: number, pendingMemoId: string) => {
      if (status === EReasonStatus.ACTIVE && pendingMemoId) {
        await dispatch({
          type: 'envoyController/setMemoStatus',
          payload: {
            groupId,
            pendingMemoId,
            status: 'Waived',
          },
        });
        handleReload();
        return;
      }
      await dispatch({
        type: 'envoyController/saveTplDetail',
        payload: {
          type: 'reason',
          tplCtn: {
            ...data,
            pendingMemoList: pendingMemoList?.filter((item: any, index: any) => index !== idx),
          },
        },
      });
    },
    [data, pendingMemoList, groupId]
  );

  // 修改已发送的memo状态
  const onChangeReceived = useCallback(
    async ({ pendingMemoId, memoStatus }: any) => {
      await dispatch({
        type: 'envoyController/setMemoStatus',
        payload: {
          groupId,
          pendingMemoId,
          status: memoStatus,
        },
      });
      handleReload();
    },
    [groupId]
  );

  const hasNotReceived = useMemo(() => {
    return lodash.some(pendingMemoList, (item: any) => item.memoStatus === EMemoStatus.NOTRECEIVED);
  }, [pendingMemoList]);
  const displayConfig: any = useGetShowMemoVisible({ displayConfig: data?.displayConfig });

  const addByMemoCode = useCallback(
    async (memoCode) => {
      await dispatch({
        type: 'envoyController/saveTplDetail',
        payload: {
          type: 'reason',
          tplCtn: {
            ...data,
            pendingMemoList: [
              ...pendingMemoList,
              {
                memoCode,
                memoDesc: undefined,
                pendingDate: moment().format(),
              },
            ],
          },
        },
      });
      if (!reasonHaveMemoSubType[data?.reasonCode]) {
        await dispatch({
          type: 'envoyController/saveReasonMemoCode',
          payload: {
            groupId: data?.groupId,
            dataId: data?.id,
            names: [`pendingMemoList{${lodash.compact(pendingMemoList).length}}_memoCode`],
            value: memoCode,
          },
        });
      } else {
        await dispatch({
          type: 'envoyController/saveLinkMemoCode',
          payload: {
            groupId: data?.groupId,
            dataId: data?.id,
            name: `pendingMemoList{${lodash.compact(pendingMemoList).length}}_memoCode`,
            value: memoCode,
            reasonCode: data?.reasonCode,
          },
        });
      }
      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
    },
    [pendingMemoList, data, reasonHaveMemoSubType]
  );

  const specifyClientMemo =
    !reasonHaveMemoSubType[data?.reasonCode] && displayConfig.memoClientRole;
  let listMemos = useSelector((state: any) =>
    !specifyClientMemo ? state.envoyController.listMemos[data?.reasonCode] : []
  );

  const isRole = !reasonHaveMemoSubType[data?.reasonCode] && displayConfig.memoClientId;
  const groupedMemoList = !isRole
    ? {
        '': pendingMemoList,
      }
    : lodash
        .chain(pendingMemoList)
        .map((memoItem, idx) => ({
          ...memoItem,
          idx,
        }))
        .groupBy(groupLogic)
        .value();

  const renderedMemoList = lodash.map(groupedMemoList, (memoListByRole, groupCode) => {
    const filteredMemoList = lodash
      .compact(memoListByRole)
      .filter((memoItem) => memoItem.memoStatus !== EMemoStatus.WAIVED);
    const hasMemoTo = displayConfig.memoClientRole;
    return (
      <div className={classnames([styles.memoList, styles.expandMemoList])}>
        {!isRole && hasMemoTo && (
          <div className={styles.title}>
            {errorReceived?.length && status === EReasonStatus.ACTIVE && hasNotReceived ? (
              <LabelTip title={errorReceived} />
            ) : null}
            <Icon type="user" style={{ fontSize: 20 }} />
          </div>
        )}
        {reasonHaveMemoSubType[data?.reasonCode] ? (
          <>
            {lodash.map(filteredMemoList, (item: any, idx) => (
              <ExpandMemoLinkItem
                id={item?.id}
                key={idx}
                idx={idx}
                data={data}
                errorInfo={errorInfo}
                disabled={disabled}
                receivedDisable={receivedDisable}
                onDelete={onDelete}
                onChangeReceived={onChangeReceived}
                isDraft={isDraft}
              />
            ))}
            {!disabled && (
              <div className={styles.clientSection}>
                <AddMemoByMemoCode
                  addMemo={addByMemoCode}
                  listMemos={listMemos}
                  pendingMemoList={pendingMemoList}
                  isExpand={true}
                />
              </div>
            )}
          </>
        ) : !isRole ? (
          <>
            {filteredMemoList.map((item: any, idx) => (
              <ExpandMemoItem
                id={item?.id}
                key={idx}
                idx={idx}
                data={data}
                memoItem={item}
                errorInfo={errorInfo}
                disabled={disabled}
                receivedDisable={receivedDisable}
                onDelete={onDelete}
                onChangeReceived={onChangeReceived}
                isDraft={isDraft}
              />
            ))}
            <div className={styles.clientSection}>
              {!disabled && (
                <AddMemoByMemoCode
                  addMemo={addByMemoCode}
                  listMemos={listMemos}
                  pendingMemoList={pendingMemoList}
                  isExpand={true}
                />
              )}
            </div>
          </>
        ) : (
          !!filteredMemoList.length && (
            <ExpandMemoItemByClient
              // eslint-disable-next-line react/no-array-index-key
              key={groupCode}
              data={data}
              memoItems={filteredMemoList}
              errorInfo={errorInfo}
              disabled={disabled}
              receivedDisable={receivedDisable}
              onDelete={onDelete}
              onChangeReceived={onChangeReceived}
              addMemoData={AddByMemoData}
              isDraft={isDraft}
              errorReceivedComponent={
                errorReceived?.length && status === EReasonStatus.ACTIVE && hasNotReceived ? (
                  <LabelTip title={errorReceived} />
                ) : null
              }
            />
          )
        )}
        <ExpandWaivedList
          list={memoListByRole.filter(
            (memoItem) => memoItem && memoItem.memoStatus === EMemoStatus.WAIVED
          )}
        />
      </div>
    );
  });

  return (
    <>
      {renderedMemoList}
      {isRole && !disabled && (
        <AddMemoByMemoTo addMemo={addByMemoTo} disabled={disabled} isExpand={true} />
      )}
    </>
  );
};
