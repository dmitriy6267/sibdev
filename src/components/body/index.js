import React, {Component} from 'react';

import './style.css';

const Body = ({changeInput}) => {
  return (
    <div className="body">
      <div>
        <h1 className="body__header">Поиск видео</h1>
        <div className="body__search">
          <input type="text"
                 name="search" 
                 placeholder="Что хотите посмотреть?"
                 className="search__input"
                 onChange={changeInput}/>
          <button className="search__button">Найти</button>
        </div>
      </div>
    </div>
  )  
};

export default Body;