import React from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import { NAMESPACE } from '../activity.config';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import ListMultipleItem from './ListMultipleItem';
import {
  TreamentMultiple,
  ServiceMultiple,
  ProcedureMultiple,
  OtherProcedureMultiple,
} from './Configs/Sections';

const ListMultiple = ({ form, data, benefitItemData }: any) => {
  const defaultProps = {
    form,
    data,
  };

  const mapSection = {
    [eBenefitCategory.Cashless]: <TreamentMultiple {...defaultProps} />,
    [eBenefitCategory.Aipa]: <TreamentMultiple {...defaultProps} />,
    [eBenefitCategory.Reimbursement]: <ServiceMultiple {...defaultProps} />,
    [eBenefitCategory.S]: <ProcedureMultiple {...defaultProps} />,
    [eBenefitCategory.Crisis]: <OtherProcedureMultiple {...defaultProps} />,
  };

  return (
    <div>
      {mapSection?.[benefitItemData?.benefitCategory]}
      {formUtils.queryValue(data.chooise)
        ? lodash
            .chain(data.childrenMap)
            .values()
            .orderBy('policyYear')
            .value()
            .map((item: any) => (
              <ListMultipleItem
                benefitItemData={benefitItemData}
                key={item.id}
                listMapItemId={data.id}
                data={item}
              />
            ))
        : null}
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        benefitItemData: { id: benefitItemId },
        listMapItemId,
        dispatch,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableUpdateListMapChoice`,
          payload: {
            benefitItemId,
            listMapItemId,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const {
        data,
        benefitItemData: { isStandaloneBooster },
      } = props;
      // TODO:这里应该用额外参数去区分不同的产品类型
      return formUtils.mapObjectToFields({
        ...data,
        isStandaloneBooster,
        invoiceNo: lodash.values(data?.childrenMap)[0]?.invoiceNo,
      });
    },
  })(ListMultiple)
);
