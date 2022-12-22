interface DefaultProps {
  value?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

interface PopupProps {
  title?: string;
  content?: string;
  children?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

interface Header {
  title: string;
  activeButton?: string;
  className?: string;
}

interface CardInfo {
  id: number;
  isShare: boolean;
  title: string;
  subCategory: string;
  likes: number;
  memberId: number;
  nickname: string;
  image: string;
  ranks: string;
  takenTalents: string[];
  hideTakenTalents?: boolean;
}

interface MainCategoryInfo {
  id: number;
  name: string;
  image: string;
}

interface LinkInfo {
  id: number;
  content: string;
}

interface PostInfo {
  id: number;
  title: string;
  content: string;
  isShare: false;
  subCategory: string;
  links: LinkInfo[];
  chatLink: string;
  likes: number;
  takenContent: string;
  takenTalents: string[];
  exchangeType: string; // ONLINE | ... type 뭐뭐있는지 알아야됨
  exchangePeriod: string; // A_WEEK | ... type 뭐뭐있는지 알아야됨
  exchangeTime: string; // NOON | ... type 뭐뭐있는지 알아야됨
  memberId: number;
  nickname: string;
  image: string;
  ranks: string;
  isLike: false;
}
interface CategoryProps {
  id: number;
  name: string;
}
