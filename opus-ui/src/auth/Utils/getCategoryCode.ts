import lodash from 'lodash';
import type { AuthProps } from '../Typings';

export default (CacheAuth: AuthProps[]) => lodash.map(CacheAuth, (item) => item.categoryCode);
