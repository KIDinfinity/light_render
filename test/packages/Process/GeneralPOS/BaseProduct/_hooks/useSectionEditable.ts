import { useSelector } from 'dva';
import lodash from 'lodash';
import { useMemo } from 'react';
import { isDecision } from 'process/GeneralPOS/common/utils';
import { NAMESPACE } from '../activity.config';

export default function useSectionEditable(sectionCode, realyOnly = false, section = '') {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const SectionEditable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.srvUiSectionEditControlList
  );
  const caseCategory = useSelector(({ processTask }: any) => processTask?.getTask?.caseCategory);

  const rcsApplicable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.rcsApplicable
  );
  const preDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.preDecision
  );

  return useMemo(() => {
    if (
      realyOnly ||
      !editable ||
      (editable &&
        lodash.find(SectionEditable, (item) => item?.sectionCode === sectionCode)
          ?.editControlFlag === 'N')
    ) {
      return false;
    }
    if (isDecision({ caseCategory }) && rcsApplicable === '02' && section !== 'RequestInfo') {
      return false;
    }
    if (isDecision({ caseCategory }) && lodash.toUpper(preDecision) === 'AP') {
      return false;
    }
    return true;
  }, [editable, SectionEditable, sectionCode, realyOnly, preDecision, rcsApplicable, section]);
}
