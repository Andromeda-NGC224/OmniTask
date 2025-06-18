export interface UpdateUserDto {
  name?: string;
  surname?: string;
  birthday?: string;
  // avatar?: string; // если потом добавится
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  birthday: string | null;
  createdAt: Date;
  updatedAt: Date;
}
