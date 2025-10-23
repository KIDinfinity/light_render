import { isFunction } from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const getRules = ({ required, isHideRequireIcon, rules, isDecorator, disabled }: any) => {
  const newRules = [
    {
      required: required && !isHideRequireIcon && !disabled,
      message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' }),
    },
    ...rules,
  ];

  return isDecorator
    ? newRules
    : newRules?.map((rule) =>
        isFunction(rule)
          ? {
              validator: (_rule: any, value: any) => {
                return new Promise((resolve, reject) => {
                  rule(_rule, value, (msg: string | undefined) => {
                    if (msg) {
                      reject(new Error(msg));
                    }
                    resolve(Promise.resolve());
                  });
                });
              },
            }
          : rule
      );
};

export default getRules;
