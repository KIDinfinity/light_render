import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { v4 as uuid } from 'uuid';
import { ChequeRemark } from '../_dto/Consts';
/**
 * 生成新的chequeRemark数据
 * @param claimData 理赔对象
 */
const chequeRemarkAssembly = (claimData: any = {}, idx?: number) => {
  const { claimNo } = claimData;
  const manualAdd = SwitchEnum.YES;

  const chequeRemark = { ...ChequeRemark, claimNo, manualAdd, seq: idx && lodash.isFinite(idx)? idx : 0 };

  chequeRemark.id = uuid();

  return {
    ...chequeRemark,
  };
};

export default chequeRemarkAssembly;
