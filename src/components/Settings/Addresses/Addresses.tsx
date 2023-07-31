import { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import {
  addressBtn,
  topMenuItem,
  wrapper,
  between,
} from "../../../../styles/user";
import AddLocation from "@mui/icons-material/AddLocation";
import EmptyList from "components/EmptyList/EmptyList";
import { cartModal } from "components/Home/Products/styles";
import { ArrowBack } from "@mui/icons-material";
import { IAddress, IUser } from "types/user";
import Address from "./Address/Address";
import { useUpdateUserMutation } from "redux/user/userApi";
import { AddressForm } from "components/Checkout";
import { setCredentials } from "redux/auth/authSlice";
import { useDispatch } from "react-redux";
import { errorMessage, successMessage } from "utils/toastMessages";
import Link from "next/link";
interface Props {
  user: IUser;
  role: any;
}

function Addresses({ user, role }: Props) {
  const [newAddress, setNewAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<IAddress | null>(null);

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();

  const editAddress = async (address: IAddress) => {
    setNewAddress(true);
    setCurrentAddress(address);
  };

  const deleteAddress = async (id: string) => {
    let addressArr = [...(user?.addresses ?? [])];
    addressArr = addressArr.filter((ads) => ads?._id !== id);
    const newUser = { ...user, addresses: addressArr };

    try {
      const response = await updateUser({
        id: user._id!,
        path: role!,
        user: newUser,
      }).unwrap();
      if (response.code !== 200) {
        throw new Error(response?.message);
      }

      dispatch(
        setCredentials({ user: newUser, role: role!, email: null })
      );
      setCurrentAddress(null);
      successMessage("آدرس با موفقیت حذف شد");
    } catch (err) {
      setCurrentAddress(null);
      errorMessage("حذف آدرس انجام نشد");
      console.log(err);
    }
  };

  const addAddress = async (address: IAddress, mode: string) => {
    let addressArr = [...user?.addresses];
    if (mode === "ویرایش") {
      const index = addressArr.findIndex((ads) => ads?._id === address._id);
      addressArr[index] = address;
    } else {
      addressArr.push(address);
    }

    try {
      await updateUser({
        id: user._id!,
        path: role!,
        user: {
          addresses: addressArr,
        },
      }).unwrap();

      let updatedUser = {
        ...user,
        addresses: addressArr,
      };

      dispatch(
        setCredentials({
          user: updatedUser,
          role: role!,
          email: null,
        })
      );
      successMessage(`آدرس با موفقیت ${mode} شد`);
      setNewAddress(false);
      setCurrentAddress(null);
    } catch (err: any) {
      errorMessage(err?.data.message);
      console.log(err);
    }
  };
  useEffect(() => {
    if (newAddress) {
      setCurrentAddress(null);
    }
  }, [newAddress]);
  console.log(newAddress);
  

  return (
    <Box sx={wrapper}>
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
            آدرس ها
          </Typography>
        </Box>
        <Box sx={topMenuItem} onClick={() => setNewAddress(true)}>
          <Button variant="contained" sx={addressBtn}>
            <AddLocation
              className="addIcon"
              sx={{ margin: "0 0.2rem", color: "common.digitaRed" }}
            />
            ایجاد آدرس جدید
          </Button>
        </Box>
      </Box>

      {/* =================== Addresses ================== */}

      {user?.addresses.length === 0 && (
        <EmptyList
          title={"آدرس"}
          image={
            "https://www.pngitem.com/pimgs/m/267-2677986_red-contact-icon-png-transparent-png.png"
          }
        />
      )}
      {user?.addresses.map((item) => (
        <Address
          key={item?._id}
          address={item}
          editAddress={editAddress}
          deleteAddress={deleteAddress}
        />
      ))}
      <Modal
        open={newAddress}
        onClose={() => setNewAddress(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={cartModal}>
          <AddressForm
            addAddress={addAddress}
            currentAddress={currentAddress}
            buttonText={currentAddress ? "ویرایش" : "ایجاد"}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default Addresses;
