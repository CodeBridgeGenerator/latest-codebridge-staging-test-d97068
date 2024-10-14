import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef } from "react";
import _ from "lodash";
import { Button } from "primereact/button";
import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";

const DocumentStoragesDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");

  const pTemplate0 = (rowData, { rowIndex }) => <p>{rowData.name}</p>;
  const p_numberTemplate1 = (rowData, { rowIndex }) => <p>{rowData.size}</p>;
  const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.path}</p>;
  const p_dateTemplate3 = (rowData, { rowIndex }) => (
    <p>{new Date(rowData.lastModifiedDate).toLocaleDateString()}</p>
  );
  const p_numberTemplate4 = (rowData, { rowIndex }) => (
    <p>{rowData.lastModified}</p>
  );
  const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.eTag}</p>;
  const pTemplate6 = (rowData, { rowIndex }) => <p>{rowData.versionId}</p>;
  const pTemplate7 = (rowData, { rowIndex }) => <p>{rowData.url}</p>;
  const pTemplate8 = (rowData, { rowIndex }) => <p>{rowData.tableId}</p>;
  const pTemplate9 = (rowData, { rowIndex }) => <p>{rowData.tableName}</p>;
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );
  const pCreatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.createdAt).fromNow()}</p>
  );
  const pUpdatedAt = (rowData, { rowIndex }) => (
    <p>{moment(rowData.updatedAt).fromNow()}</p>
  );
  const pCreatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.createdBy?.name}</p>
  );
  const pUpdatedBy = (rowData, { rowIndex }) => (
    <p>{rowData.updatedBy?.name}</p>
  );
  const paginatorLeft = (
    <Button
      type="button"
      icon="pi pi-upload"
      text
      onClick={() => setShowUpload(true)}
      disabled={!true}
    />
  );
  const paginatorRight = DownloadCSV({
    data: items,
    fileName: "documentStorages",
  });
  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  return (
    <>
      <DataTable
        value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        paginatorLeft={paginatorLeft}
        paginatorRight={paginatorRight}
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        loading={loading}
      >
        <Column
          field="name"
          header="Document Name"
          body={pTemplate0}
          filter={selectedFilterFields.includes("name")}
          hidden={selectedHideFields?.includes("name")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="size"
          header="Size"
          body={p_numberTemplate1}
          filter={selectedFilterFields.includes("size")}
          hidden={selectedHideFields?.includes("size")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="path"
          header="Path"
          body={pTemplate2}
          filter={selectedFilterFields.includes("path")}
          hidden={selectedHideFields?.includes("path")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="lastModifiedDate"
          header="Last Modified Date"
          body={p_dateTemplate3}
          filter={selectedFilterFields.includes("lastModifiedDate")}
          hidden={selectedHideFields?.includes("lastModifiedDate")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="lastModified"
          header="Last Modified"
          body={p_numberTemplate4}
          filter={selectedFilterFields.includes("lastModified")}
          hidden={selectedHideFields?.includes("lastModified")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="eTag"
          header="AWS ETag"
          body={pTemplate5}
          filter={selectedFilterFields.includes("eTag")}
          hidden={selectedHideFields?.includes("eTag")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="versionId"
          header="AWS Version Id"
          body={pTemplate6}
          filter={selectedFilterFields.includes("versionId")}
          hidden={selectedHideFields?.includes("versionId")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="url"
          header="Url"
          body={pTemplate7}
          filter={selectedFilterFields.includes("url")}
          hidden={selectedHideFields?.includes("url")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="tableId"
          header="Table Id"
          body={pTemplate8}
          filter={selectedFilterFields.includes("tableId")}
          hidden={selectedHideFields?.includes("tableId")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="tableName"
          header="Table Name"
          body={pTemplate9}
          filter={selectedFilterFields.includes("tableName")}
          hidden={selectedHideFields?.includes("tableName")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column header="Edit" body={editTemplate} />
        <Column header="Delete" body={deleteTemplate} />
      </DataTable>
      <Dialog
        header="Upload DocumentStorages Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="documentStorages"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search DocumentStorages"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
        Search
      </Dialog>
      <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false);
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default DocumentStoragesDataTable;
