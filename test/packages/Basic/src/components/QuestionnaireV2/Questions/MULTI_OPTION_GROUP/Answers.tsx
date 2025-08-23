import React from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import classnames from 'classnames';
import RenderChild from '../RenderChild';
import styles from './index.less';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

const GroupAnswers = (props: any) => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();

  const { optionsList, maping, type, disabled } = props;

  return (
    <div
      className={styles.options}
      onClick={(e) => {
        if (disabled || lodash.isEmpty(e.target?.dataset)) {
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
        const { isSelect, optionCode, optionLabel, questionOptionSequence } = option || {};
        return (
          <div key={option.optionCode} className={styles.optionWrap}>
            <div
              className={classnames(styles.option, {
                [styles.selected]: !!isSelect,
                [styles.disabled]: disabled,
              })}
              data-optioncode={optionCode}
              data-optiontext={questionOptionSequence}
            >
              {optionLabel}
            </div>
            {RenderChild({
              ...props,
              option,
            })}
          </div>
        );
      })}
    </div>
  );
};

GroupAnswers.displayName = 'aroupAnswers';

export default GroupAnswers;
