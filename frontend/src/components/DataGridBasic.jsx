import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridBasic(props) {
  const { columns, rows } = props;

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
