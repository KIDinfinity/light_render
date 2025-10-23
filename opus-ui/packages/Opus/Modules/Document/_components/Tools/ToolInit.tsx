import type { FunctionComponent, ReactNode} from 'react';
import React, { isValidElement } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

export interface IToolInit {
  children?: ReactNode;
  moduleId: string;
}

const ToolInit: FunctionComponent<IToolInit> = ({ moduleId, children }) => {
  const toolsData = useSelector(({ documentManagement }: any) => documentManagement.toolsData);
  return (
    <>
      {lodash.get(toolsData, `[${moduleId}].selected`, false) &&
        (isValidElement(children) ? children : formUtils.queryValue(children))}
    </>
  );
};

export default ToolInit;
