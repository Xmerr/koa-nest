export interface User {
  id: string;
  firstName: string;
  lastName: string;
};

export type UnsavedUser = Omit<User, 'id'>;