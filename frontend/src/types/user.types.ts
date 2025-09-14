export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface UserPlace {
  user: User,
  likes: string[],
  dislikes: string[],
};