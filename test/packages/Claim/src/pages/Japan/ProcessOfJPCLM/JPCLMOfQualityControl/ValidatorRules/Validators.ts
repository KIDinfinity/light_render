import Errors from './Errors';
import {
  getRequiredVLD,
  getStartDateVLD,
  getEndDateVLD,
  compareNameVLD,
  expectPolicyVLD,
} from './VLDTool';

class Validators {
  /** ---- 请求书  ------ */
  VLD_000268 = expectPolicyVLD(Errors.ERR_000248);

  /** ---- 诊断书  ------ */

  // "乳房の観血切除術-有無" = 「あり」时为必填
  VLD_000210 = getRequiredVLD('01');

  // 「先進医療有無」=「あり」时此字段變爲必填 001
  VLD_000181 = getRequiredVLD('01');

  // "遠隔転移の有無-区分" = 「あり」时为必填
  VLD_000214 = getRequiredVLD('01');

  // 「病理組織学的検査-有無」=「あり」时此字段變爲必填
  VLD_000087 = getRequiredVLD('01');

  // 「病名を告げた時期-本人-告知有無」= 有 時此字段必填
  VLD_000173 = getRequiredVLD('01');

  // "抗がん剤治療-有無" = 「有」时为必填
  VLD_000216 = getRequiredVLD('01');

  // "ホルモン剤治療-有無" = 「有」时为必填
  VLD_000217 = getRequiredVLD('01');

  // "がん性疼痛緩和薬-有無" = 「有」时为必填
  VLD_000218 = getRequiredVLD('01');

  // "緩和ケア診療等の入院-有無" = 「有」时为必填
  VLD_000219 = getRequiredVLD('01');

  // 仅当书类为M8304 (010) 时为必填
  VLD_000215 = getRequiredVLD('00010');

  // "乳房の観血切除術-有無" = 「あり」时为必填
  VLD_000211 = getRequiredVLD('01');

  // "卵巣の観血切除術-有無" = 「あり」时为必填
  VLD_000212 = getRequiredVLD('01');

  // "子宮の観血切除術-有無" = 「あり」时为必填
  VLD_000213 = getRequiredVLD('01');

  // 「CIN」＝「01, 02, 03」 時此字段必填
  VLD_000172 = getRequiredVLD(['01', '02', '03'], (dictCode: string[], checkValue: string) =>
    dictCode.includes(checkValue)
  );

  /** ---- 死亡情報  ------ */

  // 死亡情報 - 手術 = 有 时变为必填
  VLD_000184 = getRequiredVLD('01');

  //  先进医疗
  //  入院出院， （死亡报告书1，诊断书2，住院报告书1）
  VLD_000018_Start = getStartDateVLD(Errors.ERR_000035);

  VLD_000018_End = getEndDateVLD(Errors.ERR_000035);

  // （放射線治療温熱療法期間）結束日須不早於開始日
  VLD_000095_Start = getStartDateVLD(Errors.ERR_000110);

  VLD_000095_End = getEndDateVLD(Errors.ERR_000110);

  /** ---- 年金  ------ */

  // 「年金受取方法-受取区分」＝「03, 04, 05, 06」 時此字段必填
  VLD_000222 = getRequiredVLD(['03', '04', '05', '06'], (dictCode: string[], checkValue: string) =>
    dictCode.includes(checkValue)
  );

  // 「年金受取方法-受取区分」＝「04,  06」 時此字段必填
  VLD_000241 = getRequiredVLD(['04', '06'], (dictCode: string[], checkValue: string) =>
    dictCode.includes(checkValue)
  );

  // 受取区分 字段仅在书类为069时为必填
  VLD_000221 = getRequiredVLD('00069');

  // 支払方法 仅在书类为022与023时为必填
  VLD_000220 = getRequiredVLD(
    ['00022', '00023'],
    (documentTypeCode: string[], checkValue: string) => documentTypeCode.includes(checkValue)
  );

  /** ---- 书类  ------ */
  // 氏名要一致
  VLD_000259 = compareNameVLD(Errors.ERR_000240);
}

export const {
  VLD_000184,
  VLD_000241,
  VLD_000181,
  VLD_000087,
  VLD_000172,
  VLD_000173,
  VLD_000210,
  VLD_000211,
  VLD_000212,
  VLD_000213,
  VLD_000214,
  VLD_000215,
  VLD_000216,
  VLD_000217,
  VLD_000218,
  VLD_000219,
  VLD_000220,
  VLD_000221,
  VLD_000222,
  VLD_000018_Start,
  VLD_000018_End,
  VLD_000095_Start,
  VLD_000095_End,
  VLD_000259,
  VLD_000268,
} = new Validators();
