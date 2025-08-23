import lodash from 'lodash';
import { tplArgReg } from 'bpm/pages/Envoy/_utils/regExp';

export default ({ template, values }: any) => {
  let result = template;
  if (lodash.isString(template)) {
    const targets = template.match(tplArgReg);
    lodash.forEach(targets, (target) => {
      const key = target.replace('{{', '').replace('}}', '');
      const value = lodash.get(values, key) || '';
      result = result.replace(target, `{{${value}}}`);
    });
  }
  return result;
};
