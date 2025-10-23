import React, { useState } from 'react';
import lodash from 'lodash';
import SiderButton from 'packages/BPM/src/pages/OWBEntrance/Sider/ButtonUI/Default';

import NameScreeningModal from '../ManualAssessment/Modules/NameScreening/modal';
import styles from './Sider.less';

export default ({}: any) => {
  const [showNameScreening, setShowNameScreening] = useState(false);

  const customButtons = [
    {
      title: '反社情報',
      styles: {
        box: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-box',
        urgent: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-urgent',
        slaTime: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-slaTime',
        danger: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-danger',
        warning: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-warning',
        favorite: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-favorite',
        active: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-active',
        hidden: 'react-app-pages-o-w-b-entrance-sider-button-u-i-opus-button-hidden',
      },
      icon: 'nameScreening',
      buttonCode: 'nameScreening',
      compress: false,
      action: () => setShowNameScreening(true),
    },
  ];

  return (
    <div className={styles.sider}>
      {lodash.map(customButtons, (item) => (
        <SiderButton {...item} />
      ))}
      <NameScreeningModal open={showNameScreening} setOpen={setShowNameScreening} />
    </div>
  );
};
