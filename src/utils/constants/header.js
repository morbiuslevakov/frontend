import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';

export const headerAccountMenuItems = [
  { icon: <PersonIcon color='lightGray' />, text: "Профиль", path: '/profile' },
  { icon: <NotificationsIcon color='lightGray' />, text: "Новости", path: '/news' },
  { icon: <PeopleAltIcon color='lightGray' />, text: "Реферальная программа", path: '/ref' },
  { icon: <SettingsIcon color='lightGray' />, text: "Настройки", path: '/settings' },
  { icon: <HelpIcon color='lightGray' />, text: "FAQ", path: '/faq' },
  { icon: <MessageIcon color='lightGray' />, text: "Центр поддержки", path: '/support' },
  { icon: <LogoutIcon color='lightGray' />, text: "Выход", path: 'logout' },
]

export const headerMenuSlotProps = {
  paper: {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      background: "#2D2E2F",
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
        background: "#2D2E2F",
      },
    },
  }
}