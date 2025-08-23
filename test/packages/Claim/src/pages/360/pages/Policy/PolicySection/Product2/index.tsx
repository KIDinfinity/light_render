import React from 'react';
import { Card } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatDate } from '../../../../_functions';
import styles from './index.less';

export default function Product({ productInfoList, mainProductCode }: any) {
  const productGroupList = lodash
    .chain(productInfoList)
    .groupBy('productCode')
    .map((products, productCode) => {
      return {
        productCode,
        products,
      };
    })
    .orderBy((item) => item?.productCode === mainProductCode || item?.productCode)
    .value();
  return (
    <Card
      title={formatMessageApi({ Label_BIZ_Policy: 'Coverage' })}
      className={styles.productCard}
      bordered={false}
    >
      {lodash.map(productGroupList, (productGroup: any) => (
        <div className={styles.productItem}>
          <div className={styles.itemHeader}>
            <div className={styles.title}>
              {productGroup?.products?.[0]?.aliasProductCode || productGroup?.productCode}
              {productGroup?.products?.[0]?.aliasProductCode || productGroup?.productCode
                ? ' - '
                : ''}
              {formatMessageApi({
                Dropdown_PRD_Product:
                  productGroup?.products?.[0]?.aliasProductCode || productGroup?.productCode,
              })}
            </div>
            {productGroup?.products?.[0]?.coverageType && (
              <div className={styles.tag}>
                {formatMessageApi({ risk_status: productGroup?.products?.[0]?.coverageType })}
              </div>
            )}
          </div>
          <div className={styles.itemDetail}>
            <table>
              <tr>
                <th>{formatMessageApi({ Label_BIZ_Individual: 'INS' })}</th>
                <th>{formatMessageApi({ Label_BIZ_Policy: 'SumAssured' })}</th>
                <th>{formatMessageApi({ Label_BIZ_Policy: 'PremAmount' })}</th>
                <th>{formatMessageApi({ Label_BIZ_Policy: 'PremiumPaidUpStatus' })}</th>
                <th>{formatMessageApi({ Label_BIZ_Policy: 'BenefitTerm' })}</th>
                <th>{formatMessageApi({ Label_BIZ_Policy: 'PolicyStatus' })}</th>
              </tr>
              {lodash.map(productGroup?.products, (product: any) => (
                <tr>
                  <td>{product?.insuredId}</td>
                  <td>{product?.sumAssured}</td>
                  <td>{product?.premiumAmount}</td>
                  <td>
                    {formatMessageApi({ Dropdown_POL_PremiumStatus: product?.premiumStatus })}
                  </td>

                  <td>
                    {product?.issueEffectiveDate && formatDate(product?.issueEffectiveDate)} -{' '}
                    {product?.riskCessationDate && formatDate(product?.riskCessationDate)}
                  </td>
                  <td>{formatMessageApi({ risk_status: product?.riskStatus })}</td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      ))}
    </Card>
  );
}
