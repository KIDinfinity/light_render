import React from 'react';
import { POSEntrance } from 'bpm/pages/OWBEntrance';
import useExpanderController from 'navigator/hooks/useExpanderController';
import DrawerExpandStatus from 'navigator/enum/DrawerExpandStatus';

export default () => {
  const { mode } = useExpanderController();
  const compress = mode === DrawerExpandStatus.capsule;

  const buttonList = [
    {
      buttonCode: 'image',
      buttonId: 'image',
      action: () => {
        console.log('action now');
      },
    },
  ];
  const headerInfoConfig = [
    {
      title: 'claimNo',
      value: '123123',
      key: 'claimNo',
    },
  ];
  const title = 'History';
  return (
    <POSEntrance
      compress={compress}
      buttonList={buttonList}
      title={title}
      headerInfoConfig={headerInfoConfig}
    >
      Claim
    </POSEntrance>
  );
};
