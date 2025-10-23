import React from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import classNames from 'classnames';
import { Form } from 'antd';
import { FormItemInput, formUtils } from 'basic/components/Form';

import unpictureIcon from '@/assets/common-unpicture-icon.svg';
import { namespace } from '../../_models';

import styles from './item.less';

const UdItem = ({ taskNotEditable, attachList, dispatch, item, form }) => {
  const currentDoc =
    lodash.findIndex(attachList, (attachItem: any) => attachItem.udDocId === item.docId) > -1;

  const handlToggleClick = () => {
    const hasActive = lodash.some(attachList, (n: any) => n.udDocId === item.docId);
    if (taskNotEditable) return;
    if (!hasActive) {
      dispatch({
        type: `${namespace}/addAttachList`,
        payload: {
          docId: item.docId,
          type: 'doc',
        },
      });
    } else {
      dispatch({
        type: `${namespace}/removeAttachList`,
        payload: {
          docId: item.docId,
          type: 'doc',
        },
      });
    }
  };

  return (
    <div key={item.docId} className={styles.itemWrap} onClick={handlToggleClick}>
      <div
        className={classNames(styles.itemLeft, {
          [styles.active]: currentDoc,
          [styles.lock]: currentDoc,
        })}
      />
      <div className={styles.itemRight}>
        <Form layout="vertical">
          <div className={styles.topWrap}>
            {item?.imageUrl && item?.imageUrl !== '' && (
              <>
                <span className={styles.imageIcon}>
                  <img src={unpictureIcon} alt="urgent" />
                </span>
              </>
            )}
            <div className={styles.codeName}>
              <FormItemInput maxLength={260} disabled form={form} formName="name" />
            </div>
          </div>
          <FormItemInput className={styles.FormItem} form={form} formName="docTypeCode" disabled />
          <div className={styles.bottomWrap}>
            <div className={styles.leftWrap}>
              <FormItemInput
                form={form}
                disabled
                formName="insuredName"
                labelId="venus_claim.label.insuredName"
              />
            </div>
            <div className={styles.rightWrap}>
              <FormItemInput
                form={form}
                disabled
                formName="policies"
                labelId="venus_claim.label.policyNo"
              />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default connect(
  ({ UnknownDocumentBaseController, dictionaryController, claimEditable }: any) => ({
    attachList: UnknownDocumentBaseController?.attachList,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { item }: any = props;

      return formUtils.mapObjectToFields({
        ...item,
      });
    },
  })(UdItem)
);
