import React from 'react';
import { Button } from 'antd';
import useHandleSavingChequeInfo from 'process/NB/Share/hooks/useHandleSavingChequeInfo';

const Save = () => {
  const handleSave = useHandleSavingChequeInfo();
  return <Button onClick={handleSave}>Save</Button>;
};

Save.displayName = 'Save';

export default Save;
