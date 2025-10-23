import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import TaskDefKey from 'basic/enum/TaskDefKey';
import { formUtils } from 'basic/components/Form';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../Pages/Client/_hooks/useRetrieveExistCorpFromLAToggle';
import { shallowEqual } from 'react-redux';
import CustomerRole from 'basic/enum/CustomerRole';

interface IParams {
  clientId: string;
}

export default ({ clientId }: IParams) => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.taskDetail,
    shallowEqual
  );
  const customerRole = useSelector((state: any) =>
    lodash.get(state, `${NAMESPACE}.entities.clientMap.${clientId}.personalInfo.customerRole`)
  );
  const customerType = useSelector((state: any) =>
    lodash.get(state, `${NAMESPACE}.entities.clientMap.${clientId}.personalInfo.customerType`)
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  if (
    taskDetail?.activityKey === TaskDefKey.BP_NB_ACT008 &&
    lodash.includes(formUtils.queryValue(customerRole), CustomerRole.Payor) &&
    retrieveExistCorpFromLAToggle &&
    formUtils.queryValue(customerType) === CustomerType.Entity
  ) {
    return false;
  }

  return true;
};
