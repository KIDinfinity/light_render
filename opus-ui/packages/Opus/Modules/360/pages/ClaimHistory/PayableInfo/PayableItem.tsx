import type { FunctionComponent } from 'react';
import React from 'react';
import { Collapse } from 'antd';
import { useSelector } from 'dva';
import { BusinessCode } from 'claim/enum/BusinessCode';
import DataLayout from '@/components/DataLayout';
import Section from '../../../_component/Section';
import styles from './style.less';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';

interface IProps {
  payableItem: any;
}

const { DataItem } = DataLayout;
const { Panel } = Collapse;

const transConfig = {
  sumPayableAmount: { type: 'currency', currencyField: 'policyCurrency' },
  policyPaymentDecision: { type: 'status' },
  mainProduct: {
    type: 'pair',
    codeField: 'mainProductCode',
    nameField: 'mainProductName',
  },
};

const PayableItem: FunctionComponent<IProps> = ({ payableItem }) => {
  const businessCode: string =
    useSelector(({ insured360 }: any) => insured360.taskInfo?.businessCode) || '';

  const section = <Section sectionId={'Payment'} transConfig={transConfig} data={payableItem} />;

  if (businessCode !== BusinessCode.claim) {
    return (
      <div className={styles.payableItem}>
        <div className={styles.title}>{t('policypaymentInfomation')}</div>
        {section}
      </div>
    );
  }

  const data =
    payableItem?.productPayableList
      ?.map(
        ({ benefitTypePayableList, ...productFields }) =>
          benefitTypePayableList?.map(
            ({ benefitItemPayableList, ...benefitTypeFields }) =>
              benefitItemPayableList?.map((benefitItem) => ({
                ...benefitItem,
                ...benefitTypeFields,
                ...productFields,
              })) || { ...benefitTypeFields, ...productFields }
          ) || productFields
      )
      ?.flat(Infinity) || [];
  const paymentBenefitTransConfig = {
    product: {
      type: 'pair',
      codeField: 'productCode',
      nameField: 'productName',
    },
    sumPayableAmount: { type: 'currency', currencyField: 'policyCurrency' },
    payableAmount: { type: 'currency', currencyField: 'policyCurrency' },
  };
  return (
    <div className={styles.payableItem}>
      <Collapse bordered={false}>
        <Collapse.Panel
          key={'payment'}
          header={
            <>
              <div className={styles.title}>{t('policypaymentInfomation')}</div>
              {section}
            </>
          }
          disabled={!data?.length}
          showArrow={!!data.length}
        >
          {data.map((item, index) => (
            <div className={styles.productContainer} key={index}>
              <div className={styles.title}>{t('benefitItem')}</div>
              <Section
                sectionId={'PaymentBenefit'}
                transConfig={paymentBenefitTransConfig}
                data={{
                  ...item,
                  productCode: item?.aliasProductCode ? item?.aliasProductCode : item?.productCode,
                  productName: item?.aliasProductCode ? item.aliasProductName : item?.productName,
                }}
              />
            </div>
          ))}

          {/* <ProductList productList={payableItem?.productPayableList} /> */}
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};

export default PayableItem;
