import { Link } from '@inertiajs/react';
import React, { useState,useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import { BiCalendar } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import Modal from '@/Components/Modal';
import axios from 'axios';

const ClauseEditInner =({clause})=>{
  
  // テキスト
  const [title, setTitle] = useState(clause.title);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  // テキストエリア
  const [text, setText] = useState(clause.text);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  // タイプ
  function type(type){
    switch (type){
      case 1:
        return "マイページ利用規約";
      case 2:
        return "個人情報同意文言";
      case 3:
        return "個人情報同意文言(物上保証人用)";
      case 4:
        return "反社でない事の表明・確約に関する同意文書";
      case 5:
        return "連帯保証について";
      case 6:
        return "物上保証について";
    }
  }

  // 日付
  const Today = new Date();
  const [date, setDate] = React.useState(clause.start_date);
  registerLocale('ja', ja);

  // モーダル
  const [newClauseFlg, setNewClauseFlg] = useState(false);

  function showClauseModal() {
    if(!newClauseFlg) {
        setNewClauseFlg(true);
    }else {
        setNewClauseFlg(false);
    }
  }

  // 更新時の処理
  function handleSubmit() {
    // dateFromDatabaseにはデータベースから取得した日付が入っていると仮定します
    const dateFromDatabase = new Date(date);

    // // 日付を 'YYYY-MM-DD' フォーマットに変更
    // let formattedDate = dateFromDatabase.toISOString().split('T')[0];

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = dateFromDatabase.toLocaleDateString('sv-SE', options);

    console.log('タイトル', title);
    console.log('テキスト：', text);
    // console.log('結合された日時', combinedDateTime);
    console.log('日付', formattedDate);
    // console.log('時', selected);
    // console.log('分', selectedMinute);
    // console.log('状態', selectedValue);

    const formData = new FormData();
    formData.append('id', clause.id);
    formData.append('title', title);
    formData.append('text', text);
    formData.append('date', formattedDate);
    // formData.append('show_flg', selectedValue);
    
    axios.post('/clause_edit_2', formData)
         .then((response) => {
            console.log('APIレスポンス：', response.data);
            // 投稿処理が成功した後に画面をリロード
            location.reload();
         })
         .catch((error) => {
            console.log('APIエラー：', error);
         });

    showClauseModal();
}

  return(
    <>
      <div className="flex items-center mt-5">
        <Link href={route("maintenance")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline">メンテナンス</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <Link href={route("clause")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline ml-3">同意文言管理</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <span className="ml-3">同意文言編集</span>
      </div>
      <h1 className="my-7 font-bold text-lg">同意文言編集</h1>
      <div>
          <dl className="flex flex-wrap w-full">
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">タイトル</span>
            </dt>
            <dd className="w-10/12 border border-gray-200 rounded-sm">
              <textarea id="clause-text" className="m-3 border border-gray-200 rounded-sm" cols="120" rows="1" value={title} onChange={handleChangeTitle}/>
            </dd>

            <dt className="w-2/12 py-8 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">本文</span>
            </dt>
            <dd className="w-10/12 border border-gray-200 rounded-sm">
              <textarea id="clause-textarea" className="m-3 border border-gray-200 rounded-sm" value={text} onChange={handleChangeText} cols="120" rows="6"/>
            </dd>
            
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm ">
              <span className="ml-3">タイプ</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{type(clause.type)}</span>
            </dd>

            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">開始日</span>
            </dt>
            <dd className="w-10/12 border border-gray-200 rounded-sm flex items-center">
              <DatePicker
                onChange={selectedDate => {setDate(selectedDate || Today)}}
                dateFormat="yyyy/MM/dd"
                locale='ja'
                selected={date}
                minDate={Today}
                className="m-3 w-64 border border-gray-200" 
                name="date"
              />
              <BiCalendar color='#33A8E6' size={30} className="relative right-12"/>
            </dd>
          </dl>
      </div>
      <div className="flex items-center justify-center gap-7 mt-5">
        <Link href={route("clause")} method="get">
          <button className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">キャンセル</button>
        </Link>
          <button onClick={() => showClauseModal()} className="w-40 h-8 mr-4 text-white px-2 py-1 bg-orange-600 rounded-3xl hover:opacity-70">更新</button>
      </div>
      <Modal show={newClauseFlg} maxWidth="xl" onClose={() => showClauseModal()}>
          <div className="p-4">
              <h3 className="text-lg font-medium mb-2 text-center mb-5 mt-10">更新</h3>
              <p className="text-center my-5">同意文言を更新します。よろしいですか。</p>
              <div className="flex gap-4 justify-center mt-5 mb-7">
                <button onClick={() => showClauseModal()} className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">キャンセル</button>
                <button onClick={() => handleSubmit()} className="w-40 h-8 mr-4 text-white font-bold px-2 py-1 bg-orange-600 rounded-3xl hover:opacity-70">
                  実行する
                </button>
              </div>
          </div>
      </Modal>
    </>
  );
};

// Notice.jsx でコンポーネントが呼び出されるため、export
export default ClauseEditInner;