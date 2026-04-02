import { COLORS } from "./theme"
 
export const orderCreateStyles = {
  pageWrapper: {
    background: COLORS.background,
    minHeight: "calc(100vh - 64px)",
    p: 3,
  },
  formCard: {
    p: 3,
    maxWidth: 600,
    borderRadius: 2,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  formTitle: {
    fontWeight: 700,
    color: COLORS.primary,
    mb: 1,
  },
  sectionLabel: {
    mt: 2,
    fontWeight: 500,
  },
  buttonRow: {
    display: "flex",
    gap: 2,
    mt: 3,
  },
}