import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import useLoadPlanProductionDuration from 'decision/components/Benefit/Edit/_hooks/useLoadPlanProductionDuration';
import useGetPlaninfotableEditable from 'decision/components/Benefit/_hooks/useGetPlaninfotableEditable.ts';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Fields, localConfig } from 'decision/SectionFields/UWDecision-Table';
import ClientId from '../ClientId';
import { tenant, Region } from '@/components/Tenant';

const UWDecisiontable = ({ form, data }: any) => {
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(data, 'notManualRemove') === 'Y';
  const disabledForMain = tenant.region({
    [Region.VN]: data?.isMain === 'Y',
    [Region.TH]: data?.isMain === 'Y' && data?.productCategory === 'UL',
    noMatch: false,
  });
  const disabledForRiders = tenant.region({ [Region.VN]: data?.isMain === 'N', noMatch: false });
  const clientId = useMemo(() => {
    return formUtils.queryValue(lodash.chain(data).get('coverageInsuredList[0].clientId').value());
  }, [data]);
  useLoadPlanProductionDuration({ coverageItem: data });

  return (
    <Section
      section="UWDecision-Table"
      form={form}
      editable={editable && !notManualRemove}
      localConfig={localConfig}
      formId={`UWDecision-Table${data.id}`}
      readOnly={false}
    >
      <ClientId data={data} id={data?.id} />
      <Fields.Corecode id={data?.id} clientId={clientId} disabledForMain={disabledForMain} />
      <Fields.Currencycode id={data?.id} />
      <Fields.SumAssuredMultiplier id={data?.id} coreCode={formUtils.queryValue(data?.coreCode)} />
      <Fields.Sumassured id={data?.id} coreCode={data?.coreCode} />
      <Fields.Uptoage id={data?.id} />
      <Fields.Unit id={data?.id} />
      <Fields.Numberofunits id={data?.id} />
      <Fields.DeductibleOption id={data?.id} coverageItem={data} />
      <Fields.Indemnifyperiod
        id={data?.id}
        coreCode={data?.coreCode}
        coverageItem={data}
        disabledForMain={disabledForMain}
      />
      <Fields.Riskage id={data?.id} coreCode={data?.coreCode} coverageItem={data} />
      <Fields.Payperiod id={data?.id} coreCode={data?.coreCode} coverageItem={data} />
      <Fields.Premcessage id={data?.id} coverageItem={data} />
      <Fields.GuaranteedMonthlyPayout id={data?.id} coreCode={data?.coreCode} />
      <Fields.ReturnOfPremium id={data?.id} editable={data.showRop} />
      <Fields.Basepremium id={data?.id} disabledForRiders={disabledForRiders} />
      <Fields.Annualprem id={data?.id} />
      <Fields.Discountcode id={data?.id} />
      <Fields.Discount id={data?.id} />
      <Fields.FinalCOI id={data?.id} />
      <Fields.WaiverProduct id={data?.id} coreCode={formUtils.queryValue(data?.coreCode)} />
      <Fields.LAsharingGroupNumber id={data?.id} coverageItem={data} />
      <Fields.Initialinvestmentannualpremium id={data?.id} coverageItem={data} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setDecisionFieldData',
          payload: {
            changedFields,
            id: data?.id,
            errorId: data?.id,
          },
        });
      }
    },

    mapPropsToFields(props) {
      const { data, basicCurrencyCode } = props;

      const _data = formUtils.mapObjectToFields({
        ...data,
        guaranteedMonthlyPayout: lodash.get(data, 'guaranteedMonthlyPayout'),
        numberOfUnits: lodash.get(data, 'unit'),
        deductibleOption: lodash.get(data, 'deductibleOption'),
        waiveProductList: lodash.isArray(data?.waiveProductList)
          ? data?.waiveProductList.map((waive: any) =>
              lodash.isString(waive) ? waive : waive?.waiveProduct
            )
          : data?.waiveProductList,
        laSharingGroupNumber: formUtils.queryValue(
          data?.uwProposalHealthFamilySharing?.laSharingGroupNumber
        ),
        currencyCode: lodash.isEmpty(basicCurrencyCode) ? data?.currencyCode : basicCurrencyCode,
      });
      return _data;
    },
  })(UWDecisiontable)
);
