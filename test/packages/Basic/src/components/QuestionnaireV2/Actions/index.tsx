import React from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { ReactComponent as Back } from 'basic/components/QuestionnaireV2/icons/back.svg';
import { ReactComponent as Save } from 'basic/components/QuestionnaireV2/icons/save.svg';
import { ReactComponent as Confirm } from 'basic/components/QuestionnaireV2/icons/confirm.svg';
import Button from './Button';
import styles from './index.less';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

const Actions = ({ disabled }) => {
  const NAMESPACE = useGetNamespace();

  const dispatch = useDispatch();
  const validating = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.validating
  );
  const actions = [
    {
      icon: <Confirm />,
      buttonCode: 'confirm',
      click: async () => {
        if (!validating) {
          await dispatch({
            type: `${NAMESPACE}/saveValidate`,
            payload: {
              validating: true,
            },
          });
          await dispatch({
            type: `${NAMESPACE}/validateFields`,
          });
          await dispatch({
            type: `${NAMESPACE}/saveValidate`,
            payload: {
              validating: false,
            },
          });
        }
      },
    },
    {
      icon: <Save />,
      buttonCode: 'save',
      click: () => {},
    },
    {
      icon: <Back />,
      buttonCode: 'back',
      click: () => {
        dispatch({
          type: `${NAMESPACE}/saveVisible`,
          payload: { visible: false },
        });
      },
    },
  ];
  return (
    <div className={styles.buttonList}>
      {lodash
        .filter(actions, (config: any) => {
          return !disabled || config.buttonCode === 'back';
        })
        .map((config: any) => {
          return <Button config={config} key={config.buttonCode} />;
        })}
    </div>
  );
};

Actions.displayName = 'Actions';

export default Actions;
