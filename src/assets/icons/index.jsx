import trashIcon from '@/assets/icons/trash.svg'
import trashWhite from '@/assets/icons/trashwhite.svg'
import editIcon from '@/assets/icons/edit.svg'


export const TrashIcon = ({ size = 24, className = '' }) => (
  <img src={trashIcon} alt="trash" width={size} height={size} className={className} />
);
export const TrashIconWhite = ({ size = 24, className = 'text-white' }) => (
  <img src={trashWhite} alt="trash" width={size} height={size} className={className} />
);

export const EditIcon = ({ size = 24, className = '' }) => (
  <img src={editIcon} alt="edit" width={size} height={size} className={className} />
);