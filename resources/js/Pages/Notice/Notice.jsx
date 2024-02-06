import React from 'react';
import NoticeInner from './NoticeInner';
import SideMenu from '@/Components/SideMenu';

// メンテナンスの中身である別コンポーネントを呼び出す
function Notice({notice}) {
    return(
        <>
            <div className="flex">
                <div className="w-2/12 bg-slate-100 h-screen">
                    <SideMenu active={'notice'}></SideMenu>
                </div>
                <div className="w-10/12 mx-5">
                    <NoticeInner notice={notice}/>
                </div>
            </div>
        </>
    );
}

export default Notice