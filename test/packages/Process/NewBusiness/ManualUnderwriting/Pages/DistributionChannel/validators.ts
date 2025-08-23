import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export const requiredChannel = (form: any) => {
  const agentChannelCode = formUtils.queryValue(form.getFieldValue('agentChannelCode'));
  const requiredChannelList = ['BC', 'BCA', 'BANCA', 'AF', 'Affinity'];
  return lodash.includes(requiredChannelList, agentChannelCode);
};
