import { isString } from 'lodash';

export default (value: any) => (value && isString(value) ? value : '');
