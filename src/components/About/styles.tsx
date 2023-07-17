export const posterStyle = {
  height: 500,
  width: "100%",
  maxHeight: { xs: 200, sm: 300, md: 400, lg: 600 },
  maxWidth: { xs: "100%", md: "100%" },
  backgroundSize: "cover",
  objectFit: "cover",
};

/* ================ Contents ============== */
export const subjectWrapper = {
  display: "flex",
  justifyContent: { sx: "center", lg: "right" },
  position: "relative",
  zIndex: "100",
  marginTop: { lg: "-120px" },
  marginRight: { lg: "-2px" },
};
export const subjectTitle = {
  fontSize: { xs: "22px", sm: "24px", md: "30px" },
  textAlign: "right",
  fontWeight: "600",
  color: "#333",
  marginTop: "1rem ",
  marginBottom: {md:"4rem"},
  marginLeft: { lg: "150px", xl: "19%" },
};

export const contentStyle = {
  textAlign: "justify",
  width: { sm: "100%", md: "100%", lg: "90%" },
};

export const titleStyle = {
  padding: "1rem 0",
  fontWeight: "600",
  color: "#333",
  fontSize: { sm: "19px", md: "23px" },
  lineHeight: 2,
};
/* ================ Contents ============== */

/* ================ Services ================= */

export const serviceStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 1,
  color: "text.secondary",
  "& svg": {
    my: 1.5,
  },
};
export const serviceTitle = {
  color: "#333",
  fontSize: { xs: "26px", sm: "32px" },
  fontWeight: "600",
  marginBottom: "20px",
};

export const itemStyle = {
  padding: "1rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
/* ================ Services ================= */