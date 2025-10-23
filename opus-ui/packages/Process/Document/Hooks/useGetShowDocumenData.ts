import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from '../activity.config';

export default () => {
  const docViewVOList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.docViewVOList
    ) || [];

  const showDocumentId =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.showDocumentId) || [];
  return useMemo(() => {
    const item = lodash.find(docViewVOList || [], (el: any) => el.id === showDocumentId) || {};

    return lodash.pick(item, ['imageId', 'mimeType', 'name']);
  }, [showDocumentId]);
};
