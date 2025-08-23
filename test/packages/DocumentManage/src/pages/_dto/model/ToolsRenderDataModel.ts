import type { ReactNode, ComponentType } from 'react';

export interface ToolsRenderDataModel {
  toolId?: string;
  handleClick?: () => void;
  data?: any;
  icon?: string | ReactNode | ComponentType<any> | string[] | ReactNode[] | ComponentType<any>[];
  title?: string;
  order?: number;
  replacer?: ComponentType<any>;
  hold?: boolean;
}
