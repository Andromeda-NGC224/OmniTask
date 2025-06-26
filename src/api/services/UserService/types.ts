export interface UpdateUserDto {
  name?: string;
  surname?: string;
  birthday?: string;
}

export interface Avatar {
  id: number;
  url: string;
  cloudinaryId: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  birthday: string | null;
  avatar: Avatar | null;
  createdAt: string;
  updatedAt: string;
}
