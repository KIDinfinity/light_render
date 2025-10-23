import type { FunctionComponent } from 'react';
import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataLayout from '@/components/DataLayout';
import TextWrap from '../../../_component/TextWrap';
import { formatAmount, getBenefitsFromType } from '../../../_functions';
import BenefitList from './BenefitList';

import style from './style.less';

interface IProps {
  productItem: any;
}

const ProductItem: FunctionComponent<IProps> = ({ productItem }) => {
  return (
    <div className={style.productItem}>
      <DataLayout span={12}>
        <TextWrap.White>
          {formatMessageApi({
            Dropdown_PRD_Product: productItem?.aliasProductCode || productItem?.productCode,
          })}
        </TextWrap.White>
        <TextWrap.White style={{ textAlign: 'right' }}>
          {formatAmount(productItem?.sumPayableAmount)}
        </TextWrap.White>
      </DataLayout>
      <BenefitList benefitList={getBenefitsFromType(productItem?.benefitTypePayableList)} />
    </div>
  );
};

export default ProductItem;
