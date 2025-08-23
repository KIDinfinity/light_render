import lodash from 'lodash';
import { RegArrays, RegPoint } from './RegExps';
import getPathDiff from './getPathDiff';
import getArrayIndex from './getArrayIndex';

export default ({
  path,
  lastPath,
  diffMap,
  actionTempMap,
  changedFields,
  newClaimData,
  currentController,
}: any) => {
  const pathId = path.replace(lastPath, lastPath?.replace(RegArrays, `[$1[1]].id`));
  const mathPath = path.replace(lastPath, lastPath?.replace(RegArrays, ``));
  const targetId = diffMap?.[pathId];
  const diffLength = pathId?.match(RegPoint)?.length;
  let diffs: any[] = [];
  const isExitSameId = lodash
    .chain(diffMap)
    .keys()
    .filter((key: string) => {
      const tempLength = key?.match(RegPoint)?.length;
      return (
        key !== pathId &&
        key.indexOf(mathPath) !== -1 &&
        diffMap[key] === targetId &&
        tempLength === diffLength
      );
    })
    .head()
    .value();
  const pathIdx = getArrayIndex(path);
  const samePathIdx = getArrayIndex(isExitSameId);

  if (isExitSameId && !actionTempMap[`${path}`] && pathIdx < samePathIdx) {
    const samePath = isExitSameId.substr(0, isExitSameId.lastIndexOf('[') + 1).concat('0]]');
    const oldPath = pathId.substr(0, pathId.lastIndexOf('.'));
    const newPath = isExitSameId.substr(0, isExitSameId.lastIndexOf('.'));
    diffs = getPathDiff({
      diffMap,
      oldPath,
      newPath,
      changedFields,
      newClaimData,
      currentController,
    });
    actionTempMap[`${samePath}`] = true;
  }

  return {
    exitSame: isExitSameId || actionTempMap[`${path}`],
    diffs,
    newTempMap: actionTempMap,
  };
};
