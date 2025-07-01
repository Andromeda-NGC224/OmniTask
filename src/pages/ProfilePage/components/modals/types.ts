import type { User } from 'api/services/UserService';

export interface EditProfileFormValues {
  avatar?: File | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  birthday?: string;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}
