// import lodash from 'lodash';

const tplArgReg: any = /{{2}\$*.*?}{2}/g;
const isTplArgReg: any = /({{2}\b.*\b}{2})|({{2}}{2})/;
const notReplaceArgReg: any = /{{2}\${1}\w+}{2}/g;
const argCtnReg: any = /[^{{}}]+/g;
const htmlTagStartReg: any = /<[a-zA-Z]+.*?>/g;
const htmlTagEndReg: any = /<\/[a-zA-Z]*?>/g;
const isEmailReg = /^(([\w.-]+)@([\w.-]+)\.([\w.]+;*))*$/;

// const getNotArgStr = (str: string, val: string): string => {
//   let arg = '{{}}';
//   if (lodash.isString(val)) {
//     arg = `{{${val}}}`;
//   }
//   return str.replace(tplArgReg, arg);
// };

export {
  tplArgReg,
  isTplArgReg,
  notReplaceArgReg,
  argCtnReg,
  // getNotArgStr,
  htmlTagStartReg,
  htmlTagEndReg,
  isEmailReg,
};
