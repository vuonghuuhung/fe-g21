import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from '@material-tailwind/react';
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  BackwardIcon,
} from '@heroicons/react/24/solid';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/apis/auth';
import { useEffect } from 'react';
import { analysis } from '../../services/apis/authOrders';
import { ArchiveBoxIcon, ChartBarIcon, ChatBubbleBottomCenterIcon, ClipboardDocumentCheckIcon, FolderOpenIcon, UsersIcon } from '@heroicons/react/24/solid';

export default function Sidebar({ setIsLogin, setIsAdmin }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    setIsLogin(false);
    setIsAdmin(false);
    navigate('/');
  };
  return (
    <div className="w-full h-full bg-gray-50 ">
      <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <div className="basis-1/4">
            <Link to="/">
              <img
                className="max-w-[250px]"
                src="https://cdn.shopify.com/s/files/1/0001/5211/files/pk-logotype-dark.png?v=1674686921&width=500"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <List>
          <ListItem onClick={() => navigate('/admin')}>
            <ListItemPrefix>
              <ChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem onClick={() => navigate('categories')}>
            <ListItemPrefix>
              <FolderOpenIcon className="h-5 w-5" />
            </ListItemPrefix>
            Categories
          </ListItem>
          <ListItem onClick={() => navigate('products')}>
            <ListItemPrefix>
              <ArchiveBoxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Products
          </ListItem>
          <ListItem onClick={() => navigate('users')}>
            <ListItemPrefix>
              <UsersIcon className="h-5 w-5" />
            </ListItemPrefix>
            Users
          </ListItem>
          <ListItem onClick={() => navigate('chat')}>
            <ListItemPrefix>
              <ChatBubbleBottomCenterIcon className="h-5 w-5" />
            </ListItemPrefix>
            Chat with user
          </ListItem>
          <ListItem onClick={() => navigate('orders')}>
            <ListItemPrefix>
              <ClipboardDocumentCheckIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <BackwardIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
    </div>
  );
}
