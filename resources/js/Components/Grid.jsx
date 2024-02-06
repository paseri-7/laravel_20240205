import { InertiaLink } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';

function ClauseInnerGrid({clauses}) {

    // const [clauseInfoList, setClauseInfoList] = useState(clause);
    // console.log(clauseInfoList);

    const styles = {
        grid: {
          '.MuiDataGrid-toolbarContainer': {
            borderBottom: 'solid 1px rgba(224, 224, 224, 1)'  // ついでにツールバーの下に罫線を引く
          },
          '.MuiDataGrid-row .MuiDataGrid-cell:not(:last-child)': {
            borderRight: 'solid 1px rgba(224, 224, 224, 1) !important'
          },
            // 列ヘッダの最終列の右端に罫線を表示する
          '.MuiDataGrid-columnHeadersInner': {
            borderRight: 'solid 1px rgba(224, 224, 224, 1) !important'
          },
           // 列ヘッダに背景色を指定
          '.MuiDataGrid-columnHeaders': {
            backgroundColor: '#EFF0F2', 
            color: '#000000',
          },
          '.MuiDataGrid-row-hover': {
              backgroundColor: '#33a8e61f', 
            },
           width:'100%',
        }
    }
    
    //テーブルの見出し
    const columns = [
        {
            field: 'actions',
            headerName: '',
            width: 70,
            renderCell: (params) => (
                <InertiaLink
                    href={route('clause_detail', { id: params.row.id })}
                    method="get"
                >
                    <button className="w-10 h-5 font-bold text-xs text-white bg-sky-400 rounded-3xl hover:opacity-70">表示</button>
                </InertiaLink>
            ),
          },
        { field: 'title', headerName: 'タイトル', width: 400},
        { field: 'type', headerName: 'タイプ', width: 400 },
        { field: 'start_date', headerName: '開始日', width: 300 },
    ];

    const handleButtonClick = (id) => {
        // Handle button click for the corresponding row ID
        console.log(`Button clicked for row ID: ${id}`);
        <Link href={route(`/clause_detail?id=${id}`)} method="get"/>
    };

    //テーブルの値
    const rows = clauses ? clauses.map((clause) => {

        const dateFromDatabase = new Date(clause.start_date);

        // 日付を 'YYYY-MM-DD' フォーマットに変更
        let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let formattedDate = dateFromDatabase.toLocaleDateString('sv-SE', options); 

        return { id: clause.id, title: clause.title, type: clause.title, start_date: formattedDate};
    }):[];

    console.log('rows:', rows);

    return (
        <>
            <DataGrid
                rows={rows}
                columns={columns}
                sx={styles.grid} 
                density="compact"
                autoHeight
                showColumnRightBorder // 列ヘッダセルの右側に線を引く
                showCellRightBorder   // セルの右側に線を引く
            />
        </>
    )
}
export default ClauseInnerGrid;