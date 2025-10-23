import lodash from 'lodash';

export default ({ businessData }) => {
  return lodash
    .chain(businessData)
    .get('sustainabilityOptions')
    .some((item: any) => item.sustainable === 'Y')
    .value();
};
