import type { FunctionComponent } from 'react';
import React from 'react';
import lodash from 'lodash';
import BenefitItem from './BenefitItem';
import { add } from '@/utils/precisionUtils';
import { tenant, Region } from '@/components/Tenant';

interface IProps {
  benefitList: any[];
}

const BenefitList: FunctionComponent<IProps> = ({ benefitList }) => {
  // 给payable分类
  const getPayableType = (payable: any) => {
    return Number(payable) < 0 ? 0 : Number(payable) === 0 ? 1 : 2;
  };

  // 数据重组
  const newBenefitList = tenant.region({
    [Region.JP]: () => {
      return lodash.reduce(
        benefitList,
        (arr: any, item: any) => {
          const { benefitSubCategory, hospitalizationSequentialNo, payableAmount } = item || {};
          if (benefitSubCategory !== 'OP') return [...arr, item];

          const keys = `${benefitSubCategory}_${hospitalizationSequentialNo}_${getPayableType(
            payableAmount
          )}`;
          const existItem = lodash.find(arr, { keys }) || {};

          return !lodash.isEmpty(existItem)
            ? lodash.map(arr, (el: any) => {
                return el.keys === keys
                  ? {
                      ...el,
                      payableAmount: add(item.payableAmount, el.payableAmount),
                      payableDays: add(item.payableDays, el.payableDays),
                    }
                  : el;
              })
            : [
                ...arr,
                {
                  ...item,
                  keys,
                },
              ];
        },
        []
      );
    },
    notMatch: benefitList,
  });

  return (
    <>
      {lodash.map(newBenefitList, (item: any, index: number) => (
        <BenefitItem benefitItem={item} key={`${item.id}-${index}`} />
      ))}
    </>
  );
};

export default BenefitList;
