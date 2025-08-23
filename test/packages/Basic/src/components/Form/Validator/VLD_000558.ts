import { formatMessageApi } from '@/utils/dictFormatMessage';

const kana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
const kanaVoicedSound = 'ｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞ';
const kanaSemiVoicedSound = 'ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ';
const digital = '\\d';
const character = '\\(\\)\\.\\-\\/';
const halfWidthSpace = ' ';
const uppercase = 'A-Z';

const RegExpJP = /^[ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝｶﾞｷﾞｸﾞｹﾞｺﾞｻﾞｼﾞｽﾞｾﾞｿﾞﾀﾞﾁﾞﾂﾞﾃﾞﾄﾞﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞｳﾞﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ\d\(\)\.\-\/A-Z ]+$/;

const RegExp_JP_Accountholder = new RegExp(
  `^[${
    kana + kanaVoicedSound + kanaSemiVoicedSound + digital + character + uppercase + halfWidthSpace
  }]+$`
);

/**
 *
 * @param array 已存在的diagnosisCode
 */
export const VLD_000558 = () => (rule: any, value: any, callback: Function) => {
  const result = RegExp_JP_Accountholder.test(value);

  if (value && !result) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000482' }, value));
  }

  callback();
};
