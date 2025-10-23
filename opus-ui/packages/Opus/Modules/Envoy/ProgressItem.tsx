import React, { useState, useRef, Children } from 'react';
import { Icon, Row, Col, Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import useHandleJudgeTaskStatusReload from 'bpm/pages/Envoy/hooks/useHandleJudgeTaskStatusReload';
import lodash from 'lodash';
import moment from 'moment';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import { safeParseUtil } from '@/utils/utils';
import { history } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EMemoStatus, EnvoyButtonType, EGlobalAuthCode, ESelfAuthCode } from 'bpm/pages/Envoy/enum';
import Status from './Components/Status';
import classnames from 'classnames';
import { getPaddingCode, getPendingDescription, getPendingMemoReason } from './Function';
import ValueComponent from './Components/ValueComponent';
import MapComponent from './Components/MapComponent';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';
import { notSetResolve } from 'bpm/pages/Envoy/_utils/getDisabled';

import { getReasonText } from './Utils';
import styles from './index.less';
import useGetMedicalProviderDicts from 'bpm/pages/Envoy/hooks/useGetMedicalProviderDicts';
const EnvoyRow = ({ children, showMedicalProvider, showRemark }: any) => {
  const spans = (() => {
    if (showMedicalProvider && showRemark) {
      return [5, 2, 3, 5, 4, 5];
    }
    if (!showMedicalProvider && showRemark) {
      return [5, 5, 4, 0, 5, 5];
    }
    if (!showMedicalProvider && !showRemark) {
      return [5, 8, 6, 0, 7, 5];
    }
    if (showMedicalProvider && !showRemark) {
      return [5, 7, 4, 3, 0, 5];
    }
  })();

  return (
    <Row style={{ marginTop: '10px' }}>
      {Children.map(children, (child, index) => {
        if (index === 3 && !showMedicalProvider) {
          return null;
        }
        if (index === 4 && !showRemark) {
          return null;
        }
        return (
          <Col span={spans[index]}>
            <ValueComponent isDiv isValue value={child} />
          </Col>
        );
      })}
    </Row>
  );
};

