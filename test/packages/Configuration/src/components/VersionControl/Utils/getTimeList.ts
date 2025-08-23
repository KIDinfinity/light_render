import { chain } from 'lodash';

export default (versionList: any, currentVersion: any) =>
  (chain(versionList) as any).find({ date: currentVersion }).get('list').value();
