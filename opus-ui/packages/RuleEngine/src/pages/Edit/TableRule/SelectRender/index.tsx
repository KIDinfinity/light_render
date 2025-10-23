import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import Search from '../Search';
import SiderSave from '../../components/Button/SiderSave';
import styles from './index.less';
import RenderList from '../RenderList';

enum IconType {
  up = 'up',
  down = 'down',
}

function SelectRender({
  options,
  setOptions,
  propsOptions,
  dataSource,
  title,
  onSave,
  AtomType,
}: any) {
  const [showSelect, setShowSelect] = useState(false);

  const toggleShowSelect = () => {
    setShowSelect(!showSelect);
  };

  const onSaveFn = () => {
    if (onSave && lodash.isFunction(onSave)) {
      onSave(options, propsOptions);
      setShowSelect(false);
    }
  };

  const onResetFn = () => {
    setOptions(propsOptions);
  };

  const isDisabled = lodash.isEqual(options, propsOptions);
  const [datas, setDatas] = useState(dataSource);

  useEffect(() => {
    setDatas(dataSource);
  }, [dataSource]);

  return (
    <>
      <div
        className={classNames({
          [styles.headerContent]: true,
          [styles.showSelect]: showSelect,
        })}
      >
        <div className={styles.headerWord}>{title}</div>
        <div className={styles.arrows} onClick={toggleShowSelect}>
          <Icon type={showSelect ? IconType.up : IconType.down} />
        </div>
        {showSelect && (
          <div className={styles.selectBox}>
            <Search datas={datas} setDatas={setDatas} />
            <RenderList
              options={options}
              setOptions={setOptions}
              dataSource={datas}
              setDatas={setDatas}
              AtomType={AtomType}
            />
            <SiderSave onSave={onSaveFn} onReset={onResetFn} disabled={isDisabled} />
          </div>
        )}
      </div>
    </>
  );
}

export default SelectRender;
