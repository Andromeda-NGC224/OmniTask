import type { Avatar } from 'api/services/UserService';

export interface UserAvatarProps {
  avatar: Avatar | null;
  user?: {
    name?: string;
  };
}
