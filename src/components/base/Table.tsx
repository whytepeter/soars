import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import Spinner from "./Spinner";
import Empty from "./Empty";

export type TablePagination = {
  page: number;
  limit: number;
  totalRecords: number;
  onPageChange: () => void;
};

export type TableHeadersProps = {
  title: string;
  style?: Record<string, any>;
  field: string;
  slug?: string;
  sortable?: boolean;
  alignFrozen?: "left" | "right";
  frozen?: boolean;
  body?:
    | React.ReactNode
    | ((data: any, options: ColumnBodyOptions) => React.ReactNode);
  onRowClick?: (data: any) => void;
};

export type TableProps = {
  data: any[];
  headers: TableHeadersProps[];
  pagination?: TablePagination;
  selectable?: boolean;
  stripedRows?: boolean;
  hideEmpty?: boolean;
  showGridlines?: boolean;
  sortMode?: "single" | "multiple";
  scrollable?: boolean;
  loading?: boolean;
  desktopOnly?: boolean;
  reorderableColumns?: boolean;
  reorderableRows?: boolean;
  dataKey?: string;
  children?: React.ReactNode;
  headerTemplate?: React.ReactNode;
  selectionMode?: "multiple" | "single";
  scrollHeight?: string;
  onSort?: () => void;
  onRowSelect?: () => void;
  onRowUnselect?: () => void;
  onRowClick?: (data: any) => void;
  onRowReorder?: (data: any) => void;
  selectedData?: any[] | null;
  onSelectionChange?: (e: any) => void;
};

export default function Table(props: TableProps) {
  const {
    data,
    pagination,
    headers,
    stripedRows = false,
    selectable = false,
    hideEmpty = false,
    reorderableColumns = false,
    reorderableRows = false,
    dataKey = "_id",
    scrollHeight = "30rem",
    selectionMode = "multiple",
    selectedData,
    onSort,
    onSelectionChange,
    onRowReorder,
    onRowClick,
    scrollable = true,
    loading = false,
    desktopOnly = false,
    children,
    headerTemplate,
    ...rest
  } = props;

  const bodyTemplate = (data: any, options: ColumnBodyOptions) => {
    return <div>{data[options?.field]}</div>;
  };

  const handleSectionChange = (e: any) => {
    onSelectionChange?.(e.value);
  };

  return (
    <div className="relative overflow-hidden pt-1">
      {/* //// Loading ////// */}
      {loading && (
        <div
          className={`mx-2 rounded-none w-full absolute left-0 top-0 bottom-0 right-0 h-full bg-white/10 dark:bg-accent-800/10 backdrop-blur-[2px] z-10 flex items-center justify-center`}
        >
          <Spinner size={25} />
        </div>
      )}

      <div className={`${desktopOnly ? "hidden md:block" : ""} `}>
        <DataTable
          id="table_style_prime"
          value={data}
          {...rest}
          dataKey={dataKey}
          selection={selectedData ?? []}
          onSelectionChange={handleSectionChange}
          onRowClick={(e) => onRowClick?.(e)}
          stripedRows={stripedRows}
          scrollable={scrollable}
          columnResizeMode="fit"
          scrollHeight={scrollHeight}
          tableStyle={{ minWidth: "50rem" }}
          rowsPerPageOptions={[10, 25, 50, 100]}
          first={pagination?.page}
          rows={pagination?.limit}
          totalRecords={pagination?.totalRecords}
          onPage={pagination?.onPageChange}
          selectionMode={"checkbox"}
          emptyMessage={<Empty />}
          header={headerTemplate}
        >
          {/* //If selectable is enabled// */}
          {selectable && (
            <Column
              selectionMode={selectionMode}
              headerStyle={{ width: "3rem" }}
            ></Column>
          )}

          {headers?.map((col) => (
            <Column
              key={col.field}
              columnKey={col.field}
              field={col.field}
              header={col.title}
              body={col.body || bodyTemplate}
              frozen={col?.frozen}
              style={col?.style}
              alignFrozen={col?.alignFrozen}
            />
          ))}
        </DataTable>
      </div>

      {desktopOnly && <div className="block md:hidden">{children}</div>}
    </div>
  );
}
