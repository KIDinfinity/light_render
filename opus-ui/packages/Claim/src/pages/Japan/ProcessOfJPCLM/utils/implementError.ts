import { isPlainObject, isEmpty, isArray, compact, map } from 'lodash';

interface Error {
  message: string;
  field?: string;
}

interface ErrorObject {
  value?: string;
  name?: string;
  touched?: boolean;
  dirty?: boolean;
  errors?: Error[];
}

/**
 * 补充表单field的error信息
 */
export default (name: string = '', errors: Error[] = [], inputValue?: ErrorObject) => {
  if (isEmpty(name) || !isArray(errors) || errors.length === 0) return null;
  const errorConst = {
    value: null,
    name,
    touched: true,
    dirty: false,
    errors: undefined,
    validating: false,
  };
  let tempErrors;
  let tempErrorValue;

  if (isPlainObject(inputValue)) {
    tempErrorValue = { ...errorConst, ...inputValue };
  }

  if (isArray(errors)) {
    tempErrors = map(compact(errors), (error: Error) => {
      if (isPlainObject(error)) {
        error.field = name;
      }
      return error;
    });
  }

  return { ...tempErrorValue, errors: tempErrors };
};
