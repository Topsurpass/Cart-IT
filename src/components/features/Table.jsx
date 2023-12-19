// import { useMemo } from 'react';
import React from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';

const Table = ({ data, columns, onEdit, onDelete }) => {
    //should be memoized or stable
    const tableColumns = React.useMemo(() => columns, [columns]);

    const table = useMaterialReactTable({
        columns: tableColumns,
        data,
        enableColumnFilters: false,
        enableSorting: false,
        initialState: {
            pagination: { pageSize: 5, pageIndex: 0 },
            showGlobalFilter: false,
        },
        mrtTheme: (theme) => ({
            baseBackgroundColor: theme.palette.background.default, //change default background color
        }),
        muiTableProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
                fontWeight: 'bold',
            },
        },
        muiTableBodyCellProps: {
            sx: {
                border: '1px solid rgba(81, 81, 81, .5)',
            },
        },
    });

    return (
        <MaterialReactTable table={table} onEdit={onEdit} onDelete={onDelete} />
    );
};

export default Table;
