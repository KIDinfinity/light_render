import lodash from 'lodash';
import type { Region } from '../constants';
import { regionMapToRemote } from '../config';

export const transferToRemoteRegion = (region: Region) =>
  lodash.find(regionMapToRemote, (item: any) => item.source === region)?.target || region;