export default ({ item, index }: any) => {
  const [expand, setExpand] = useState(false);
  const dispatch = useDispatch();
  const [i, forceReload] = useState(0);
  const memoStatusLoadingList = useRef(new Set());
  const handleReload = useHandleJudgeTaskStatusReload();
  const getMedicalProviderName = useGetMedicalProviderDicts();

  const authEnvoy = useSelector((state) => lodash.get(state, `authController`));
  const reasonConfigs =
    useSelector(({ envoyController }: any) => envoyController.reasonConfigs) || [];
  const envoyEdit = lodash.find(reasonConfigs, { code: item?.groupCode })?.envoyEdit;
  const activePermission = lodash.isBoolean(envoyEdit) ? envoyEdit : true;

  const setStatus = async (groupId, pendingMemoId, status, memoCode) => {
    memoStatusLoadingList.current?.add(pendingMemoId);
    forceReload(i + 1);
    await dispatch({
      type: 'envoyController/setMemoStatus',
      payload: {
        groupId,
        pendingMemoId,
        status,
        reasonGroup: item,
        memoCode,
      },
    });
    memoStatusLoadingList.current?.delete(pendingMemoId);
    forceReload(i + 1);
    handleReload();
    dispatch({
      type: 'envoyController/getEnvoyInfo',
    });
  };
  const [waiveLoading, setWaiveLoading] = useState(false);
  // 没有pendingMemo显示按钮
  const isNotHavePendingMemo = item?.reasonDetails?.every(
    (listItem) => !listItem?.pendingMemoList?.length
  );
  const isFreeField = item?.reasonDetails?.every((listItem) => listItem?.displayConfig?.freeField);

  const handlerEnvoySended = usePublishEnvoyChange();
  const setResonStatus = async (key): void => {
    if (key === EnvoyButtonType.WAIVE) {
      setWaiveLoading(true);
    }
    const resultData = await dispatch({
      type: 'envoyController/setStatus',
      payload: {
        groupIdx: index,
        status: key,
      },
    });
    setWaiveLoading(false);
    handlerEnvoySended(resultData);

    dispatch({
      type: `envoyController/refreshProcessPremium`,
      payload: {
        groupCode: item.groupCode,
      },
    });
  };

  const statusForDisplay = item?.handledReason
    ? formatMessageApi({
        Label_Sider_Envoy: item?.handledReason,
      })
    : item?.status
      ? formatMessageApi({
          Label_BIZ_Claim: `app.navigator.drawer.pending.form.label.${item?.status}`,
        })
      : null;
  const showMedicalProvider = lodash
    .chain(item.reasonDetails)
    .some((reason) => {
      const haveMedicalProviderCode = reason?.pendingMemoList?.some(
        (memo: any) => !!memo?.medicalProviderCode
      );
      return !!reason.displayConfig?.medicalProvider || haveMedicalProviderCode;
    })
    .value();
  const showRemark = lodash
    .chain(item.reasonDetails)
    .some((reason) => {
      return lodash
        .chain(reason)
        .get('displayConfig.pendingMemo.children.showRemark')
        .isEqual(true)
        .value();
    })
    .value();

  const showSubcase = lodash
    .chain(item.reasonDetails)
    .some((reason) => {
      return lodash.chain(reason).get('displayConfig.subcase.visible').isEqual(true).value();
    })
    .value();
  const btns = (
    <div className={styles.btns}>
      <Button
        className={styles.standardButton}
        onClick={() => {
          setResonStatus('Resolve');
        }}
        disabled={!activePermission}
      >
        {formatMessageApi({ Label_Sider_Envoy: 'receivePending' })}
      </Button>
      <Button
        className={classnames(styles.standardButton, styles.waiveButton)}
        onClick={() => {
          setResonStatus('Waive');
        }}
        loading={waiveLoading}
        disabled={!activePermission}
      >
        {formatMessageApi({
          Label_BPM_Button: 'app.navigator.drawer.pending.button.waive',
        })}
      </Button>
    </div>
  );
  return (
    <>
      <div
        className={classnames(styles.envoyItemHeader, {
          [styles.upperBorder]: index !== 0,
          [styles.hideBottomBorder]: isNotHavePendingMemo,
        })}
      >
        <div className={styles.titleDisplay}>
          <div className={styles.gap}>
            <ValueComponent
              isDiv
              value={formatMessageApi({ Label_COM_General: 'PendingReason' })}
            />
            <ValueComponent isDiv isValue value={getReasonText(item)} />
            <div />
          </div>
          <div className={styles.gap}>
            <ValueComponent
              isDiv
              value={formatMessageApi({ Label_Sider_Envoy: 'pendingSendDate' })}
            />
            <ValueComponent isDiv isValue value={moment(item.startTime)?.format('L')} />
          </div>
          <div className={styles.gap}>
            <ValueComponent
              isDiv
              value={formatMessageApi({ Label_Sider_Envoy: 'pendingStatus' })}
            />
            <Status status={statusForDisplay === 'NTU' ? 'Overdue' : statusForDisplay} />
          </div>
          <div>
            {statusForDisplay === 'NTU' && (
              <div className={styles.gap}>
                <ValueComponent
                  isDiv
                  value={formatMessageApi({ Label_COM_General: 'PendingOverdueDate' })}
                />
                {moment(item.endTime)?.format('L')}
              </div>
            )}
          </div>
          <div className={classnames(styles.gap, styles.right)}>
            {isNotHavePendingMemo && !isFreeField ? btns : <></>}
          </div>
          <div className={styles.iconWrap}>
            {isNotHavePendingMemo && !isFreeField ? (
              <></>
            ) : (
              <Icon type={!expand ? 'up' : 'down'} onClick={() => setExpand(!expand)} />
            )}
          </div>
        </div>
        {!!showSubcase && (
          <div
            className={styles.subCaseNo}
            onClick={() => {
              history.push(`/opus/process/task/detail/${item?.reasonDetails?.[0]?.subTaskId}`);
            }}
          >
            <span>
              {formatMessageApi({ Label_BIZ_Claim: 'app.navigator.index.mode.card.case-no' })}:{' '}
            </span>
            <span>{item?.reasonDetails?.[0]?.subTaskId}</span>
          </div>
        )}
        <div>
          {!!expand &&
            (!isNotHavePendingMemo ? (
              <div className={styles.memoWrap}>
                <div style={{ marginTop: '10px' }}>
                  <EnvoyRow showMedicalProvider={showMedicalProvider} showRemark={showRemark}>
                    {formatMessageApi({ Label_Sider_Envoy: 'pendingCode' })}
                    {formatMessageApi({ Label_Sider_Envoy: 'pendingDesc' })}
                    {item.groupCode === 'P_BP_PND_CreditCardRefund'
                      ? formatMessageApi({
                          Label_COM_Envoy: 'description',
                        })
                      : formatMessageApi({ Label_Sider_Envoy: 'memoReason' })}
                    {formatMessageApi({
                      Label_BIZ_Claim:
                        'app.navigator.task-detail-of-data-capture.label.medical-provider',
                    })}
                    {formatMessageApi({ Label_COM_General: 'Remark' })}
                    {''}
                  </EnvoyRow>
                  <div>
                    {item?.reasonDetails?.flatMap(
                      ({ pendingMemoList, reasonCode, groupId, remark }: any) => {
                        return pendingMemoList?.map((memo) => (
                          <>
                            <EnvoyRow
                              key={memo.id}
                              showMedicalProvider={showMedicalProvider}
                              showRemark={showRemark}
                            >
                              {getPaddingCode(memo)}
                              {getPendingDescription(memo)}
                              {item.groupCode === 'P_BP_PND_CreditCardRefund'
                                ? remark
                                : getPendingMemoReason(memo)}
                              {getMedicalProviderName(memo?.medicalProviderCode)}
                              {memo?.pendingMemoSubInfoList?.[0]?.subRemark || '-'}
                              {memo?.memoStatus !== EMemoStatus.NOTRECEIVED ? (
                                <Status status={memo.memoStatus} />
                              ) : (
                                <div className={classnames(styles.right)}>
                                  <Button
                                    className={styles.standardButton}
                                    onClick={async () => {
                                      await setStatus(
                                        groupId,
                                        memo?.id,
                                        EMemoStatus.RECEIVED,
                                        memo?.memoCode
                                      );
                                      if (item.groupCode === 'P_BP_PND_CreditCardRefund') {
                                        dispatch({
                                          type: `envoyController/refreshProcessPremium`,
                                          payload: {
                                            groupCode: item.groupCode,
                                          },
                                        });
                                      }
                                    }}
                                    loading={memoStatusLoadingList.current?.has(memo?.id)}
                                    disabled={
                                      notSetResolve({
                                        globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
                                        selfAuth: lodash.get(item?.envoyAuth, ESelfAuthCode.EDIT),
                                        envoyData: item?.reasonDetails,
                                        status: item?.status,
                                        optItem: EMemoStatus.RECEIVED,
                                      }) || !activePermission
                                    }
                                  >
                                    {formatMessageApi({ Label_Sider_Envoy: 'receivePending' })}
                                  </Button>
                                  <Button
                                    className={styles.standardButton}
                                    onClick={() => {
                                      setStatus(
                                        groupId,
                                        memo?.id,
                                        EMemoStatus.WAIVED,
                                        memo?.memoCode
                                      );
                                    }}
                                    loading={memoStatusLoadingList.current?.has(memo?.id)}
                                    disabled={
                                      notSetResolve({
                                        globalAuth: lodash.get(authEnvoy, EGlobalAuthCode.EDIT),
                                        selfAuth: lodash.get(item?.envoyAuth, ESelfAuthCode.EDIT),
                                        envoyData: item?.reasonDetails,
                                        status: item?.status,
                                        optItem: EMemoStatus.WAIVED,
                                      }) || !activePermission
                                    }
                                  >
                                    {formatMessageApi({
                                      Label_BPM_Button: 'app.navigator.drawer.pending.button.waive',
                                    })}
                                  </Button>
                                </div>
                              )}
                            </EnvoyRow>
                            {memo.surveyCompany && (
                              <>
                                <ValueComponent
                                  value={formatMessageApi({ Label_Sider_Envoy: 'surveyCompany' })}
                                />
                                <ValueComponent
                                  isDiv
                                  isValue
                                  value={formatMessageApi({
                                    DropDown_ENV_SurveyCompany: memo.surveyCompany,
                                  })}
                                />
                              </>
                            )}
                          </>
                        ));
                      }
                    )}
                  </div>
                </div>
              </div>
            ) : (
              item?.reasonDetails?.map((reason) => {
                const sortModuleArr = getSortModuleArr(
                  lodash.isString(reason?.displayConfig)
                    ? safeParseUtil(reason?.displayConfig)
                    : reason?.displayConfig
                );
                // eslint-disable-next-line @typescript-eslint/no-shadow
                return sortModuleArr.map((item: any) => {
                  const Component = MapComponent[item?.moduleName];
                  return Component ? (
                    <Component
                      data={reason}
                      item={item}
                      editable={activePermission}
                      key={reason.id || index}
                      custom={item?.custom}
                      readOnly
                      btns={btns}
                      activePermission={activePermission}
                    />
                  ) : null;
                });
              })
            ))}
        </div>
      </div>
    </>
  );
};
