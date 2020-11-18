import React, { FC } from 'react';
import style from './CCircle.module.scss';

export type levelRange = 1 | 2 | 3 | 4;

const CCircle: FC<{ level: levelRange }> = ({ level }) => {
  return <div className={style[`LEVEL-${level}`]}></div>;
};

export default CCircle;
