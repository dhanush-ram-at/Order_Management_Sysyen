import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material"
import type { OrderFilters } from "./../types/order"

type Props = {
  filters:    OrderFilters
  setFilters: (f: OrderFilters) => void
  onReset:    () => void
}

// Status options — what the user can filter by
const STATUS_OPTIONS = [
  { value: "", label: "All"},
  { value:"Delivered", label: "Delivered" },
  { value:"Pending", label: "Pending" },
  { value:"Cancelled", label: "Cancelled" },
];

// Sort options
const SORT_OPTIONS = [
  { value: "created_at", label: "Created Date" },
  { value: "order_date", label: "Order Date" },
  { value: "total_amount",label: "Total Amount" },
];

function OrderFilter({ filters, setFilters, onReset }: Props) {
  // Update one field in filters, keep rest the same
  // Reset page to 1 whenever any filter changes
  const handleChange = (field: keyof OrderFilters, value: string | number) => {
    setFilters({ ...filters, [field]: value, page: 1 })
  }

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap", alignItems: "center" }}>

      {/* Search by customer name */}
      <TextField
        label="Search customer"
        size="small"
        value={filters.search}
        onChange={(e) => handleChange("search", e.target.value)}
        sx={{ width: 200 }}
      />

      {/* Filter by status */}
      <FormControl size="small" sx={{ width: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sort by field */}
      <FormControl size="small" sx={{ width: 160 }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          label="Sort by"
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
        >
          {SORT_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Reset all filters */}
      <Button variant="outlined" size="small" onClick={onReset}>
        Reset
      </Button>

    </Box>
  );
}

export default OrderFilter;