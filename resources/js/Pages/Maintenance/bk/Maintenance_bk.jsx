import React from 'react';
import {createRoot } from 'react-dom/client';
// import { css } from "@emotion/react";
import MaintenanceInner from './MaintenanceInner_bk';

// メンテナンスの中身である別コンポーネントを呼び出す
const Maintenance =()=>{
    return(
        <div>
            <MaintenanceInner/>
        </div>
    );
};

// welcome.blade.php にレンダリングするための記述
const container = document.getElementById('maintenance-menu')
if (container) {
    createRoot(container).render(<Maintenance/>);
}