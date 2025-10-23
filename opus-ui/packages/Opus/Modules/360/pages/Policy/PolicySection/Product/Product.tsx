import React from 'react';
import { Collapse } from 'antd';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { useSelector } from 'dva';
import Loading from './Loading';
import BenefitType from './BenefitType';
import Section from '../../../../_component/Section';
import styles from './Product.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import SubStandardTag from 'opus/Modules/360/_component/SubStandardTag';

const { Panel } = Collapse;

const transConfig = {
  riskStatus: { type: 'status' },
  premiumStatus: { type: 'status' },
  issueEffectiveDate: { type: 'date' },
  riskCessationDate: { type: 'date' },
  sumAssured: { type: 'currency', currencyField: 'currency' },
  premiumAmount: { type: 'currency', currencyField: 'currency' },
  cashValue: { type: 'currency', currencyField: 'currency' },
  product: {
    type: 'pair',
    codeField: 'productCode',
    nameField: 'productName',
  },
  subStandard: {
    render: ({ content, data }: any) => {
      return <SubStandardTag value={content} subStandard={data.subStandard} />;
    },
  },
};

export default ({ item, exclusionList }: any) => {
  const productCode = item?.aliasProductCode || item?.productCode;
  const productName = item?.aliasProductCode ? item?.aliasProductName : item?.productName;

  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  const hasSubLayer =
    !!item?.benefitTypeInfoList?.length ||
    (BusinessCode.nb === businessCode && item?.loadingList?.length);

  return (
    <div className={styles.productContainer}>
      <Collapse bordered={false}>
        <Panel
          key={'product'}
          disabled={!hasSubLayer}
          showArrow={hasSubLayer}
          header={
            <>
              <div className={styles.title}>{t('policycoverageInformation')}</div>
              <Section
                sectionId={'Product'}
                transConfig={transConfig}
                data={{
                  ...item,
                  productCode,
                  productName,
                }}
              />
              {/* <span className={styles.coverageKey}>{item.coverageSeq} -</span> */}
              {/* <div>
                <div className={styles.display}>
                  {item?.beyondNel && (
                    <span className={styles.boder}>
                      {formatMessageApi({ Dropdown_CLM_IsBeyondNEL: item?.beyondNel })}
                    </span>
                  )}
                </div>
              </div> */}
            </>
          }
        >
          <div style={{ marginTop: '20px' }}>
            {!!item?.benefitTypeInfoList?.length && (
              <BenefitType
                benefitTypeInfoList={item.benefitTypeInfoList}
                shareLimitInfoList={item.shareLimitInfoList}
              />
            )}
            {BusinessCode.nb === businessCode &&
              item?.loadingList?.map((loadingItem, index) => (
                <Loading item={loadingItem} key={index} />
              ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
