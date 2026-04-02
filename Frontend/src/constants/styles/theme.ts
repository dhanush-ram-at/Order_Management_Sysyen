export const COLORS = {
  primary: "#1976d2",
  primaryDark: "#115293",
  secondary: "#9c27b0",
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
  white: "#ffffff",
  background: "#f5f5f5",
  surface: "#ffffff",
  textPrimary: "#212121",
  textSecondary: "#757575",
  border: "#e0e0e0",
  rowHover:  "#f0f7ff",
  tableHeader:"#f5f5f5",
}
 
// Status chip color map — used in DataGrid status column
export const STATUS_COLORS: Record<string, "success" | "warning" | "error" | "default"> = {
  Delivered: "success",
  Pending: "warning",
  Cancelled: "error",
}