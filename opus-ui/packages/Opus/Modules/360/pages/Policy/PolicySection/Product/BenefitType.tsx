import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { useSelector } from 'dva';
import DataLayout from '@/components/DataLayout';
import { subtract } from '@/utils/precisionUtils';
import Section from '../../../../_component/Section';
import styles from './SubList.less';
import classnames from 'classnames';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

const { DataItem } = DataLayout;

const transConfig = {
  benefitType: {
    type: 'pair',
    codeField: 'benefitTypeCode',
    nameField: 'benefitTypeName',
  },
  benefitItem: {
    type: 'pair',
    codeField: 'benefitItemCode',
    nameField: 'benefitItemName',
  },
};

export default ({ benefitTypeInfoList, shareLimitInfoList }) => {
  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  if (businessCode !== BusinessCode.claim) {
    return (
      <div className={styles.itemContainer}>
        <div className={styles.title}>{t('benefitList')}</div>
        <Section sectionId={'Benefit'} titleOnly />
        <div className={styles.itemText}>
          {benefitTypeInfoList.map((item, index) => (
            <Section
              sectionId={'Benefit'}
              transConfig={transConfig}
              key={`${item.benefitTypeCode}_${item.benefitItemCode}_${item.calculatorCode}_${index}`}
              hideTitle
              data={{
                ...item,
                benefitType: `${item?.benefitTypeCode || ''} ${item?.benefitTypeName || ''}`,
                limit: formatMessageApi(
                  {
                    Dropdown_CLM_BenefitLimit: item?.limitCode,
                  },
                  item?.spcParamValue
                ),
                remainingBalance: item?.showRemainingBalance
                  ? subtract(item?.limitValue, item?.amount) > 0
                    ? subtract(item?.limitValue, item?.amount)
                    : 0
                  : '',
                remark: `${item?.calculateFormula || ''}${
                  item?.calculateFormula && item?.limitLayer ? ',' : ''
                }${item?.limitLayer || ''}`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {benefitTypeInfoList.map(
        ({ benefitItemInfoList, limitInfoList: benefitTypeLimitList, benefitTypeCode }) => {
          return (
            <div className={styles.itemContainer} key={benefitTypeCode}>
              <div className={styles.title}>
                {formatMessageApi({ Label_CLM_Opus: 'benefitList' })}
              </div>
              <DataLayout span={24} justify="flex-start">
                <DataItem
                  title={formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-claim-assessment.label.benefit-type',
                  })}
                >
                  {`${benefitTypeCode} ${formatMessageApi({ Dropdown_PRD_BenefitType: benefitTypeCode })}`}
                </DataItem>
              </DataLayout>
              {benefitTypeLimitList?.length ? (
                <div
                  className={classnames(styles.itemContainer, styles.subContainer)}
                  key={'benefitTypeLimit'}
                >
                  <Section sectionId={'Benefit'} titleOnly />
                  {benefitTypeLimitList.map((limitItem, index) => (
                    <Section
                      sectionId={'Benefit'}
                      transConfig={{}}
                      key={index}
                      hideTitle
                      data={{
                        ...limitItem,
                        limitValue:
                          limitItem?.limitValue === -1 ? 'Unlimited' : limitItem?.limitValue,
                        limit: formatMessageApi(
                          {
                            Dropdown_CLM_BenefitLimit: limitItem?.limitCode,
                          },
                          limitItem?.spcParamValue
                        ),
                        remainingBalance: limitItem?.showRemainingBalance
                          ? subtract(limitItem?.limitValue, limitItem?.amount) > 0
                            ? subtract(limitItem?.limitValue, limitItem?.amount)
                            : 0
                          : '',
                        remark: `${limitItem?.calculateFormula || ''}${
                          limitItem?.calculateFormula && limitItem?.limitLayer ? ',' : ''
                        }${limitItem?.limitLayer || ''}`,
                      }}
                    />
                  ))}
                </div>
              ) : null}
              {benefitItemInfoList.map(({ limitInfoList, benefitItemCode }) => {
                return (
                  <div
                    className={classnames(styles.itemContainer, styles.subContainer)}
                    key={benefitItemCode}
                  >
                    <DataLayout span={24} justify="flex-start">
                      <DataItem
                        title={formatMessageApi({
                          Label_BIZ_Claim:
                            'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
                        })}
                      >
                        {`${benefitItemCode} ${formatMessageApi({ Dropdown_PRD_BenefitItem: benefitItemCode })}`}
                      </DataItem>
                    </DataLayout>
                    <Section sectionId={'Benefit'} titleOnly />
                    <div className={styles.itemText}>
                      {limitInfoList.map((limitItem, index) => (
                        <Section
                          sectionId={'Benefit'}
                          transConfig={{}}
                          key={index}
                          hideTitle
                          data={{
                            ...limitItem,
                            limitValue:
                              limitItem?.limitValue === -1 ? 'Unlimited' : limitItem?.limitValue,
                            limit: formatMessageApi(
                              {
                                Dropdown_CLM_BenefitLimit: limitItem?.limitCode,
                              },
                              limitItem?.spcParamValue
                            ),
                            remainingBalance: limitItem?.showRemainingBalance
                              ? subtract(limitItem?.limitValue, limitItem?.amount) > 0
                                ? subtract(limitItem?.limitValue, limitItem?.amount)
                                : 0
                              : '',
                            remark: `${limitItem?.calculateFormula || ''}${
                              limitItem?.calculateFormula && limitItem?.limitLayer ? ',' : ''
                            }${limitItem?.limitLayer || ''}`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
      )}
    </>
  );
};
