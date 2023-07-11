import React, {
    useCallback,
    useRef,
    useReducer,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import Modal from "./Modal";
const { PaginationData } = require("./consts");

function Table({ tableName, columnDefs }) {
    const gridRef = useRef();

    const onGridReady = useCallback(
        (params) => {
            console.log("params", params);
            console.log("tablename", tableName);
            console.log("gridRef", gridRef);
            params.api.setServerSideDatasource({
                async getRows(params) {

                    let { startRow, endRow } = params.request;
                    gridRef.current.api.getDisplayedRowCount();

                    let dataCountNumber;

                    if (gridRef.current.api.getDisplayedRowCount() === 1) {

                        const respCount = await fetch(
                            `http://localhost:4444/api/${tableName}/count`
                        );
                        dataCountNumber = Number(await respCount.text());
                        console.log(dataCountNumber);
                    }

                    const respData = await fetch(
                        `http://localhost:4444/api/${tableName}?_start=${startRow}&_end=${endRow}`
                    );
                    respData
                        .json()
                        .then((respDataJson) => {
                            params.success({
                                rowData: respDataJson,
                                rowCount:
                                    dataCountNumber ||
                                    gridRef.current.api.getDisplayedRowCount(),
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                            params.fail();
                        });
                },
            });

            params.api.sizeColumnsToFit();
        },
        [tableName, gridRef]
    );

    const [state, dispatch] = useReducer(reducer, {
        content: null,
        title: "Modal",
        isModal: false,
        operation: null,
    });

    function reducer(state, action) {
        if (action.type === "closeModal") {
            return { isModal: false };
        }

        if (action.type === "openModal") {
            return { isModal: true };
        }

        if (action.type === "add") {
            if (tableName === "peoples") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='first_name'>Имя: </label>
                                    <input
                                        type='text'
                                        id='first_name'
                                        placeholder='Руслан'
                                        title = "Формат должен содержать только кириллицу или латинницу"
                                        pattern='[a-zA-zА-Яа-яЁе]+'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='last_name'>Фамилия: </label>
                                    <input
                                        type='text'
                                        id='last_name'
                                        placeholder='Чекушин'
                                        title = "Формат должен содержать только кириллицу или латинницу"
                                        pattern='[a-zA-zА-Яа-яЁе]+'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='birthday'>
                                        День рождения:
                                    </label>
                                    <input type='date' id='birthday' required />
                                </div>

                                <div>
                                    <label htmlFor='gender'>Пол: </label>
                                    <select id='gender' required>
                                        <option value='M'>M</option>
                                        <option value='F'>F</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor='height'>Рост: </label>
                                    <input
                                        type='number'
                                        id='height'
                                        placeholder='175'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='weight'>Вес: </label>
                                    <input
                                        type='number'
                                        id='weight'
                                        placeholder='60'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Добавить человека",
                    isModal: true,
                    operation: "add",
                };
            } else if (tableName === "phones") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='phone_number'>
                                        Номер телефона:{" "}
                                    </label>
                                    <input
                                        type='text'
                                        id='phone_number'
                                        placeholder='89774391120'
                                        title = "Формат должен содержать номер телефона в виде +89774391120"
                                        pattern='\+[0-9]{11,13}'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='people_id'>
                                        id человека:{" "}
                                    </label>
                                    <input
                                        type='text'
                                        id='people_id'
                                        placeholder='24'
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='assignment'>
                                        Дата присвоения:{" "}
                                    </label>
                                    <input
                                        type='date'
                                        id='assignment'
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Добавить номер телефона",
                    isModal: true,
                    operation: "add",
                };
            }
        } else if (action.type === "change") {
            if (tableName === "peoples") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='people_id'>id: </label>
                                    <input
                                        type='number'
                                        id='people_id'
                                        placeholder='1'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='first_name'>Имя: </label>
                                    <input
                                        type='text'
                                        id='first_name'
                                        placeholder='Руслан'
                                        title = "Формат должен содержать только кириллицу или латинницу"
                                        pattern='[a-zA-zА-Яа-яЁе]+'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='last_name'>Фамилия: </label>
                                    <input
                                        type='text'
                                        id='last_name'
                                        placeholder='Чекушин'
                                        title = "Формат должен содержать только кириллицу или латинницу"
                                        pattern='[a-zA-zА-Яа-яЁе]+'
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor='birthday'>
                                        День рождения:
                                    </label>
                                    <input type='date' id='birthday' required />
                                </div>

                                <div>
                                    <label htmlFor='gender'>Пол: </label>
                                    <select id='gender' required>
                                        <option value='M'>M</option>
                                        <option value='F'>F</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor='height'>Рост: </label>
                                    <input
                                        type='number'
                                        id='height'
                                        placeholder='175'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='weight'>Вес: </label>
                                    <input
                                        type='number'
                                        id='weight'
                                        placeholder='60'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Изменить человека",
                    isModal: true,
                    operation: "change",
                };
            } else if (tableName === "phones") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='phone_id'>id: </label>
                                    <input
                                        type='number'
                                        id='phone_id'
                                        placeholder='1'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='phone_number'>
                                        Номер телефона:{" "}
                                    </label>
                                    <input
                                        type='text'
                                        id='phone_number'
                                        placeholder='+89774391120'
                                        required
                                        title = "Формат должен содержать номер телефона в виде +89774391120"
                                        pattern='\+[0-9]{11,13}'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='people_id'>
                                        id человека:{" "}
                                    </label>
                                    <input
                                        type='number'
                                        id='people_id'
                                        placeholder='24'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>

                                <div>
                                    <label htmlFor='assignment'>
                                        Дата присвоения:{" "}
                                    </label>
                                    <input
                                        type='date'
                                        id='assignment'
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Изменить номер телефона",
                    isModal: true,
                    operation: "change",
                };
            }
        } else if ((action.type = "delete")) {
            if (tableName === "peoples") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='people_id'>id: </label>
                                    <input
                                        type='number'
                                        id='people_id'
                                        placeholder='1'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Удалить человека",
                    isModal: true,
                    operation: "delete",
                };
            } else if (tableName === "phones") {
                return {
                    content: (
                        <form id='submit'>
                            <div>
                                <div>
                                    <label htmlFor='phone_id'>id: </label>
                                    <input
                                        type='number'
                                        id='phone_id'
                                        placeholder='1'
                                        required
                                        title = "Формат должен содержать только числа"
                                        pattern='[0-9]+'
                                    />
                                </div>
                            </div>
                        </form>
                    ),
                    title: "Удалить номер телефона",
                    isModal: true,
                    operation: "delete",
                };
            }
        }
        throw Error("Unknown action.");
    }

    function onAdd() {
        dispatch({ type: "add" });
    }
    function onChange() {
        dispatch({ type: "change" });
    }
    function onDelete() {
        dispatch({ type: "delete" });
    }

    const onClose = useCallback(() => {
        dispatch({ type: "closeModal" });
    }, []);

    return (
        <div className='table'>
            <div
                className='ag-theme-alpine '
                style={{ width: "100%", height: "100%" }}
            >
                <button className='buttons' onClick={onAdd}>
                    Добавить
                </button>
                <button className='buttons' onClick={onChange}>
                    Изменить
                </button>
                <button className='buttons' onClick={onDelete}>
                    Удалить
                </button>

                <Modal
                    isVisible={state.isModal}
                    title={state.title}
                    content={state.content}
                    onClose={onClose}
                    operation={state.operation}
                    tableName={tableName}
                    gridRef={gridRef}
                    onGridReady={onGridReady}
                />
                <AgGridReact
                    columnDefs={columnDefs}
                    ref={gridRef}
                    onGridReady={onGridReady}
                    rowModelType={"serverSide"}
                    pagination={true}
                    paginationPageSize={PaginationData.PaginationPageSize}
                    cacheBlockSize={PaginationData.CacheBlockSize}
                    defaultColDef={{ resizable: true }}
                />
            </div>
        </div>
    );
}

export default Table;
