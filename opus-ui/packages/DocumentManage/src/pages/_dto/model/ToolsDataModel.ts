import type { EToolModules } from '../enums';

export interface ToolDataModel {
  selected?: boolean;
  disabled?: boolean;
  noSelectedStatus?: boolean;
}

export interface ToolsDataModel {
  [EToolModules.edit]?: ToolDataModel;
  [EToolModules.void]?: ToolDataModel;
  [EToolModules.upload]?: ToolDataModel;
  [EToolModules.view]?: ToolDataModel;
  [EToolModules.download]?: ToolDataModel;
}
