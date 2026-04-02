import { Box, TextField, Paper } from "@mui/material"
import AppSelect from "../common/AppSelect"
import AppButton from "../common/AppButton"
import type { OrderFilters } from "../../types/order"
import { filterStyles } from "../../constants/styles/filterStyles"

type Props = {
  filters:    OrderFilters
  setFilters: (f: OrderFilters) => void
  onReset:    () => void
}

const STATUS_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "Pending", label: "Pending"      },
  { value: "Delivered", label: "Delivered"    },
  { value: "Cancelled", label: "Cancelled"    },
]

const SORT_OPTIONS = [
  { value: "order_date", label: "Order Date"   },
  { value: "created_at", label: "Created Date" },
  { value: "total_amount", label: "Total Amount" },
]

function OrderFilters({ filters, setFilters, onReset }: Props) {
  const handleChange = (field: keyof OrderFilters, value: string | number) => {
    setFilters({ ...filters, [field]: value, page: 1 })
  }

  return (
    <Paper variant="outlined" sx={filterStyles.filterPaper}>
      <Box sx={filterStyles.filterRow}>

        <TextField
          label="Search by customer name"
          size="small"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          sx={filterStyles.searchField}
        />

        <AppSelect
          label="Status"
          value={filters.status}
          onChange={(val) => handleChange("status", val)}
          options={STATUS_OPTIONS}
          size="small"
          width={160}
        />

        <AppSelect
          label="Sort By"
          value={filters.sort}
          onChange={(val) => handleChange("sort", val)}
          options={SORT_OPTIONS}
          size="small"
          width={160}
        />

        <AppButton variant="outlined" size="small" onClick={onReset} sx={filterStyles.resetButton}>
          Reset
        </AppButton>

      </Box>
    </Paper>
  )
}

export default OrderFilters