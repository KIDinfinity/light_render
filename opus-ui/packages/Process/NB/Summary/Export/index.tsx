import React from 'react';
import { Button } from 'antd';
import html2canvas from 'html2canvas';

const Export = () => {
  const handleExport = React.useCallback(() => {
    html2canvas(document.body).then((canvas) => {
      const dataURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'test.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }, []);
  return (
    <div>
      <Button onClick={handleExport}>export</Button>
    </div>
  );
};

Export.displayName = 'export';

export default Export;
