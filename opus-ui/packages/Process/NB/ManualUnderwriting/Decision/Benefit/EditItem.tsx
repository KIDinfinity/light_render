import React, { useMemo } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useLoadPlanProductionDuration from 'process/NB/ManualUnderwriting/_hooks/useLoadPlanProductionDuration';
import useGetPlaninfotableEditable from 'process/NB/ManualUnderwriting/_hooks/useGetPlaninfotableEditable';
import useJudgeCoverageAppliedChange from 'process/NB/ManualUnderwriting/_hooks/useJudgeCoverageAppliedChange';

import { NAMESPACE } from '../../activity.config';
import { Fields, localConfig } from './Section';
import ClientId from './ClientId';
import { tenant, Region } from '@/components/Tenant';

const Planinfotable = ({ form, data }: any) => {
  const editable = useGetPlaninfotableEditable();
  const notManualRemove = lodash.get(data, 'notManualRemove') === 'Y';
  const coverageAppliedChange = useJudgeCoverageAppliedChange({
    coverageId: data?.id,
  });
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
      disabled={!!coverageAppliedChange}
    >
      <ClientId data={data} id={data?.id} />
      <Fields.Corecode id={data?.id} clientId={clientId} disabledForMain={disabledForMain} />
      <Fields.Currencycode id={data?.id} />
      <Fields.Sumassured id={data?.id} coreCode={data?.coreCode} />
      <Fields.Uptoage id={data?.id} />
      <Fields.Numberofunits id={data?.id} />
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
      <Fields.SumAssuredMultiplier id={data?.id} coreCode={formUtils.queryValue(data?.coreCode)} />
      <Fields.Annualprem id={data?.id} />
      <Fields.Discountcode id={data?.id} />
      <Fields.Discount id={data?.id} />
      <Fields.FinalCOI id={data?.id} />
      <Fields.WaiverProduct id={data?.id} coreCode={formUtils.queryValue(data?.coreCode)} />
      <Fields.LAsharingGroupNumber id={data?.id} coverageItem={data}/>
    </Section>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  coverageList: lodash.get(modelnamepsace, 'businessData.policyList[0].coverageList', []),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, data } = props;
      if (
        formUtils.shouldUpdateState(changedFields) ||
        (lodash.has(changedFields, 'sumAssured') && lodash.values(changedFields)?.length == 1)
      ) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setDecisionFieldData',
              payload: {
                changedFields,
                id: data?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setDecisionFieldData',
            payload: {
              changedFields,
              id: data?.id,
            },
          });
        }
      }
    },

    mapPropsToFields(props) {
      let { data } = props;
      const { coverageList } = props;

      const uwProposalHealthFamilySharing = lodash
      .chain(coverageList)
      .find((item: any) => item?.id === data.id)
      .get('uwProposalHealthFamilySharing')
      .value();
      const basicCurrencyCode = lodash
        .chain(coverageList)
        .find((item: any) => item?.isMain === 'Y')
        .get('currencyCode')
        .value();
      if (!lodash.isEmpty(basicCurrencyCode)) {
        data = {
          ...data,
          currencyCode: basicCurrencyCode,
        };
      }
      return formUtils.mapObjectToFields({
        ...data,
        guaranteedMonthlyPayout: lodash.get(data, 'guaranteedMonthlyPayout'),
        numberOfUnits: lodash.get(data, 'unit'),
        waiveProductList: lodash.isArray(data?.waiveProductList)
          ? data?.waiveProductList.map((waive: any) =>
              lodash.isString(waive) ? waive : waive?.waiveProduct
            )
          : data?.waiveProductList,
        sumAssuredMultiplier: lodash.toString(formUtils.queryValue(data?.sumAssuredMultiplier)),
        returnOfPremium: lodash.toString(formUtils.queryValue(data?.returnOfPremium)),
        laSharingGroupNumber: formUtils.queryValue(uwProposalHealthFamilySharing?.laSharingGroupNumber),
      });
    },
  })(Planinfotable)
);
