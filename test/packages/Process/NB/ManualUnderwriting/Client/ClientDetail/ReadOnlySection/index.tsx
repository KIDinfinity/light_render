import React, { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Col, Icon, Tooltip } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleSkipToLink from 'process/NB/ManualUnderwriting/_hooks/useHandleSkipToLink';
import useJudgeEvevryFieldsDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';
import useCalcFieldSpan from 'process/NB/ManualUnderwriting/_hooks/useCalcFieldSpan';
import useFilterSubCardNoExpendFields from 'process/NB/ManualUnderwriting/_hooks/useFilterSubCardNoExpendFields';
import useGetinsuredRoleByClientId from 'process/NB/ManualUnderwriting/_hooks/useGetinsuredRoleByClientId';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';
import styles from './index.less';

interface IProps {
  data?: any[];
  icon: string | React.ReactNode;
  tagList?: any[];
  id: string;
  expand: boolean;
  isSubCard: boolean;
}

export default ({ data, icon, expand, tagList, id, isSubCard }: IProps) => {
  const isDiplayAll = useJudgeEvevryFieldsDisplay({ id, expand });
  const filterSubCardNoExpendFields = useFilterSubCardNoExpendFields({ data });
  const isGBSN = useJudgeIsGBSN();
  const insuredRole = useGetinsuredRoleByClientId({ clientId: id });
  const isShowMonthlyIncomeRange = isGBSN && insuredRole === 'PI';
  let mainInfo = isSubCard && !expand ? filterSubCardNoExpendFields : data;
  mainInfo = useMemo(() => {
    return lodash
      .chain(mainInfo)
      .filter((item) => {
        if (isDiplayAll && !isSubCard) {
          return true;
        }
        if (!expand) {
          return item.expand === 'Y';
        }
        if (!isShowMonthlyIncomeRange) {
          return item.key !== 'monthlyIncomeRange';
        }
        return true;
      })
      .value();
  }, [mainInfo, isDiplayAll, expand, isSubCard]);
  const LocalCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode,
    shallowEqual
  );
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList,
    shallowEqual
  );
  const contractCurrency = lodash.find(
    clientInfoList,
    (item: any) => item?.id === id
  )?.annualIncomeCurrency;
  const localCurrencyShow = !lodash.isEqual(LocalCurrency, contractCurrency);
  const handleSkipToLink = useHandleSkipToLink({ id });
  const Item = ({ itemKey, currencyShow, span, index, title, value }: any) => {
    const spanResult = useCalcFieldSpan({
      span,
      expand,
      currencyShow,
      data,
      itemKey,
      isDiplayAll,
      isSubCard: isSubCard,
    });
    return (
      <Col className={styles.info} key={index} span={spanResult} data-id={itemKey}>
        <span className={classnames(styles.label, styles[itemKey])} title={title}>
          {itemKey !== 'annualIncomeInLocalCurrency' &&
            itemKey !== 'monthlyIncomeInLocalCurrency' &&
            title}
        </span>
        <span
          data-datakey={itemKey}
          className={classnames(styles.value, {
            [styles.dataValue]: !['secondaryContactType', 'secondaryContactNo'].includes(itemKey),
          })}
          title={value}
        >
          {lodash.isArray(value)
            ? lodash.map(value, (item: any) => (
                <div className={styles.table} key={item}>
                  <span className={styles.item}>{formUtils.queryValue(item)}</span>
                </div>
              ))
            : formUtils.queryValue(value)}
          {(itemKey === 'annualIncome' || itemKey === 'monthlyIncome') && (
            <span className={styles.currency}>{contractCurrency}</span>
          )}
          {(itemKey === 'annualIncomeInLocalCurrency' ||
            itemKey === 'monthlyIncomeInLocalCurrency') && (
            <span className={styles.currency}>{LocalCurrency}</span>
          )}
        </span>
      </Col>
    );
  };

  return (
    <>
      {mainInfo?.length || lodash.get(tagList, 'length') ? (
        <div className={styles.container}>
          <span className={styles.icon}>
            {typeof icon === 'string' && <Icon type={icon} />}
            {React.isValidElement(icon) && icon}
          </span>
          <div className={styles.infoWrap}>
            {tagList && lodash.get(tagList, 'length') > 0 && (
              <div className={styles.tagList}>
                {lodash.map(tagList, (item, index) => {
                  return (
                    <span
                      key={index}
                      className={classnames(styles.tag, styles[item.status])}
                      onClick={() => handleSkipToLink({ item })}
                    >
                      <Tooltip placement="topLeft" title={item?.tooltipTitle}>
                        <span className={classnames(styles.label)}>{item.label}</span>
                      </Tooltip>
                    </span>
                  );
                })}
              </div>
            )}
            <Row className={styles.infoList} gutter={[8, 8]}>
              {lodash
                .chain(mainInfo)
                .map((item: any, index: number) => {
                  const currencyShow =
                    item.key === 'annualIncomeInLocalCurrency' ||
                    item.key === 'annualIncome' ||
                    item.key === 'monthlyIncomeInLocalCurrency' ||
                    item.key === 'monthlyIncome';
                  if (
                    item.key === 'annualIncomeInLocalCurrency' ||
                    item.key === 'monthlyIncomeInLocalCurrency'
                  ) {
                    if (localCurrencyShow) {
                      return (
                        <div
                          key={index}
                          className={classnames(
                            styles.annualIncomeInLocalCurrency,
                            'ant-col',
                            { 'ant-col-4': !expand },
                            { 'ant-col-12': expand }
                          )}
                        >
                          <Icon type="swap" className={styles.iconSwap} />
                          <Item
                            itemKey={item.key}
                            currencyShow={currencyShow}
                            span={item.span}
                            index={index}
                            title={item.label}
                            value={getFieldDisplayAmount(
                              item.value,
                              'nb.policyList.clientInfo.annualIncome'
                            )}
                          />
                        </div>
                      );
                    } else {
                      return <></>;
                    }
                  } else if (
                    item.key === 'annualIncome' ||
                    item.key === 'monthlyIncome' ||
                    item.key === 'annualPremEquivalent'
                  ) {
                    return (
                      <Item
                        key={index}
                        itemKey={item.key}
                        currencyShow={currencyShow}
                        span={item.span}
                        index={index}
                        title={item.label}
                        value={getFieldDisplayAmount(
                          item.value,
                          'nb.policyList.clientInfo.annualIncome'
                        )}
                      />
                    );
                  } else {
                    return (
                      <Item
                        key={index}
                        itemKey={item.key}
                        currencyShow={currencyShow}
                        span={item.span}
                        index={index}
                        title={item.label}
                        value={item.value}
                      />
                    );
                  }
                })
                .value()}
            </Row>
          </div>
        </div>
      ) : null}
    </>
  );
};
