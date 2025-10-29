import facebookIcon from '@/assets/icons/facebook.svg';
import instagramIcon from '@/assets/icons/instagram.svg';
import tiktokIcon from '@/assets/icons/tiktok.svg';
import whatsappIcon from '@/assets/icons/whatsApp.svg';
import xIcon from '@/assets/icons/x.svg';
import linkIcon from '@/assets/icons/link.svg';
import addIcon from '@/assets/icons/add.svg';
import minusIcon from '@/assets/icons/minus.svg';
import cartIcon from '@/assets/icons/cart.svg';
import boxIcon from '@/assets/icons/box.svg';
import truckIcon from '@/assets/icons/truck.svg';
import verifyIcon from '@/assets/icons/verify.svg';
import trashIcon from '@/assets/icons/trash.svg'


export const TrashIcon = ({ size = 24, className = '' }) => (
  <img src={trashIcon} alt="trash" width={size} height={size} className={className} />
);


export const VerifyIcon = ({ size = 24, className = '' }) => (
  <img src={verifyIcon} alt="Verify" width={size} height={size} className={className} />
);

export const TruckIcon = ({ size = 24, className = '' }) => (
  <img src={truckIcon} alt="Truck" width={size} height={size} className={className} />
);

export const BoxIcon = ({ size = 24, className = '' }) => (
  <img src={boxIcon} alt="Box" width={size} height={size} className={className} />
);

export const CartIcon = ({ size = 24, className = '' }) => (
  <img src={cartIcon} alt="Cart" width={size} height={size} className={className} />
);

export const MinusIcon = ({ size = 24, className = '' }) => (
  <img src={minusIcon} alt="Minus" width={size} height={size} className={className} />
);

export const AddIcon = ({ size = 32, className = '' }) => (
  <img src={addIcon} alt="Add" width={size} height={size} className={className} />
);

export const LinkIcon = ({ size = 24, className = '' }) => (
  <img src={linkIcon} alt="Link" width={size} height={size} className={className} />
);

export const FacebookIcon = ({ size = 24, className = '' }) => (
  <img src={facebookIcon} alt="Facebook" width={size} height={size} className={className} />
);

export const InstagramIcon = ({ size = 24, className = '' }) => (
  <img src={instagramIcon} alt="Instagram" width={size} height={size} className={className} />
);

export const TikTokIcon = ({ size = 24, className = '' }) => (
  <img src={tiktokIcon} alt="TikTok" width={size} height={size} className={className} />
);

export const WhatsAppIcon = ({ size = 24, className = '' }) => (
  <img src={whatsappIcon} alt="WhatsApp" width={size} height={size} className={className} />
);

export const XIcon = ({ size = 24, className = '' }) => (
  <img src={xIcon} alt="X" width={size} height={size} className={className} />
);