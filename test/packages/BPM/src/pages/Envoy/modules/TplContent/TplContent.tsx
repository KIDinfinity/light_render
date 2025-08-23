import React, { useState, useEffect, useRef } from 'react';
import lodash from 'lodash';
import { tplArgReg, argCtnReg } from 'bpm/pages/Envoy/_utils/regExp';
import Styles from './index.less';

const TplContent = ({ name, onChange, content, isAllEditable, disabled }: any) => {
  const textTemplateInput: any = useRef(null);
  const [htmlValue, setHtmlValue] = useState('');
  useEffect(() => {
    let innerHTML = content?.value || '';
    innerHTML = innerHTML.replace(tplArgReg, (matchVal) => {
      let argCtn = matchVal.match(argCtnReg);
      argCtn = lodash.isArray(argCtn) ? argCtn[0] : '';
      return argCtn;
    });

    onChange({
      name,
      value: innerHTML,
      requireValidate: true,
    });
    setHtmlValue(innerHTML);
  }, []);

  // 监听内容变化，将值设置进Form
  const inputFn = (requireValidate = true) => {
    onChange({
      name,
      value: lodash.get(textTemplateInput, 'current.innerText') || '',
      requireValidate,
    });
  };

  const isEditable = isAllEditable && !disabled;

  return (
    <div
      id="tplContent"
      // eslint-disable-next-line no-return-assign
      ref={textTemplateInput}
      className={Styles.textTemplateInput + (isEditable ? ` ${Styles.editable}` : '')}
      contentEditable={isEditable}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: htmlValue }}
      onInput={inputFn}
    />
  );
};

export default TplContent;
