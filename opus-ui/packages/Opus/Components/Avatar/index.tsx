import { Avatar } from 'antd';
import React, { useState } from 'react';
import { getFirstLetters, getRandomColor } from '../../Utils';

const Main = ({ name }: any) => {
  const [color, setColor] = useState(getRandomColor());

  return (
    <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }}>
      {getFirstLetters(name)}
    </Avatar>
  );
};

export default Main;
