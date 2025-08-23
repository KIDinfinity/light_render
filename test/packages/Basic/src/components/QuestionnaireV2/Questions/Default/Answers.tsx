import React from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import styles from './index.less';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

interface IProps {
  optionsList: any[];
  disabled: boolean;
  maping: string;
  type: string;
}

const Answers = ({ optionsList, disabled, maping, type }: IProps) => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  return (
    <div
      className={styles.options}
      onClick={(e) => {
        if (disabled || lodash.isEmpty(e.target.dataset)) {
          return;
        }
        dispatch({
          type: `${NAMESPACE}/saveSingleOption`,
          payload: {
            maping,
            type,
            changedFields: e.target.dataset,
          },
        });
      }}
    >
      {lodash.map(optionsList, (option: any) => {
        return (
          <div
            key={option.optionCode}
            className={classnames(styles.option, {
              [styles.selected]: !!option.isSelect,
              [styles.disabled]: disabled,
            })}
            data-optioncode={option.optionCode}
            data-optiontext={option.questionOptionSequence}
          >
            {option.optionLabel}
          </div>
        );
      })}
    </div>
  );
};

Answers.displayName = 'answers';

export default Answers;
