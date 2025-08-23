import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { NAMESPACE } from '../activity.config';
import { getYearSuffix } from 'process/Utils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import {
  TreamentMultipleItem,
  ServiceMultipleItem,
  ProcedureMultipleItem,
  OtherProcedureMultipleItem,
} from './Configs/Sections';

const ListMultipleItem = ({ form, data, benefitItemData }: any) => {
  const mapSection = {
    [eBenefitCategory.Cashless]: <TreamentMultipleItem form={form} data={data} />,
    [eBenefitCategory.Aipa]: <TreamentMultipleItem form={form} data={data} />,
    [eBenefitCategory.Reimbursement]: <ServiceMultipleItem form={form} data={data} />,
    [eBenefitCategory.S]: <ProcedureMultipleItem form={form} data={data} />,
    [eBenefitCategory.Crisis]: <OtherProcedureMultipleItem form={form} data={data} />,
  };

  return <>{mapSection?.[benefitItemData?.benefitCategory]}</>;
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        data,
        listMapItemId,
        benefitItemData: { id: benefitItemId },
        dispatch,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableUpdateListMap`,
          payload: {
            id: data.id,
            listMapItemId,
            benefitItemId,
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
      return formUtils.mapObjectToFields({
        ...data,
        isStandaloneBooster,
        policyYear: `${getYearSuffix(Number(data.policyYear))} Policy Year`,
      });
    },
  })(ListMultipleItem)
);
