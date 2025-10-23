import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'basic/enum/CustomerRole';
import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';

interface IParams {
  mode: 'edit' | 'show';
}

export default ({ mode }: IParams) => {
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `${mode === 'edit' ? 'modalData.' : ''}entities.clientMap`, {}),
    shallowEqual
  );

  return useMemo(() => {
    const authorisedClientList = lodash
      .values(clientMap)
      .filter((item: any) => {
        return lodash.isEqual(formUtils.queryValue(item.personalInfo.customerRole), [
          CustomerRole.AuthorisedSignatory,
        ]);
      })
      .map((info) => info.id);
    return authorisedClientList;
  }, [clientMap]);
};
