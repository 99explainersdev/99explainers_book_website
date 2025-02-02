export type User = {
  id?: string;
  _id?: string;
  email: string;
  password?: string;
  name?: string;
  image?: string;
  role: string; // Add the `role` property
  provider?: string;
};

