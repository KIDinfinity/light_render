import lodash from 'lodash';

const formatReleaseVersion = (version: any) => {
  if (!lodash.isString(version)) {
    return version;
  }
  const reg = /(V\d+\.\d+\.\d+)_([A-Z]{2})_(\d{8})/;
  const match = version.match(reg);
  if (match) {
    return match[1];
  }
  return version;
};

export { formatReleaseVersion };
