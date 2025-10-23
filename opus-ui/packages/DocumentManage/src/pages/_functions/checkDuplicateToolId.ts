import lodash from 'lodash';
import type { ToolsRenderDataModel } from '../_dto/model';
import collectToolsId from './collectToolsId';

interface IResult {
  result: boolean;
  duplicatedToolIds?: string[];
}

/**
 * 检查tool id是否重复
 * @param toolsRenderDatas
 */
const checkDuplicateToolId = (toolsRenderDatas: ToolsRenderDataModel[]): IResult => {
  if (!lodash.isArray(toolsRenderDatas) || toolsRenderDatas.length < 1)
    throw Error(
      `Encountered illegal parameters:${toolsRenderDatas} at checkDuplicateToolId(toolsRenderDatas)`
    );

  const uniqed = lodash.uniqBy(toolsRenderDatas, 'toolId');
  const diffed = lodash.differenceWith(toolsRenderDatas, uniqed, lodash.isEqual);

  return {
    result: !!diffed.length,
    duplicatedToolIds: collectToolsId(diffed),
  };
};

export default checkDuplicateToolId;
