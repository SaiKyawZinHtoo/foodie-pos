import ItemCard from "@/components/ItemCard";
import NewTable from "@/components/NewTable";
import { useAppSelector } from "@/store/hooks";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const TablePages = () => {
  const [open, setOpen] = useState(false);
  const tables = useAppSelector((state) => state.table.item);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, mr: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New Table
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((item) => (
          <ItemCard
            key={item.id}
            href={`/backoffice/tables/${item.id}`}
            icon={<TableBarIcon />}
            title={item.name}
          />
        ))}
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default TablePages;
