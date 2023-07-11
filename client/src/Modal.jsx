import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

function Modal({
    isVisible = false,
    operation,
    onClose,
    tableName,
    title,
    content,
    gridRef,
    onGridReady,
}) {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case "Escape":
                onClose();
                break;
            default:
        }
    };

    console.log("tableNameModal", tableName);
    console.log("operation", operation);

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
    }, []);

    async function onSubmit(e) {
        switch (operation) {
            case "add":
                if (tableName === "peoples") {
                    let content = document.querySelector(".modal-content");
                    const nameField = content.querySelector("#first_name");
                    const lastNameField = content.querySelector("#last_name");
                    const birthdayField =
                        content.querySelector("#birthday").value;
                    const genderField = content.querySelector("#gender").value;
                    const heightField = content.querySelector("#height").value;
                    const weightField = content.querySelector("#weight").value;

                    const patternMisName = nameField.validity.patternMismatch;
                    const patternMisLastName =
                    lastNameField.validity.patternMismatch;
                    if (
                        !(
                            nameField.value &&
                            lastNameField &&
                            birthdayField &&
                            genderField &&
                            heightField &&
                            weightField &&
                            !patternMisName &&
                            !patternMisLastName
                        )
                    ) {
                        return;
                    }

                    e.preventDefault();

                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            first_name: nameField.value,
                            last_name: lastNameField.value,
                            birthday: birthdayField,
                            gender: genderField,
                            height: heightField,
                            weight: weightField,
                        }),
                    };

                    const response = await fetch(
                        `http://localhost:4444/api/${tableName}`,
                        requestOptions
                    );

                    const responseJson = await response.json();
                    console.log("responseJsonPeopleAdd",responseJson);

                    onClose();
                    onGridReady(gridRef.current);

                    break;
                } else if (tableName === "phones") {
                    let content = document.querySelector(".modal-content");
                    const phoneNumberField =
                        content.querySelector("#phone_number");
                    const peopleIdField =
                        content.querySelector("#people_id").value;
                    const assignmentField =
                        content.querySelector("#assignment").value;

                    const patternMisNumberPhone = phoneNumberField.validity.patternMismatch;

                    if (
                        !(phoneNumberField.value && peopleIdField && assignmentField && !patternMisNumberPhone)
                    ) {
                        return;
                    }
                    e.preventDefault();
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            phone_number: phoneNumberField.value,
                            people_id: peopleIdField,
                            assignment: assignmentField,
                        }),
                    };

                    const response = await fetch(
                        `http://localhost:4444/api/${tableName}`,
                        requestOptions
                    );

                    const responseJson = await response.json();
                    console.log(responseJson);

                    onClose();
                    onGridReady(gridRef.current);
                    break;
                }
            case "change":
                if (tableName === "peoples") {
                    let content = document.querySelector(".modal-content");
                    const peopleIdField = content.querySelector("#people_id").value;
                    const nameField =
                        content.querySelector("#first_name");
                    const lastNameField =
                        content.querySelector("#last_name");
                    const birthdayField =
                        content.querySelector("#birthday").value;
                    const genderField = content.querySelector("#gender").value;
                    const heightField = content.querySelector("#height").value;
                    const weightField = content.querySelector("#weight").value;
                    const patternMisName = nameField.validity.patternMismatch;
                    const patternMisLastName =
                    lastNameField.validity.patternMismatch;
                    if (
                        !(
                            peopleIdField &&
                            nameField.value &&
                            lastNameField.value &&
                            birthdayField &&
                            genderField &&
                            heightField &&
                            weightField &&
                            !patternMisName && !patternMisLastName
                        )
                    ) {
                        return;
                    }
                    e.preventDefault();
                    const requestOptions = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            people_id: peopleIdField,
                            first_name: nameField.value,
                            last_name: lastNameField.value,
                            birthday: birthdayField,
                            gender: genderField,
                            height: heightField,
                            weight: weightField,
                        }),
                    };

                    const response = await fetch(
                        `http://localhost:4444/api/${tableName}`,
                        requestOptions
                    );

                    const responseJson = await response.json();

                    console.log("responseJsonChangePeople", responseJson);
                    onClose();
                    onGridReady(gridRef.current);
                    break;
                } else if (tableName === "phones") {
                    let content = document.querySelector(".modal-content");
                    const phoneIdField =
                        content.querySelector("#phone_id").value;
                    const phoneNumberField =
                        content.querySelector("#phone_number");
                    const peopleIdField =
                        content.querySelector("#people_id").value;
                    const assignmentField =
                        content.querySelector("#assignment").value;

                    const patternMisNumberPhone = phoneNumberField.validity.patternMismatch;

                    if (
                        !(
                            phoneIdField &&
                            phoneNumberField.value  &&
                            peopleIdField &&
                            assignmentField && !patternMisNumberPhone
                        )
                    ) {
                        return;
                    }
                    e.preventDefault();
                    const requestOptions = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            phone_id: phoneIdField,
                            phone_number: phoneNumberField.value,
                            people_id: peopleIdField,
                            assignment: assignmentField,
                        }),
                    };

                    const response = await fetch(
                        `http://localhost:4444/api/${tableName}`,
                        requestOptions
                    );

                    const responseJson = await response.json();
                    console.log(responseJson);

                    onClose();
                    onGridReady(gridRef.current);
                    break;
                }

            case "delete":
                if (tableName === "peoples") {
                    let content = document.querySelector(".modal-content");
                    const peopleIdField =
                        content.querySelector("#people_id").value;

                    if (!peopleIdField) {
                        return;
                    }
                    e.preventDefault();
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            people_id: peopleIdField,
                        }),
                    };

                    fetch(
                        `http://localhost:4444/api/${tableName}/${peopleIdField}`,
                        requestOptions
                    );

                    console.log("content", content);
                    onClose();
                    onGridReady(gridRef.current);
                    break;
                } else if (tableName === "phones") {
                    let content = document.querySelector(".modal-content");
                    const phoneIdField =
                        content.querySelector("#phone_id").value;

                    if (!phoneIdField) {
                        return;
                    }
                    e.preventDefault();
                    const requestOptions = {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            phone_id: phoneIdField,
                        }),
                    };

                    await fetch(
                        `http://localhost:4444/api/${tableName}/${phoneIdField}`,
                        requestOptions
                    );

                    onClose();
                    onGridReady(gridRef.current);
                    break;
                }
        }
    }

    return isVisible ? (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>{title}</h3>
                    <span className='modal-close' onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className='modal-body'>
                    <div className='modal-content'>{content}</div>
                </div>
                <div className='modal-footer'>
                    <button form='submit' type='submit' onClick={onSubmit}>
                        Отправить
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default Modal;
