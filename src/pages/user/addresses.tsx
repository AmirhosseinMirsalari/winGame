import Addresses from "components/Settings/Addresses/Addresses";
import UserLayout from "layouts/UserLayout/UserLayout";
import { useAppSelector } from "redux/store";

function AddressesPage() {
  const { user, role } = useAppSelector((state) => state.reducer.auth);

  return (
    <UserLayout>
      <Addresses user={user!} role={role!} />
    </UserLayout>
  );
}

export default AddressesPage;
