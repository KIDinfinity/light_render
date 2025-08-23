import lodash from "lodash";

export default (flags: any) => {
  if (lodash.isString(flags)) {
    return /no_reassessment/.test(flags);
  }
  return false;
}
