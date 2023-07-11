import React, { useEffect, useState, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import Table from "./Table";

const { AppRoute, columnsPeoples, columnsPhones } = require("./consts");

function App() {
    const [tableName, setTableName] = useState(AppRoute.Peoples);
    const [columnDefs, setColumnDefs] = useState(columnsPeoples);

    const openPeoples = useCallback(() => {
        setTableName(AppRoute.Peoples);
        setColumnDefs(columnsPeoples);
    }, []);

    const openPhones = useCallback(() => {
        setTableName(AppRoute.Phones);
        setColumnDefs(columnsPhones);
    }, []);

    return (
        <div key={tableName} className='container'>
            <div className='container_buttons'>
                <button
                    disabled={tableName === AppRoute.Peoples}
                    className='buttons'
                    onClick={openPeoples}
                >
                    Люди
                </button>
                <button
                    disabled={tableName === AppRoute.Phones}
                    className='buttons'
                    onClick={openPhones}
                >
                    Номера телефонов
                </button>
            </div>

            <Table tableName={tableName} columnDefs={columnDefs} />
        </div>
    );
}

export default App;
