import React, { Children, useState } from 'react';
import { Icon, Row, Col } from 'antd';
import moment from 'moment';
import lodash from 'lodash';
import { history } from 'umi';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from './Components/MapComponent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Status from './Components/Status';
import classnames from 'classnames';
import ValueComponent from './Components/ValueComponent';
import { safeParseUtil } from '@/utils/utils';
import { getPaddingCode, getPendingMemoReason, getPendingDescription } from './Function';
import useGetMedicalProviderDicts from 'bpm/pages/Envoy/hooks/useGetMedicalProviderDicts';

import { getReasonText } from './Utils';
import styles from './index.less';

const EnvoyRow = ({ children, showMedicalProvider, showRemark }: any) => {
  const spans = (() => {
    if (showMedicalProvider && showRemark) {
      return [4, 2, 3, 3, 4, 3, 3];
    }
    if (!showMedicalProvider && showRemark) {
      return [5, 5, 4, 5, 4, 3, 3];
    }
    if (!showMedicalProvider && !showRemark) {
      return [4, 8, 4, 0, 0, 3, 5];
    }
    if (showMedicalProvider && !showRemark) {
      return [4, 5, 4, 5, 0, 3, 3];
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
  const getMedicalProviderName = useGetMedicalProviderDicts();

  // 没有pendingMemo
  const isNotHavePendingMemo = item?.reasonDetails?.every(
    (listItem) => !listItem?.pendingMemoList?.length
  );
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

  return (
    <>
      <div
        className={classnames(styles.envoyItemHeader, {
          [styles.upperBorder]: index !== 0,
          [styles.hideBottomBorder]: isNotHavePendingMemo,
        })}
      >
        <div className={styles.gap}>
          <ValueComponent isDiv value={formatMessageApi({ Label_COM_General: 'PendingReason' })} />
          <ValueComponent isDiv isValue value={getReasonText(item)} />
        </div>
        <div className={styles.gap}>
          <ValueComponent
            isDiv
            value={formatMessageApi({ Label_Sider_Envoy: 'pendingSendDate' })}
          />
          <ValueComponent
            isDiv
            isValue
            value={!!item.startTime ? moment(item.startTime)?.format('L') : null}
          />
        </div>
        <div className={styles.iconWrap}>
          {isNotHavePendingMemo ? (
            <> </>
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

      {!!expand &&
        (!isNotHavePendingMemo ? (
          <>
            <EnvoyRow showMedicalProvider={showMedicalProvider} showRemark={showRemark}>
              {formatMessageApi({ Label_Sider_Envoy: 'pendingCode' })}
              {formatMessageApi({ Label_Sider_Envoy: 'pendingDesc' })}
              {formatMessageApi({ Label_Sider_Envoy: 'memoReason' })}
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.medical-provider',
              })}
              {formatMessageApi({ Label_COM_General: 'Remark' })}
              {formatMessageApi({ Label_Sider_Envoy: 'status' })}
              {formatMessageApi({ Label_BIZ_Claim: 'Receive Date' })}
            </EnvoyRow>
            {item?.reasonDetails?.flatMap(({ pendingMemoList, reasonCode }) => {
              const ignoreCopyPendingMemoList =
                pendingMemoList?.filter((ele) => ele?.statusChangeReason !== 'copy') || [];
              return ignoreCopyPendingMemoList?.map((memo) => {
                return (
                  <>
                    <EnvoyRow
                      key={memo.id}
                      showMedicalProvider={showMedicalProvider}
                      showRemark={showRemark}
                    >
                      {getPaddingCode(memo)}
                      {getPendingDescription(memo)}
                      {getPendingMemoReason(memo)}
                      {getMedicalProviderName(memo?.medicalProviderCode)}
                      {memo?.pendingMemoSubInfoList?.[0]?.subRemark || '-'}
                      {<Status status={memo.memoStatus} />}
                      {!!memo.statusChangeTime && moment(memo.statusChangeTime)?.format('L')}
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
                );
              });
            })}
          </>
        ) : (
          item?.reasonDetails?.map((reason) => {
            const sortModuleArr = getSortModuleArr(
              lodash.isString(reason?.displayConfig)
                ? safeParseUtil(reason?.displayConfig)
                : reason?.displayConfig
            );
            return sortModuleArr.map((i: any) => {
              const Component = MapComponent[i?.moduleName];
              return Component ? (
                <Component
                  data={reason}
                  item={item}
                  key={reason.id || index}
                  custom={item?.custom}
                  readOnly
                />
              ) : null;
            });
          })
        ))}
    </>
  );
};
