export default (info) =>
  [info?.firstName, info?.middleName, info?.surname].filter((item) => item).join(' ');
