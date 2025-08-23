import { get } from 'lodash';
import { formUtils } from 'basic/components/Form';

export const getPrevious = (target: any, path: string) => formUtils.queryValue(get(target, path));

export default {
  getPrevious,
};
