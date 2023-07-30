import { useState, SyntheticEvent } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { TabPanel, a11yProps } from "./Components/TabPanel/TabPanel";
import EmptyOrder from "./Components/EmptyOrder/EmptyOrder";
import OrderItem from "./Components/OrderItem/OrderItem";
import { ArrowBack } from "@mui/icons-material";
import { useGetUserOrdersQuery } from "redux/orders/ordersApi";
import { useAppSelector } from "redux/store";
import PanelLoading from "components/Loading/PanelLoading";
import { ErrorText } from "../../../styles/panel";
import { between, wrapper } from "../../../styles/user";
import Link from "next/link";
import Head from "next/head";

const statuses = ["pending", "delivered", "cancelled"];

const UserOrders = () => {
  const { user,role } = useAppSelector((state: any) => state.reducer.auth);
  const [value, setValue] = useState(0);

  const { data, isLoading, isError } = useGetUserOrdersQuery({
    path: role,
    id: user?._id,
  });
  const orders = data?.data ?? [];
  console.log(isError);

  const filteredOrders = orders.filter(
    (order: any) => order.status === statuses[value]
  );

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={wrapper}>
      <Head>
        <title>وین گیم | سفارش های من </title>
      </Head>
      <Box sx={between}>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Link href="/user">
            <Box
              sx={{
                display: { md: "none" },
                textDecoration: "none",
                color: "common.digitaBlack",
              }}
            >
              <ArrowBack />
            </Box>
          </Link>

          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            تاریخچه سفارشات
          </Typography>
        </Box>
        <Box>
          <Search />
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ width: "100%", marginTop: "2.5rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="در حال آماده سازی" {...a11yProps(0)} />
            <Tab label="تحویل داده شده" {...a11yProps(1)} />
            <Tab label="لغو شده " {...a11yProps(2)} />
          </Tabs>
        </Box>
        {statuses.map((item, index) => (
          <TabPanel key={index} value={value} index={index}>
            {isLoading && <PanelLoading />}
            {filteredOrders.length === 0 && !isLoading && <EmptyOrder />}
            {isError && <ErrorText>ERROR:Could not retrieve data!</ErrorText>}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {filteredOrders.map(({ _id, status, date, products }: any) => (
                <OrderItem
                  id={_id!}
                  date={date}
                  status={status}
                  products={products}
                />
              ))}
            </Box>
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default UserOrders;
