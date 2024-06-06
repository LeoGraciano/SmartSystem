import { useEffect, useState } from "react";
import DataGridBasic from "./DataGridBasic";
import APISupply from "../services/api-tanks";
import { useCookies } from "react-cookie";

const columns = [
  { field: "tank", headerName: "Tanque", flex: 1 },
  {
    field: "employee",
    headerName: "Funcionário",
    flex: 1,
  },
  {
    field: "km_currency",
    headerName: "km registrado",
    type: "number",
  },
  {
    field: "liters_used",
    headerName: "Lts. Usados",
    type: "number",
  },
  {
    field: "used_tag",
    headerName: "Tag",
    flex: 1,
    sortable: false,
  },
];

const Rows = [
  {
    id: 1,
    tank: 1,
    employee: "Tanque",
    km_currency: "Jon",
    liters_used: 14,
    used_tag: "Test",
  },
];
export function TableHistoryFuelSupply() {
  const [cookies] = useCookies(["mr-token"]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await APISupply.allFuelSupplies(cookies["mr-token"]);
      const newData = data.map(({ uuid, ...rest }) => ({
        id: uuid,
        ...rest,
      }));
      setRows(newData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {columns && rows ? (
        <>
          <DataGridBasic columns={columns} rows={rows} />
        </>
      ) : null}
    </div>
  );
}
