import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, Validator } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from 'process/Components/BussinessControls';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  treatmentId: string;
  form: any;
  serviceItemId: string;
}

export default ({ NAMESPACE, namespaceType, form, treatmentId, serviceItemId }: IProps) => {
  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );
  const { dateOfAdmission, dateOfDischarge, icuFromDate, icuToDate } = lodash.pick(treatmentItem, [
    'dateOfAdmission',
    'dateOfDischarge',
    'icuFromDate',
    'icuToDate',
  ]);
  const dateOfAdmissionValue = formUtils.queryValue(dateOfAdmission);
  const dateOfDischargeValue = formUtils.queryValue(dateOfDischarge);
  const configs = tenant.region({
    [Region.HK]: () => {
      const serviceItem = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]
      );
      return namespaceType === NamespaceType.DataCapture
        ? {
            Rules: {
              VLD_000614: Validator.VLD_000614({
                dateOfDischarge,
                dateOfAdmission,
                icuFromDate,
                icuToDate,
                serviceItem: form.getFieldValue('serviceItem'),
              }),
            },
            extraConfig: {
              placeholder: true,
            },
          }
        : {
            Rules: {
              VLD_000663: Validator.VLD_000663(serviceItem),
              VLD_000614: Validator.VLD_000614({
                dateOfDischarge,
                dateOfAdmission,
                icuFromDate,
                icuToDate,
                serviceItem: form.getFieldValue('serviceItem'),
              }),
            },
          };
    },
    notMatch: () => {
      const Rules = {
        VLD_000272: Validator.VLD_000272(dateOfAdmissionValue, dateOfDischargeValue),
      };

      return namespaceType === NamespaceType.DataCapture
        ? {
            Rules: {
              ...Rules,
            },
            extraConfig: {
              placeholder: true,
            },
          }
        : {
            Rules: {
              ...Rules,
            },
            extraConfig: {},
          };
    },
  });
  return {
    Rules: configs.Rules || {},
    extraConfig: configs.extraConfig || {},
  };
};
