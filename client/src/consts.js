const AppRoute = {
    Peoples: "peoples",
    Phones: "phones",
};

const PaginationData = {
    PaginationPageSize: 100,
    CacheBlockSize: 100,
};

const columnsPhones = [
    { field: "phone_id", sortable: true, filter: true },
    { field: "phone_number", sortable: true, filter: true },
    { field: "people_id", sortable: true, filter: true },
    { field: "assignment", sortable: true, filter: true },
];

const columnsPeoples = [
    { field: "people_id", sortable: true, filter: true },
    { field: "first_name", sortable: true, filter: true },
    { field: "last_name", sortable: true, filter: true },
    { field: "birthday", sortable: true, filter: true },
    { field: "gender", sortable: true, filter: true },
    { field: "height", sortable: true, filter: true },
    { field: "weight", sortable: true, filter: true },
];

module.exports = {
    AppRoute,
    PaginationData,
    columnsPeoples,
    columnsPhones,
};
