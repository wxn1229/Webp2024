import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";

const columns = [
  { field: "title", headerName: "名稱", width: 200 },
  { field: "location", headerName: "地點", width: 200 },
  { field: "price", headerName: "票價", width: 120 },
];

function App() {
  const [rows, setRows] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(5);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    fetch(
      "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
    )
      .then((response) => response.json())
      .then((data) => {
        const newRows = data.map((item, index) => ({
          id: index,
          title: item.title,
          location: item.showInfo[0].location,
          price: item.showInfo[0].price,
        }));
        setRows(newRows);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const filteredRows = rows.filter((row) => {
    return row.title.toLowerCase().includes(searchText);
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <TextField
        value={searchText}
        onChange={handleSearch}
        placeholder="請輸入關鍵字"
        variant="outlined"
        fullWidth
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[25, 50, 100]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}

export default App;
