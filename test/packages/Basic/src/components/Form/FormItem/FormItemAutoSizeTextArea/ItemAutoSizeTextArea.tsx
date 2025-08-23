import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import AutoSizeInput from './AutoSizeInput';
import AutoSizeTextArea from './AutoSizeTextArea';
import type { FormItemTextAreaProps } from '../typing';
import styles from './index.less';

const ItemAutoSizeTextArea = React.forwardRef<any, FormItemTextAreaProps>((props, ref) => {
  const { value, onChange, required } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [inputedValue, setInputedValue] = useState<string | unknown>(value);

  useEffect(() => {
    setInputedValue(value);
  }, [value]);

  const onMainTextFieldChange = (event: React.ChangeEvent<Record<string, unknown>>) => {
    setInputedValue(event?.target?.value);
  };

  return (
    <>
      <div className={styles.inputWarp}>
        <AutoSizeTextArea
          required={required}
          isModelTextArea={false}
          setModalVisible={setModalVisible}
          {...props}
        />
        <AutoSizeInput required={required} setModalVisible={setModalVisible} {...props} />
      </div>
      <Modal
        wrapClassName="vertical-center-modal"
        visible={modalVisible}
        className={styles.modal}
        closable={false}
        onCancel={() => setModalVisible(false)}
        style={{ top: '30%' }}
        ref={ref}
      >
        <AutoSizeTextArea
          isModelTextArea={true}
          setModalVisible={setModalVisible}
          {...props}
          onChange={onMainTextFieldChange}
          onBlur={onChange}
          value={inputedValue ?? value}
          required={required}
        />
      </Modal>
    </>
  );
});

export default ItemAutoSizeTextArea;
