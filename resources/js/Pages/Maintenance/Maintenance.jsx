import React from 'react';
import MaintenanceInner from './MaintenanceInner';

// メンテナンスの中身である別コンポーネントを呼び出す
function Maintenance() {
    return(
        <>
            <div>
                <MaintenanceInner/>
            </div>
        </>
    );
}

export default Maintenance
