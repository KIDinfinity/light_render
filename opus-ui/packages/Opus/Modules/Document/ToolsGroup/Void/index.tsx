import type { ToolsRenderDataModel } from '../../_dto/model';
import { EToolModules } from '../../_dto/enums';

export interface IVoid {
  toolsRenderData: ToolsRenderDataModel | ToolsRenderDataModel[];
}

const Void: IVoid = {
  toolsRenderData: [
    // {
    //   toolId: EToolModules.void,
    //   // icon: ['close', 'check'],
    //   // order: 0,
    // },
    {
      toolId: EToolModules.view,
      // icon: ['eye', 'eye-invisible'],
    },
  ],
};

export default Void;
