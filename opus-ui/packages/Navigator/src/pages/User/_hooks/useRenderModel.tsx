import { useMemo } from 'react';

function useRenderModel(model: any) {
  const renderModel = useMemo(() => {
    switch (model) {
      case 'basicInfo':
        return true;
      case 'customization':
        return true;
      default:
        return true;
    }
  }, [model]);

  return renderModel;
}

export default useRenderModel;
