import React from 'react';
import ClauseInner from './ClauseInner';
import SideMenu from '@/Components/SideMenu';

// メンテナンスの中身である別コンポーネントを呼び出す
function Clause({clauses}) {

    return(
        <>
            <div className="flex">
                <div className="w-2/12 bg-slate-100 h-screen">
                    <SideMenu active={"clause"}></SideMenu>
                </div>
                <div className="w-10/12 mx-5">
                    <ClauseInner clauses={clauses}/>
                </div>
            </div>
        </>
    );
}

export default Clause