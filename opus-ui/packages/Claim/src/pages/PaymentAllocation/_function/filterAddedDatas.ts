import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';

/**
 * 过滤用户在UI界面新增的数据
 * @param datas 需要过滤的数据
 */
const filterAddedDatas = (datas?: any[]) =>
  lodash.filter(datas, (data: any) => data.manualAdd !== SwitchEnum.YES);

export default filterAddedDatas;
