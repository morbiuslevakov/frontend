// import PersonIcon from '@mui/icons-material/Person';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HelpIcon from '@mui/icons-material/Help';
// import MessageIcon from '@mui/icons-material/Message';
// import LogoutIcon from '@mui/icons-material/Logout';
import { ReactComponent as TradeIcon } from '../../images/menu/trade.svg'
import { ReactComponent as WalletIcon } from '../../images/menu/wallet.svg'
import { ReactComponent as UserIcon } from '../../images/menu/profile.svg'
import { ReactComponent as FaqIcon } from '../../images/menu/faq.svg'
import { ReactComponent as ExitIcon } from '../../images/menu/exit.svg'


export const headerMenu = [
  { text: "Торговля", icon: <TradeIcon />, path: "/p2p" },
  { text: "Кошелек", icon: <WalletIcon />, path: "/wallet" },
  { text: "Профиль", icon: <UserIcon />, path: "/profile" },
  { text: "FAQ", icon: <FaqIcon />, path: "/faq" },
]

export const headerAccountMenuItems = [
  // { icon: <PersonIcon color='lightGray' />, text: "Профиль", path: '/profile' },
  // { icon: <NotificationsIcon color='lightGray' />, text: "Новости", path: '/news' },
  // { icon: <PeopleAltIcon color='lightGray' />, text: "Реферальная программа", path: '/ref' },
  // { icon: <SettingsIcon color='lightGray' />, text: "Настройки", path: '/settings' },
  // { icon: <HelpIcon color='lightGray' />, text: "FAQ", path: '/faq' },
  // { icon: <MessageIcon color='lightGray' />, text: "Центр поддержки", path: '/support' },
  { icon: <ExitIcon />, text: "Выход", path: 'logout' },
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