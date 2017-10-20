'use strict';
import React from 'react';
import Desking from './organisms/Desking/Desking';
import RatesAndResiduals from './organisms/RatesAndResiduals/RatesAndResiduals';
import TradeIn from './organisms/TradeIn/TradeIn';

const DeskingPage = () => {
  return (
    <div className="desking-page" id="DeskingPage">
      <Desking/>
      <RatesAndResiduals/>
      <TradeIn/>
    </div>
  );
};

export default DeskingPage;
