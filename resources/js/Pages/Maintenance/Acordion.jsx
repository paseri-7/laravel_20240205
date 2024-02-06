/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
// import styles from './Maintenance.scss';

const MaintenanceInner =()=>{

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

//   const hello = css`
//   color: red;
// `

  return(
    <>
      {/* <h1 css={hello}>Hello World!</h1> */}
      <div class="bg-green-400 flex items-center justify-center gap-7 w-100 h-28">
        <button className="w-28 mr-4 text-white px-2 py-1 bg-blue-500 border border-blue-500 rounded-3xl">コメント</button> 
        <button className="w-28 mr-4 text-white px-2 py-1 bg-blue-500 border border-blue-500 rounded-3xl">コメント</button> 
        <button className="w-28 mr-4 text-white px-2 py-1 bg-blue-500 border border-blue-500 rounded-3xl">コメント</button> 
      </div>
      {/* アコーディオン */}
      {/* <div
        className={`p-4 cursor-pointer flex justify-between items-center ${
          isOpen ? 'bg-gray-700' : 'bg-blue-500'
        }`}
        onClick={toggleAccordion}
        css={css`
          cursor: pointer;
          color: #ffffff;
          transition: background-color 1.5s, color 1.5s;
        `}
      > */}
      <div
        className={`p-4 cursor-pointer flex items-center bg-gray-700`}
        onClick={toggleAccordion}
        css={css`
          cursor: pointer;
          color: #ffffff;
          transition: 2s;
        `}
      >
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          // css={css`
          // fill: #ffffff;
          // transition: fill 2s;
          // `}
        >
          <path fill="currentColor" d="M19 9l-7 7-7-7" />
        </svg>
        <span className={'text-white ml-2 bold'}>検索条件</span>
      </div>
      {isOpen && (
        <div className="p-4 border border-gray-500">
          {/* アコーディオンが開いている時の表示 */}
          <p>Accordion Content</p>
        </div>
      )}
    </>
  );
};

// maintenance.jsx でコンポーネントが呼び出されるため、export
export default MaintenanceInner;