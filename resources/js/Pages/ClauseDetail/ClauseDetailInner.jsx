import { InertiaLink } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/react';
import React from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";

const ClauseDetailInner =({clause})=>{

  // 日付フォーマット 時刻なし
  function formatDate(dateString) {
    if (dateString) { 
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const formattedDate = new Date(dateString).toLocaleDateString('ja-JP', options);
      return formattedDate;
    }else{
      return null
    }
  }

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
        <Link href={route("clause")} method="get">
          <span className="underline transition duration-300 hover:opacity-50 hover:no-underline ">同意文言管理</span>
        </Link>
        <MdKeyboardArrowRight color='#959595' className="ml-3"/>
        <span className="ml-3">同意文言詳細</span>
      </div>
      <h1 className="my-7 font-bold text-lg">同意文言詳細</h1>
      <div>
          <dl className="flex flex-wrap w-full">
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm ">
              <span className="ml-3">タイトル</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{clause.title}</span>
            </dd>
            <dt className="w-2/12 py-8 bg-slate-50 border border-gray-200 rounded-sm ">
              <span className="ml-3">本文</span>
            </dt>
            <dd className="w-10/12 py-8 border border-gray-200 rounded-sm">
              <span className="ml-3" dangerouslySetInnerHTML={{ __html: clause.text }}></span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm ">
              <span className="ml-3">タイプ</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{type(clause.type)}</span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm">
              <span className="ml-3">開始日</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{formatDate(clause.start_date)}</span>
            </dd>
            <dt className="w-2/12 py-5 bg-slate-50 border border-gray-200 rounded-sm">
              <span className="ml-3">終了日</span>
            </dt>
            <dd className="w-10/12 py-5 border border-gray-200 rounded-sm">
              <span className="ml-3">{formatDate(clause.end_date)}</span>
            </dd>
          </dl>
      </div>
      <div className="flex items-center justify-center gap-7 mt-5">
        <Link href={route("clause")} method="get">
          <button className="w-40 h-8 mr-4 px-2 py-1 bg-slate-100 rounded-3xl border border-slate-200 hover:opacity-70">戻る</button>
        </Link>
        <InertiaLink
            href={route('clause_edit', { id: clause.id })}
            method="get"
        >
            <button className="w-40 h-8 mr-4 text-white px-2 py-1 bg-sky-400 rounded-3xl hover:opacity-70">編集</button>
        </InertiaLink>
      </div>
    </>
  );
};

// Notice.jsx でコンポーネントが呼び出されるため、export
export default ClauseDetailInner;