import { useMemo } from 'react';

function useRenderModelPosition(model: any) {
  const renderModelPosition = useMemo(() => {
    switch (model) {
      case 'basicInfo':
        return 0;
      case 'permission':
        return 1;
      case 'customization':
        return 2;
      case 'leaveManagement':
        return 3;
      default:
        return 0;
    }
  }, [model]);

  return renderModelPosition;
}

export default useRenderModelPosition;
