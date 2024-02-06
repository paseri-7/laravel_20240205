import { Link,usePage } from '@inertiajs/react';
import React from 'react';

const MaintenanceInner =()=>{
  return(
    <>
      <div className='mx-10 mt-10'>
        <h1 className='font-bold'>メンテナンス</h1>
        <div> {/*掲載文管理エリア*/}
          <div className='flex items-center bg-gray-700 h-10 mt-5'>
            <p className='ml-5 font-bold text-white '>掲載文管理</p>
          </div>
          <Link  href={route("clause")} method="get">
            <div className={`
                  hover:bg-gray-100 
                  h-20
                  w-1/3
                  font-bold
                  transition
                  duration-300
                  text-white
                  mt-5
                  flex
                  items-center
            `}>
              <div className='h-12 w-12 bg-green-500 ml-5'></div>
              {/* <img className='ml-5' src="" alt="" /> */}
              <p className='text-black ml-5'>同意文言管理</p>
            </div>
          </Link>
        </div>
        <div> {/*サイト管理エリア*/}
          <div className='flex items-center bg-gray-700 h-10 mt-5'>
            <p className='ml-5 font-bold text-white '>サイト管理</p>
          </div>
          <Link  href={route("notice")} method="get">
            <div className={`
                    hover:bg-gray-100 
                    h-20
                    w-1/3
                    font-bold
                    transition
                    duration-300
                    text-white
                    mt-5
                    flex
                    items-center
                    `}>
                <div className='h-12 w-12 bg-red-500 ml-5'></div>
                {/* <img className='ml-5' src="" alt="" /> */}
                <p className='text-black ml-5'>お知らせ管理</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

// maintenance.jsx でコンポーネントが呼び出されるため、export
// export default MaintenanceInner;
export default MaintenanceInner;