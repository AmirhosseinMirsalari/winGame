import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';

interface SidebarOption {
  id: number;
  title: string;
  route: string;
  icon: typeof DashboardIcon | typeof LocalGroceryStoreIcon | typeof PersonIcon | typeof FavoriteIcon | typeof HomeIcon;
}

export const userSidebarOptions: SidebarOption[] = [
  { id: 1, title: "وضعیت", route: "/user/status", icon: DashboardIcon },
  { id: 2, title: "سفارش من", route: "/user/orders", icon: LocalGroceryStoreIcon },
  { id: 3, title: "اطلاعات شخصی", route: "/user/personal-info", icon: PersonIcon },
  { id: 4, title: "علاقه مندی ها", route: "/user/wishlist", icon: FavoriteIcon },
  { id: 5, title: "آدرس من", route: "/user/addresses", icon: HomeIcon },
];