// import lodash from 'lodash';
// import { getNotArgStr, tplArgReg, argCtnReg } from 'bpm/pages/Envoy/_utils/regExp';

// interface IArg {
//   arg: any;
//   content: any;
// }

// export default function setArgInContent ({ arg, content }: IArg): any {
//   const { info, content: detail } = content;
//   lodash.mapKeys(info, (tplVal, tplKey) => {
//     if (!lodash.isEmpty(tplVal)) {
//       // eslint-disable-next-line no-param-reassign
//       info[tplKey] = getNotArgStr(tplVal, arg[tplKey]);
//     }
//   });
//   lodash.set(content, 'info', info);

//   const contentObj = lodash.isPlainObject(detail)
//     ? detail
//     : {
//         value: detail,
//         argMapObj: {},
//       };
//   if (lodash.isString(contentObj?.value)) {
//     const temporaryArgMapObj = {};
//     contentObj.value = contentObj?.value.replace(tplArgReg, (matchVal) => {
//       const argCtn = matchVal.match(argCtnReg);
//       let argKey = lodash.isArray(argCtn) ? argCtn[0] : '';
//       if (contentObj.argMapObj[argKey]) {
//         argKey = contentObj.argMapObj[argKey];
//       }
//       let viewVal;
//       if (argKey === 'remainingDays') {
//         viewVal = arg.period;
//       } else if (argKey === 'expireDate') {
//         const startDay = new Date();
//         const expireDate = new Date(
//           startDay.getTime() + arg.period * (24 * 60 * 60 * 1000) // 经过多少毫秒
//         );
//         viewVal = expireDate.toLocaleDateString();
//       } else {
//         viewVal = arg[argKey] || `${argKey}`;
//       }
//       temporaryArgMapObj[viewVal] = argKey;
//       return `{{${viewVal}}}`;
//     });
//     contentObj.argMapObj = temporaryArgMapObj;
//   }
//   lodash.set(content, 'content', contentObj);
//   return content;
// };;
