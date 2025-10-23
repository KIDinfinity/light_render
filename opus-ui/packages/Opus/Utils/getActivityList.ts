import lodash from 'lodash';

const getActivityList = ({ organizationCode, organizationList }: any) => {
  let dataList: any = [];
  let newOwner: string = '';

  const getOrganizationItem = (list = []) => {
    list.forEach(
      ({ activityList = [], organizationCode: mapOrganizationCode, children = [], owner }: any) => {
        if (organizationCode === mapOrganizationCode) {
          newOwner = owner;
          dataList = [...(activityList || [])];
        }

        if (!!children && !lodash.isEmpty(children)) {
          getOrganizationItem(children);
        }
      }
    );
  };

  getOrganizationItem(organizationList || []);

  return { activityList: dataList, owner: newOwner };
};

export default getActivityList;
