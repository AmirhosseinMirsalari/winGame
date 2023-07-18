import { Dispatch, SetStateAction } from "react";
import {
  Datepicker,
  DatepickerEvent,
} from "@meinefinsternis/react-horizontal-date-picker";
import { faIR } from "date-fns/locale";

interface Props {
  date: any;
  setDate: any;
}

const ShippingDatePicker = ({ date, setDate }: Props) => {
  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate((prev) => ({ ...prev, endValue, startValue, rangeDates }));
  };

  return (
    <>
      <Datepicker
        onChange={handleChange}
        locale={faIR}
        startValue={date.startValue}
        endValue={date.endValue}
      />
    </>
  );
};

export default ShippingDatePicker;
