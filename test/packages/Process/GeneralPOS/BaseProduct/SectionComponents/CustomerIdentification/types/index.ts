import type { IdentificationClientTagType } from '../enum';

/**
 * @description: Identification list中每个Client的信息属性
 * @return {*}
 */
export interface IClient {
  clientId?: string;
  dateOfBirth?: string;
  fullName?: string;
  gender?: string;
  identityNo?: string;
  identityType?: string;
  nationality?: string;
  residentialAddress?: string;
  id: string;
}

/**
 * @description: 当前显示的Customer信息属性
 * @return {*}
 */
export interface ICustomer {
  clientId?: string;
  firstName?: string;
  middleName?: string;
  surname?: string;
  customerType?: string;
  roleList?: string[];
}

/**
 * @description: CustomerIdentification 组件属性
 */
export interface ICustomerIdentificationProps {
  className?: string;
  customerInfo: ICustomer;
  identificationList: IClient[];
  identifyResultTag?: IdentificationClientTagType;
  selectedId?: string;
  handleSelected?: (selected: string | number) => void;
  identifyResultTagShow?: IdentifyResultTagShowType;
}

export interface IIdentificationData
  extends Omit<ICustomerIdentificationProps, 'identifyResultTagShow'> {
  key?: number;
}

export type IdentifyResultTagShowType = ((identifyResultTag: string) => boolean) | boolean;
