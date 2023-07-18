import { Dispatch, SetStateAction } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { Box, RadioGroup } from "@mui/material";
import { accordionDetailStyles, CustomRadio, paymentTitleStyles } from "../styles";

interface Props {
  setSelectedPaymentMethod: Dispatch<SetStateAction<string>>;
  selectedPaymentMethod: string;
}
function PaymentMethod({ setSelectedPaymentMethod, selectedPaymentMethod }: Props) {
  const accordionHandler = (panel: string) => () => {
    setSelectedPaymentMethod(panel);
  };

  return (
    <Box sx={{ backgroundColor: "common.digitaGrey7", paddingY: "20px" }}>
      <Accordion
        sx={{ backgroundColor: "common.digitaGrey7" }}
        expanded={selectedPaymentMethod === "cash"}
        onChange={accordionHandler("cash")}
      >
        <AccordionSummary
          expandIcon={
            <RadioGroup value={selectedPaymentMethod}>
              <CustomRadio value={"cash"} />
            </RadioGroup>
          }
          sx={{ flexDirection: "row-reverse" }}
        >
          <Typography sx={paymentTitleStyles}>پرداخت موقع تحویل</Typography>
        </AccordionSummary>
        <AccordionDetails sx={accordionDetailStyles}>
          <Typography component={"span"}>هزینه محصول را در محل پرداخت کنید</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          backgroundColor: "common.digitaGrey7",
          "&.MuiAccordion-root:before": {
            display: "none",
          },
        }}
        expanded={selectedPaymentMethod === "paypal"}
        onChange={accordionHandler("paypal")}
      >
        <AccordionSummary
          expandIcon={
            <RadioGroup value={selectedPaymentMethod}>
              <CustomRadio value={"paypal"} />
            </RadioGroup>
          }
          sx={{
            flexDirection: "row-reverse",
            img: { width: "20%" },
            alignItems: "center",
            "& .MuiAccordionSummary-content": {
              justifyContent: "space-between",
              alignItems: "center",
            },
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography sx={paymentTitleStyles}>پرداخت آنلاین</Typography>
          </Box>
          <img
            src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665232991/digita-images/static/waieqstsncidftw2weqb.png"
            alt="paypal"
          />
        </AccordionSummary>
        <AccordionDetails sx={accordionDetailStyles}>
          <Typography component={"span"}>
            با تمامی کارت های عضو شبکه شتاب می تونید صورت حساب خود را پرداخت کنید
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default PaymentMethod;
