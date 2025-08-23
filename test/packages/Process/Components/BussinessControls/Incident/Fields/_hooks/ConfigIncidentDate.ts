import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, Validator } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import { NamespaceType } from '../../../Enum';

interface IProps {
  namespaceType: string;
  NAMESPACE: string;
  incidentId: string;
}

export default ({ namespaceType, NAMESPACE, incidentId }: IProps) => {
  return tenant.region({
    [Region.HK]: () => {
      const diagnosisListMap = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.diagnosisListMap
      );
      const dateTimeOfDeath = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) =>
          modelnamepsace.claimProcessData?.insured?.dateTimeOfDeath
      );

      const symptomDateList = lodash
        .chain(diagnosisListMap)
        .filter((item) => item?.incidentId === incidentId)
        .map((item) => formUtils.queryValue(item?.symptomDate))
        .value();
      return namespaceType === NamespaceType.Assessment
        ? {
            Rules: {
              incidentDateEarlierDeathDate: Validator.incidentDateEarlierDeathDate(
                formUtils.queryValue(dateTimeOfDeath)
              ),
              VLD_000607: Validator.VLD_000607(
                symptomDateList,
                formatMessageApi({ Label_BIZ_Claim: 'SymptomDate' }),
                formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
                })
              ),
            },
            extraConfig: {
              errorTake: 1,
            },
          }
        : {
            Rules: {},
            extraConfig: {},
          };
    },
    [Region.TH]: () => {
      const submissionDate = useSelector(
        ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.submissionDate
      );
      return {
        Rules: {
          VLD_000274: Validator.VLD_000274(formUtils.queryValue(submissionDate)),
        },
        extraConfig: {
          showTime: { format: 'HH:mm' },
          format: 'L LT',
        },
      };
    },
    notMatch: {},
  });
};
