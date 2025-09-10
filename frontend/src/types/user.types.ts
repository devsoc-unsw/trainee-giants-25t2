export interface User {
  userId: string;
  email: string;
  name: string;
}

export interface UserPlace {
  userId: string,
  likes: string[],
  dislikes: string[],
};