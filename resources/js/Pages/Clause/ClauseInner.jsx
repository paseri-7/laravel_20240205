import { Link } from '@inertiajs/react';
import React, { useState,useEffect,useReducer } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import ClauseInnerGrid from '@/Components/Grid';
import { css } from '@emotion/react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import { BiCalendar } from "react-icons/bi";
import axios from 'axios';

const ClauseInner =({clauses})=>{

  const [clauseInfoList, setClauseInfoList] = useState(clauses); // コンポーネントのstate
  // const [clauseInfoList, setClauseInfoList] = useState(clauses);
  
  // useEffect(() => {
  //   // clausesが変更されたときの処理
  //   console.log('clauses が更新されました:', clauses);
  //   // setClauseInfoList(clauses)
  // }, [clauses]);// clausesが変更されたときにuseEffectを実行

  useEffect(() => {
    // clausesが変更されたときの処理
    console.log('clauseInfoList が更新されました:', clauseInfoList);
    // setClauseInfoList(clauses)
  }, [clauseInfoList]);// clausesが変更されたときにuseEffectを実行

  // console.log("clauseInfoList:",clauseInfoList);
  // console.log("clauses:", clauses);
  

  const [isOpen, setIsOpen] = useState(true);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  // 日付
  // const Today = new Date();
  const [date, setDate] = React.useState("");
  registerLocale('ja', ja);
  

  // 基準日
  // const hours = NoticeDate.getHours();
  const [selected, setSelected] = useState("");
  
  // useEffect(() => {
  //   // selectの初期値をhoursにしたい時
  //   setSelected(hours);
  // }, []);
  
  // 選んだoptionを選択状態にする処理
  function handleChange(event) {
    setSelected(event.target.value);
  }

  // クリアボタン押下
  function clear() {
    setSelected("");
    setDate("");
  }

  // 検索ボタン押下
  function search() {

    console.log('基準日(変換前)', date);
    console.log('タイプ', selected);

    const formData = new FormData();
    formData.append('type', selected);

    // dateFromDatabaseにはデータベースから取得した日付が入っていた場合、変換処理を実施する
    if (date) {
      const dateFromDatabase = new Date(date);
      let options = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      let formattedDate = dateFromDatabase.toLocaleDateString('sv-SE', options);
      console.log('基準日(変換後)', formattedDate);
      formData.append('date', formattedDate);
    }else{
      formData.append('date', date);
    }
        
    axios.post('/search', formData)
    .then((response) => {
      console.log('APIレスポンス：', response.data);

      // APIレスポンスからデータを取り出してstateを更新
      setClauseInfoList(response.data.clauses);

    })
    .catch((error) => {
      console.log('APIエラー：', error);
    });
  }

  // 最新世代表示ボタン押下
  function latest() {
    axios.post('/latest')
    .then((response) => {
      console.log('APIレスポンス：', response.data);

      // APIレスポンスからデータを取り出してstateを更新
      setClauseInfoList(response.data.clauses);

    })
    .catch((error) => {
      console.log('APIエラー：', error);
    });
  }

  // 全世代表示ボタン押下
  function all() {
    axios.post('/all')
    .then((response) => {
      console.log('APIレスポンス：', response.data);

      // APIレスポンスからデータを取り出してstateを更新
      setClauseInfoList(response.data.clauses);

    })
    .catch((error) => {
      console.log('APIエラー：', error);
    });
  }
  
  return(
    <>
      {/* パンくずリスト */}
      <div className="flex items-center mt-5">
        <Link href={route("maintenance")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline ">メンテナンス</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <span className="ml-3">同意文言管理</span>
      </div>

      <h1 className="my-7 font-bold text-lg">同意文言管理</h1>

      {/* 検索エリア */}
      <div
        className={`p-2 cursor-pointer flex items-center bg-gray-700 mt-5`}
        onClick={toggleAccordion}
        css={css`
          cursor: pointer;
          color: #ffffff;
          transition: 2s;
        `}
      >
        <svg
          className={`w-4 h-4 text-white transition-transform ${
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
        <span className={'text-white ml-2 font-bold'}>検索条件</span>
      </div>
      {isOpen && (
        <div className="p-4 border border-gray-500">
          {/* アコーディオンが開いている時の表示 */}
          <div className='flex items-center justify-center gap-7'>
            <div className='flex items-center'>
              <p>タイプ</p>
              <select id="notice_minute" name="minute" className="m-3 border border-gray-200" aria-placeholder='選択してください。' value={selected} onChange={handleChange}>
                  <option value=""> </option>
                  <option value='1'>マイページ利用規約</option>
                  <option value="2">個人情報同意文言</option>
                  <option value="3">個人情報同意文言（物上保証人用）</option>
                  <option value="4">反社でないことの表明・確約に関する同意文書</option>
                  <option value="5">連帯保証について</option>
                  <option value="6">物上保証について</option>
              </select>
            </div>
            <div className='flex items-center'>
              <p>基準日</p>
              <DatePicker
                // onChange={selectedDate => {setDate(selectedDate || null)}}
                onChange={selectedDate => { console.log(selectedDate); setDate(selectedDate || null) }}
                dateFormat="yyyy/MM/dd"
                locale='ja'
                selected={date}
                // minDate={Today}
                className="m-3 w-96 border border-gray-200" 
                name="date"
              />
              <BiCalendar color='#33A8E6' size={30} className="relative right-12"/>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1 w-100 h-28">
            <button onClick={() => clear()} className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">クリア</button> 
            <button onClick={() => search()} className="w-40 h-8 mr-4 text-white px-2 py-1 bg-sky-400 rounded-3xl hover:opacity-70">検索</button> 
            <button onClick={() => latest()} className="w-40 h-8 mr-4 text-white px-2 py-1 bg-sky-400 rounded-3xl hover:opacity-70">最新世代表示</button> 
            <button onClick={() => all()} className="w-40 h-8 mr-4 text-white px-2 py-1 bg-sky-400 rounded-3xl hover:opacity-70">全世代表示</button> 
          </div>
        </div>
      )}

      {/* グリッド */}
      <div className='mt-5'>
        {/* <ClauseInnerGrid clauses={clauses}></ClauseInnerGrid> */}
        <ClauseInnerGrid clauses={clauseInfoList}></ClauseInnerGrid>
      </div>
    </>
  );
};

// Notice.jsx でコンポーネントが呼び出されるため、export
export default ClauseInner;