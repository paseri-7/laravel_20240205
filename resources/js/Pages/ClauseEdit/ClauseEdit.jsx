import React from 'react';
import ClauseEditInner from './ClauseEditInner';
import SideMenu from '@/Components/SideMenu';

// メンテナンスの中身である別コンポーネントを呼び出す
function ClauseEdit({clause}) {
    return(
        <>
            <div className="flex">
                <div className="w-2/12 bg-slate-100 h-screen">
                    <SideMenu active={'clause'}></SideMenu>
                </div>
                <div className="w-10/12 mx-5">
                    <ClauseEditInner clause={clause}/>
                </div>
            </div>
        </>
    );
}

export default ClauseEdit