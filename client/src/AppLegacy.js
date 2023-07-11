// import { useEffect, useState, useCallback, useRef } from "react";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import "ag-grid-enterprise";
// const {
//     AppRoute,
//     PaginationData,
//     columnsPeoples,
//     columnsPhones,
// } = require("./consts");

// function App() {
//     const gridRef = useRef();

//     const [columnsDefs, setColumnDefs] = useState(columnsPeoples);

//     const [gridApi, setGridApi] = useState(null);

//     const [tableName, setTableName] = useState(AppRoute.Peoples);


//     const openPeoples = useCallback(() => {
//         gridRef.current.api.setColumnDefs(columnsPeoples);
//         setTableName(AppRoute.Peoples);
        
//         gridRef.current.api.refreshCells({
//             force: true,
//         })
//         console.log(columnsPeoples);
//     }, [columnsPeoples]);

//     const openPhones = useCallback(() => {
//         gridRef.current.api.refreshCells({
//             force: true,
//         })
//         gridRef.current.api.setColumnDefs("columnsPhones",columnsPhones);
 
//         console.log(columnsPhones);
//         setTableName(AppRoute.Phones);
        
//     }, [columnsPhones]);

//     const onGridReady = useCallback((params) => {
//         //setGridApi(params);
//         console.log(gridApi);
//         console.log("params", params);
//         console.log("tablename",tableName);
        
//         params.api.setServerSideDatasource({
//             getRows(params) {
//                 // const countRowsResponse = fetch(`http://localhost:4444/api/peoples/count`);
//                 console.log("current page",params.api.paginationProxy.currentPage);
//                 let { startRow, endRow } = params.request;
//                 fetch(
//                     `http://localhost:4444/api/${tableName}?_start=${startRow}&_end=${endRow}`
//                 )
//                     .then((resp) => resp.json())
//                     .then((data) => {
//                         params.success({
//                             rowData: data,
//                             rowCount: 1000,
//                         });
//                         console.log(data);
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                         params.fail();
//                     });
//             },
//         });

//         params.api.sizeColumnsToFit();
//         window.addEventListener("resize", function () {
//             setTimeout(function () {
//                 params.api.sizeColumnsToFit();
//             });
//         });

//         gridRef.current.api.sizeColumnsToFit();
//     },[tableName]);

    

//     return (
//         <div className="container">
//             <div className="container_buttons">
//                 <button
//                     disabled={tableName === AppRoute.Peoples}
//                     className="buttons"
//                     onClick={openPeoples}
//                 >
//                     Люди
//                 </button>
//                 <button
//                     disabled={tableName === AppRoute.Phones}
//                     className="buttons"
//                     onClick={openPhones}
//                 >
//                     Номера телефонов
//                 </button>
//             </div>
//             <div className="table">
//                 <div
//                     className="ag-theme-alpine "
//                     style={{ width: "100%", height: "100%" }}
//                 >
//                     <button className="buttons">Добавить</button>
//                     <button className="buttons">Изменить</button>
//                     <button className="buttons">Удалить</button>
//                     <AgGridReact
//                         // rowData={rowsData}
//                         columnDefs={columnsDefs}
//                         ref={gridRef}
//                         onGridReady={onGridReady}
//                         rowModelType={"serverSide"}
//                         pagination={true}
//                         paginationPageSize={PaginationData.PaginationPageSize}
//                         cacheBlockSize={PaginationData.CacheBlockSize}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default App;
