import { Link } from '@inertiajs/react';
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const NoticeInner =({notice})=>{

  // 日付フォーマット 秒なし
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    const formattedDate = new Date(dateString).toLocaleDateString('ja-JP', options);
    return formattedDate;
  }

    // 日付フォーマット 秒あり
  function formatDate2(dateString) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDate = new Date(dateString).toLocaleDateString('ja-JP', options);
    return formattedDate;
  }
  
  // 状態の表示判定処理
  function formatShowFlag(showFlag) {
    return showFlag === "1" ? '表示' : '非表示';
  }
  
  return(
    <>
      <div className="flex items-center mt-5">
        <Link href={route("maintenance")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline ">メンテナンス</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <span className="ml-3">お知らせ管理</span>
      </div>
      <h1 className="my-7 font-bold text-lg">お知らせ管理</h1>
      <div>
          <dl className="flex flex-wrap w-full">
            <dt className="w-2/12 py-8 bg-slate-50 border border-gray-200 rounded-sm ">
              <span className="ml-3">お知らせ本文</span>
            </dt>
            <dd className="w-10/12 py-8 border border-gray-200 rounded-sm">
              <span className="ml-3">{notice.text}</span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm">
              <span className="ml-3">終了日時</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{formatDate(notice.end_date)}</span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm">
              <span className="ml-3">状態</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{formatShowFlag(notice.show_flg)}</span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm">
              <span className="ml-3">登録日時</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{formatDate2(notice.created_at)}</span>
            </dd>
          </dl>
      </div>
      <Link href={route("notice_edit")} method="get" state={{id: notice.id}}>
        <div className="flex justify-center mt-5">
            <button className="w-40 h-8 mr-4 text-white px-2 py-1 bg-sky-400 rounded-3xl hover:opacity-70">編集</button>
        </div>
      </Link>
    </>
  );
};

// Notice.jsx でコンポーネントが呼び出されるため、export
export default NoticeInner;