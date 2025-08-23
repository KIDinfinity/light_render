import React, { useEffect, useState } from 'react';
import {  useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { Button, Modal, Radio, Select } from 'antd';
import { changeTheme } from '@/global';
import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import ColorPicker from './ColorPicker';
import colorValiable from '../../../scripts/theme/color/colorValiable.json';
import styles from './index.less';

let element: any = null;

let styleList: any = ['bgColor'];

const RadioGroup = Radio.Group;

const ElementModal = () => {
  const dispatch = useDispatch();

  const { activeTheme } = useSelector(
    (state: any) => ({
      activeTheme: state.theme.activeTheme,
    }),
    shallowEqual
  );

  const [currentElement, setCurrentElement] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [color, setColor] = useState('');

  const [currentBgColor, setCurrentBgColor] = useState('');

  const [targetBgColor, setTargetBgColor] = useState('');

  const [currentTextColor, setCurrentTextColor] = useState('');

  const [targetTextColor, setTargetTextColor] = useState('');

  const [currentBorderColor, setCurrentBorderColor] = useState('');

  const [targetBorderColor, setTargetBorderColor] = useState('');

  const [selectedStyle, setSelectedStyle] = useState('bgColor');

  const [currentTheme, setCurrentTheme] = useState('');

  const [colorEditList, setColorEditList] = useState([]);

  const addColorEditList = () => {
    const colorChangedObj = {};
    colorChangedObj.theme = currentTheme;
    colorChangedObj.className = `${currentElement.className}`;
    if (!lodash.isEmpty(currentElement.className)) {
      if (
        !lodash.isEmpty(currentBgColor) &&
        !lodash.isEmpty(targetBgColor) &&
        !lodash.isEqual(currentBgColor, targetBgColor)
      ) {
        const currentHexBgColor = rgb2Hex(currentBgColor);
        colorChangedObj.background = {};
        colorChangedObj.background.from = `${currentHexBgColor}`;
        colorChangedObj.background.to = `${targetBgColor}`;
      }
      if (
        !lodash.isEmpty(currentTextColor) &&
        !lodash.isEmpty(targetTextColor) &&
        !lodash.isEqual(currentTextColor, targetTextColor)
      ) {
        const currentHexTextColor = rgb2Hex(currentTextColor);
        colorChangedObj.color = {};
        colorChangedObj.color.from = `${currentHexTextColor}`;
        colorChangedObj.color.to = `${targetTextColor}`;
      }
      if (
        !lodash.isEmpty(currentBorderColor) &&
        !lodash.isEmpty(targetBorderColor) &&
        !lodash.isEqual(currentBorderColor, targetBorderColor)
      ) {
        const currentHexBorderColor = rgb2Hex(currentBorderColor);
        colorChangedObj.border = {};
        colorChangedObj.border.from = `${currentHexBorderColor}`;
        colorChangedObj.border.to = `${targetBorderColor}`;
      }
    }
    return colorChangedObj;
  };

  const rgb2Hex = (currentColor: any) => {
    const values = currentColor
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    const a = parseFloat(values[3] || 1);
    const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
    const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
    const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return `#${`0${r.toString(16)}`.slice(-2)}${`0${g.toString(16)}`.slice(-2)}${`0${b.toString(
      16
    )}`.slice(-2)}`;
  };

  const reset = () => {
    if (
      styleList.includes('bgColor') &&
      !lodash.isEmpty(currentBgColor) &&
      !lodash.isEmpty(targetBgColor)
    ) {
      setTargetBgColor(rgb2Hex(currentBgColor));
      setColor(rgb2Hex(currentBgColor));
    }
    if (
      styleList.includes('textColor') &&
      !lodash.isEmpty(currentTextColor) &&
      !lodash.isEmpty(targetTextColor)
    ) {
      setTargetTextColor(rgb2Hex(currentTextColor));
      setColor(rgb2Hex(currentTextColor));
    }
    if (
      styleList.includes('borderColor') &&
      !lodash.isEmpty(currentBorderColor) &&
      !lodash.isEmpty(targetBorderColor)
    ) {
      setTargetBorderColor(rgb2Hex(currentBorderColor));
      setColor(rgb2Hex(currentBorderColor));
    }
  };

  const switchTheme = (theme: any) => {
    LS.setItem(LSKey.THEME, theme);
    dispatch({
      type: 'theme/setActiveTheme',
      payload: {
        theme,
      },
    });
    changeTheme();
    setCurrentTheme(theme);
  };

  const hasClass = (ele: any, cls: any) => {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false;
    return new RegExp(`${cls}`).test(`${ele.className}`);
  };

  const addClass = (ele: any, cls: any) => {
    if (!hasClass(ele, cls)) {
      ele.className = ele.className === '' ? cls : `${ele.className} ${cls}`;
    }
  };

  const removeClass = (ele: any, cls: any) => {
    if (hasClass(ele, cls)) {
      let newClass = ` ${ele.className.replace(/[\t\r\n]/g, '')} `;
      while (newClass.indexOf(`${cls}`) >= 0) {
        newClass = newClass.replace(`${cls}`, ' ');
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  };

  const onChangeRadio = (e: any) => {
    setSelectedStyle(e.target.value);
    styleList.push(e.target.value);
  };

  const removeRepeatItem = (newColorEditList: any, colorChangedObj: any) => {
    const repeatColorList = lodash.filter(
      newColorEditList,
      (item) => item.className === colorChangedObj.className
    );
    const newColorEditItem = lodash.assign(repeatColorList[0], colorChangedObj);
    if (!repeatColorList[0]) {
      newColorEditList.push(newColorEditItem);
    }
    return newColorEditList;
  };

  const handleChange = (value: any) => {
    setColor(value);
  };

  const handleCancel = async () => {
    const newColorEditList = [...colorEditList];
    const colorChangedObj = addColorEditList();
    const removeRepeatList = removeRepeatItem(newColorEditList, colorChangedObj);
    setColorEditList(removeRepeatList);
    setSelectedStyle('bgColor');
    styleList = ['bgColor'];
    setIsModalVisible(false);
  };

  const downLoad = () => {
    const newColorEditList = [...colorEditList];
    const colorChangedObj = addColorEditList();
    const finalColorEditList = removeRepeatItem(newColorEditList, colorChangedObj);
    const file = document.createElement('a');
    const message = JSON.stringify(finalColorEditList);
    file.setAttribute('href', `data:application/json;charset=utf-8,${encodeURIComponent(message)}`);
    file.setAttribute('download', `ColorChangedInfo-${new Date().getTime()}`);
    file.style.display = 'none';
    document.body.appendChild(file);
    file.click();
    document.body.removeChild(file);
    setColorEditList([]);
  };

  useEffect(() => {
    if (!lodash.isEmpty(currentElement) && !lodash.isEmpty(color)) {
      if (selectedStyle === 'bgColor') {
        currentElement.style.backgroundColor = color;
        setTargetBgColor(color);
      }
      if (selectedStyle === 'textColor') {
        currentElement.style.color = color;
        setTargetTextColor(color);
      }
      if (selectedStyle === 'borderColor') {
        currentElement.style.borderColor = color;
        setTargetBorderColor(color);
      }
    }
  }, [color]);

  useEffect(() => {
    if (element) {
      setCurrentBgColor(window.getComputedStyle(element.target).backgroundColor);
      setCurrentTextColor(window.getComputedStyle(element.target).color);
      setCurrentBorderColor(window.getComputedStyle(element.target).borderColor);
    }
    if (isModalVisible) {
      document.onmousemove = (e) => {
        removeClass(e.target, styles.cover);
      };
      setCurrentElement(element.target);
    }
    if (!isModalVisible) {
      setCurrentBgColor('');
      setTargetBgColor('');
      setCurrentTextColor('');
      setTargetTextColor('');
      setCurrentBorderColor('');
      setTargetBorderColor('');
    }
  }, [isModalVisible]);

  window.addEventListener('hashchange', () => {
    try {
      const url = location.href;
      setCurrentTheme(activeTheme);
      if (
        activeTheme === 'dark' &&
        url.substring(url.indexOf('#') + 1, url.length) === 'theme_edit=light'
      ) {
        switchTheme('light');
      }
      if (
        activeTheme === 'light' &&
        url.substring(url.indexOf('#') + 1, url.length) === 'theme_edit=dark'
      ) {
        switchTheme('dark');
      }

      [].forEach.call(document.querySelectorAll('*'), (ele) => {
        ele.style.outlineStyle = 'dashed';
        ele.style.outlineWidth = 'thin';
        ele.style.outlineColor = 'orange';
      });

      document.querySelectorAll('*').forEach((node) => {
        node.addEventListener('click', (event) => {
          element = event;
          const isOpenColorEditor = lodash.some(event.path, (item) =>
            [
              'ant-modal react-app-utils-theme-index-colorEditor',
              'ant-select-dropdown-menu-item colorSelect ant-select-dropdown-menu-item-active',
            ].includes(item?.className)
          );
          if (!isOpenColorEditor) {
            event.stopImmediatePropagation();
            setIsModalVisible(true);
          }
        });
      });

      document.onmouseover = (e) => {
        addClass(e.target, styles.cover);
      };

      document.onmouseout = (e) => {
        removeClass(e.target, styles.cover);
      };
    } catch (err) {
      throw 'error';
    }
  });

  return (
    <Modal
      title="Theme Editer"
      visible={isModalVisible}
      onCancel={handleCancel}
      className={styles.colorEditor}
      footer={null}
    >
      <div>
        <p>The background color of the current element: {rgb2Hex(currentBgColor)}</p>
        <br />
        <p>Color of the current element: {rgb2Hex(currentTextColor)}</p>
        <br />
        <p>Color of the current element: {rgb2Hex(currentBorderColor)}</p>
        <br />
        <div>Select the existing color of the system:</div>
        <Select style={{ width: 360, marginBottom: 20 }} onChange={handleChange}>
          {lodash.map(colorValiable, (item: any) => {
            return (
              <Select.Option
                key={item}
                value={item?.value}
                className="colorSelect"
                style={{ paddingRight: 20 }}
                key={item?.name}
              >
                <div className={styles.colorValue}>
                  {item?.name} ( {item?.value} )
                </div>
                <div className={styles.colorPiece} style={{ backgroundColor: item?.value }} />
              </Select.Option>
            );
          })}
        </Select>
        <div className={styles.content}>
          <div>
            <RadioGroup onChange={onChangeRadio} value={selectedStyle}>
              <Radio key="bgColor" value="bgColor" className={styles.radio}>
                background color
              </Radio>
              <Radio key="textColor" value="textColor">
                text color
              </Radio>
              <Radio key="borderColor" value="borderColor">
                border color
              </Radio>
            </RadioGroup>
            <Button className={styles.btn} onClick={reset}>
              重置
            </Button>
            <br />
            <Button className={styles.btn} onClick={downLoad}>
              Download
            </Button>
          </div>
          <ColorPicker color={color} setColor={setColor} style={{ width: '400px' }} />
        </div>
      </div>
    </Modal>
  );
};

export default ElementModal;
