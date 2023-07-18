import { Box, TextareaAutosize, Typography } from "@mui/material";
interface Props {
  notesRef: any;
}

function OrderNotes({ notesRef }: Props) {
  return (
    <Box>
      <Typography
        sx={{
          color: "common.digitaGrey",
          fontSize: "14px",
          fontWeight: 500,
          mb: "10px",
        }}
      >
        توضیحات (اختیاری)
      </Typography>
      <TextareaAutosize
        ref={notesRef}
        aria-label="order notes textarea"
        placeholder="اگر یادداشتی راجع به سفارش خود دارید، بنویسید"
        style={{
          minWidth: "98%",
          maxWidth: "98%",
          maxHeight: "400px",
          backgroundColor: "#F5F5F5",
          borderColor: "#bbb",
          padding: "5px",
          fontFamily: "iranyekan",
        }}
        minRows={9}
        maxRows={12}
      />
    </Box>
  );
}

export default OrderNotes;
