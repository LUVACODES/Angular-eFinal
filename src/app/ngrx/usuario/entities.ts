export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export const USERS: User[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
];