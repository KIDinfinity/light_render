import lodash from 'lodash';
import TaskStatus from 'claim/enum/TaskStatus';
import DocumentCategory from './DocumentCategory';
import DocumentTypeCode from './DocumentTypeCode';
import DropDown from './DropDown';
import Category from './Category';
import DocumentStatus from './DocumentStatus';
import CategoryMapName from './CategoryMapName';
import enumContentType from './ContentType';
import ePaymentMethod from './PaymentMethod';
import mapingValue from './mapingValue';

const CategoryLower: any = lodash.keys(Category).reduce(
  (obj, cur) => ({
    ...obj,
    [cur]: lodash.toLower(Category[cur]),
  }),
  {}
);

export {
  DocumentCategory,
  DocumentTypeCode,
  DropDown,
  Category,
  CategoryLower,
  DocumentStatus,
  TaskStatus,
  CategoryMapName,
  enumContentType,
  ePaymentMethod,
  mapingValue,
};
