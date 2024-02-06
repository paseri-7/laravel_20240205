import { Link, Head } from '@inertiajs/react';

function SideMenu({active}) {
    return (
        <>
            <div className="mx-2">
                <div className="py-5 my-5 bg-white">
                    <p className="ml-2">メンテナンス</p>
                </div>
                <p className="mb-5">掲載文管理</p>
                <div className="ml-5 mb-5">
                    <Link href={route("clause")} method="get">
                        <p className={`
                            hover:text-sky-400
                            hover:font-bold
                            transition
                            duration-300
                            ${active === 'clause'? 'text-sky-400 font-bold' : ''}
                        `}>同意文言管理</p>
                    </Link>
                </div>
                <p className="mb-5">サイト管理</p>
                <div className="ml-5 mb-5">
                    <Link href={route("notice")} method="get">
                        <p className={`
                            hover:text-sky-400
                            hover:font-bold
                            transition
                            duration-300
                            ${active === 'notice'? 'text-sky-400 font-bold' : ''}
                        `}>お知らせ管理</p>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SideMenu;
