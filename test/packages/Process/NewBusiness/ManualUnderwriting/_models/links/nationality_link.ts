import { set } from 'lodash';

import { formUtils } from 'basic/components/Form';
import handleLink from '.';

const nationality_link = ({ draftState, changedFields, index }) => {
  const handleVn = () => {
    if (formUtils.queryValue(changedFields.nationality) === 'VNM') {
      set(draftState, `policyList[0].clientInfoList.[${index}].residedDurationInd`, 'Y');
    } else {
      set(draftState, `policyList[0].clientInfoList.[${index}].residedDurationInd`, '');
    }
  };
  handleLink({ changedFields, name: 'nationality', handleVn });
};

export default nationality_link;
