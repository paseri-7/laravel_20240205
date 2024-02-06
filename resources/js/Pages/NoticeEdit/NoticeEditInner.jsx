import { Link } from '@inertiajs/react';
import React, { useState,useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker, { registerLocale } from "react-datepicker"
import ja from 'date-fns/locale/ja';
import { BiCalendar } from "react-icons/bi";
import { MdKeyboardArrowRight } from "react-icons/md";
import Modal from '@/Components/Modal';
import axios from 'axios';

const NoticeEditInner =({notice})=>{
  
  // テキストエリア
  const [text, setText] = useState(notice.text);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  // 日付
  const Today = new Date();
  const [date, setDate] = React.useState(notice.end_date);
  registerLocale('ja', ja);

  // 時刻
  const NoticeDate = new Date(notice.end_date);

  // 時間
  const hours = NoticeDate.getHours();
  const [selected, setSelected] = useState("");
  
  useEffect(() => {
    // selectの初期値をhoursにしたい時
    setSelected(hours);
  }, []);
  
  // 選んだoptionを選択状態にする処理
  function handleChange(event) {
    setSelected(event.target.value);
  }

  // console.log("時：" + selected);

  // 分 
  const minute = NoticeDate.getMinutes();
  const [selectedMinute, setSelectedMinute] = useState("");
  
  useEffect(() => {
    // selectの初期値をhoursにしたい時
    setSelectedMinute(minute);
  }, []);
  
  // 選んだoptionを選択状態にする処理
  function handleChangeMinute(event) {
    setSelectedMinute(event.target.value);
  }

  // console.log("分："+ selectedMinute);

  // ラジオボタン
  const [selectedValue, setSelectedValue] = useState(notice.show_flg);

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  // モーダル
  const [newPostFlg, setNewPostFlg] = useState(false);
  // function handleTextChange (e) {
  //   setText(e.target.value);
  // }
  function showPostModal() {
    if(!newPostFlg) {
        setNewPostFlg(true);
    }else {
        setNewPostFlg(false);
    }
  }

  // 更新時の処理
  function handleSubmit() {
    
    // dateFromDatabaseにはデータベースから取得した日付が入っていると仮定します
    const dateFromDatabase = new Date(date);

    // 日付を 'YYYY-MM-DD' フォーマットに変更
    // let formattedDate = dateFromDatabase.toISOString().split('T')[0];

    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formattedDate = dateFromDatabase.toLocaleDateString('sv-SE', options);

    // 日付、時、分を結合
    const combinedDateTime = `${formattedDate} ${selected}:${selectedMinute}`;

    console.log('テキスト：', text);
    console.log('結合された日時', combinedDateTime);
    console.log('日付', date);
    console.log('時', selected);
    console.log('分', selectedMinute);
    console.log('状態', selectedValue);

    const formData = new FormData();
    formData.append('id', notice.id);
    formData.append('text', text);
    formData.append('date', combinedDateTime);
    formData.append('show_flg', selectedValue);
    
    axios.post('/notice_edit', formData)
         .then((response) => {
            console.log('APIレスポンス：', response.data);
            // 投稿処理が成功した後に画面をリロード
            location.reload();
         })
         .catch((error) => {
            console.log('APIエラー：', error);
         });

    showPostModal();
}

  return(
    <>
      <div className="flex items-center mt-5">
        <Link href={route("maintenance")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline">メンテナンス</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <Link href={route("notice")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline ml-3">お知らせ管理</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <span className="ml-3">お知らせ編集</span>
      </div>
      <h1 className="my-7 font-bold text-lg">お知らせ編集</h1>
      <div>
          <dl className="flex flex-wrap w-full">
            <dt className="w-2/12 py-8 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">お知らせ本文</span>
            </dt>
            <dd className="w-10/12 border border-gray-200 rounded-sm">
              <textarea id="notice-text" className="m-3 border border-gray-200 rounded-sm" value={text} onChange={handleChangeText} cols="120" rows="6"/>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">終了日時</span>
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
              <select id="notice-hours" name="time" className="m-3 border border-gray-200" value={selected} onChange={handleChange}>
                <option value="0">00</option>
                <option value="1">01</option>
                <option value="2">02</option>
                <option value="3">03</option>
                <option value="4">04</option>
                <option value="5">05</option>
                <option value="6">06</option>
                <option value="7">07</option>
                <option value="8">08</option>
                <option value="9">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
              </select>
              <p>:</p>
              <select id="notice_minute" name="minute" className="m-3 border border-gray-200" value={selectedMinute} onChange={handleChangeMinute}>
                <option value="0">00</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm flex items-center">
              <span className="ml-3">状態</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <label>
                <input
                  type="radio"
                  name="state"
                  value="1"
                  className="m-3"
                  checked = {selectedValue === "1"}
                  onChange={handleChangeRadio}
                />
                  表示
                </label>
                <label>
                  <input
                    type="radio"
                    name="state"
                    value="2"
                    className={"m-3"}
                    checked = {selectedValue === "2"}
                    onChange={handleChangeRadio}
                  />
                  非表示
                </label>
            </dd>
          </dl>
      </div>
      <div className="flex items-center justify-center gap-7 mt-5">
        <Link href={route("notice")} method="get">
          <button className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">キャンセル</button>
        </Link>
          <button onClick={() => showPostModal()} className="w-40 h-8 mr-4 text-white px-2 py-1 bg-orange-600 rounded-3xl hover:opacity-70">更新</button>
      </div>
      <Modal show={newPostFlg} maxWidth="xl" onClose={() => showPostModal()}>
          <div className="p-4">
              <h3 className="text-lg font-medium mb-2 text-center mb-5 mt-10">更新</h3>
              <p className="text-center my-5">お知らせ情報を更新します。よろしいですか。</p>
              <div className="flex gap-4 justify-center mt-5 mb-7">
                <button onClick={() => showPostModal()} className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">キャンセル</button>
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
export default NoticeEditInner;