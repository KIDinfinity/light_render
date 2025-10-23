import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import styles from './AdjustmentWrap.less';

const Wrap = ({ render , ...otherProps }) => {
  return render({
    ...otherProps,
    editable: false,
    title: 'Origin Result',
    className: styles.adjustmentWrap,
  })
}

const OriginWrap = Form.create({
  mapPropsToFields(props) {
    const { item } = props;
    return formUtils.mapObjectToFields({
      ...item,
      isOrigin: true,
    });
  },
})(Wrap)

export default ({ originItem, render, form, editable, isAdjustment }) => {
  if(isAdjustment !== IsAdjustment.Yes) {
    return render({
      form,
      editable,
    });
  }
  return (
    <>
      {
        // adjustment 内部的field基本不可以改，除了reversalFlag和assessmentRemark，这两个field会单独判断
        render({
          title: 'Adjustment Result',
          form,
          editable: false,
          adjustmentDelete: editable,
          className: styles.adjustmentWrap,
        })
      }
      {
        originItem && 
          <OriginWrap 
            render={render}
            item={originItem}
          />
      }
    </>
  )
}

export const InnerWrap = ({ title, children }) => {
  if(!title) {
    return children;
  }
  return (
    <div>
      <div className={styles.adjustmentTitle}>
        {title}
      </div>
      {children}
    </div>
  )
}