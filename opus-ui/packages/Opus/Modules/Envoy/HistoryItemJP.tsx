import React, { useState } from 'react';
import { Icon, Row, Col } from 'antd';
import { useSelector } from 'dva';
import moment from 'moment';
import lodash from 'lodash';
import getSortModuleArr from 'bpm/pages/Envoy/_utils/getSortModuleArr';
import MapComponent from './Components/MapComponent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Status from './Components/Status';
import classnames from 'classnames';
import ValueComponent from './Components/ValueComponent';
import { safeParseUtil } from '@/utils/utils';
import { getPaddingCode, getPendingDescription } from './Function';

import { getReasonText } from './Utils';
import styles from './index.less';

const EnvoyRow = ({ children }: any) => {
  return (
    <Row style={{ marginTop: '10px' }}>
      <Col span={4}>
        <ValueComponent isDiv isValue value={children[0]} />
      </Col>
      <Col span={9}>
        <ValueComponent isDiv isValue value={children[1]} />
      </Col>
      <Col span={5}>
        <ValueComponent isDiv isValue value={children[2]} />
      </Col>
      <Col span={3}>
        <ValueComponent isDiv isValue value={children[3]} />
      </Col>
      <Col span={3}>
        <ValueComponent isDiv isValue value={children[4]} />
      </Col>
    </Row>
  );
};

export default ({ item, index }: any) => {
  const [expand, setExpand] = useState(false);

  const listMemosMap = useSelector((state: any) => state.envoyController.listMemos) || {};

  // 没有pendingMemo
  const isNotHavePendingMemo = item?.reasonDetails?.every(
    (listItem) => !listItem?.pendingMemoList?.length
  );

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
      {!!expand &&
        (!isNotHavePendingMemo ? (
          <>
            <EnvoyRow>
              <ValueComponent value={formatMessageApi({ Label_Sider_Envoy: 'pendingCode' })} />
              <ValueComponent value={formatMessageApi({ Label_Sider_Envoy: 'pendingDesc' })} />
              <ValueComponent value={formatMessageApi({ Label_COM_General: 'Remark' })} />
              <ValueComponent value={formatMessageApi({ Label_Sider_Envoy: 'status' })} />
              <ValueComponent value={formatMessageApi({ Label_BIZ_Claim: 'Receive Date' })} />
            </EnvoyRow>
            {item?.reasonDetails?.flatMap(({ pendingMemoList, reasonCode }) => {
              return pendingMemoList?.map((memo) => {
                return (
                  <>
                    <EnvoyRow key={memo.id}>
                      {getPaddingCode(memo)}
                      {getPendingDescription(memo)}
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
