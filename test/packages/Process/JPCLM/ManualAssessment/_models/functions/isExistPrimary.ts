
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { DiagnosisType } from 'basic/enum';

const isExistPrimary = ({ diagnosisListMap, incidentId }: any) => lodash
  .chain(diagnosisListMap)
  .filter((item) =>
    item?.incidentId === incidentId
  )
  .some((item) =>
    formUtils.queryValue(item?.diagnosisType) === DiagnosisType.Primary
  )
  .value();

export default isExistPrimary


