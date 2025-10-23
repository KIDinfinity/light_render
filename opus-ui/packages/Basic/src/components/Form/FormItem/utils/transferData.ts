import { isNil } from 'lodash';

const tansferData = (data: any) => (isNil(data) || data === '' ? false : data);

export default tansferData;
