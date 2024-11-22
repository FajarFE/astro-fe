export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  slug: string;
  username: string;
  backgroud: string;
  avatar: string;
  bio: string;
  website: string;
  socials: string[];
  location: string;
  timezone: string;
  language: string;
  currency: string;
  phone: string;
  cv: string;
  role: string;
  backup_email: string;
  created_at: string;
  updated_at: string;
};

export type Auth = {
  token: string;
  token_type: string;
};

export type ResponseData = {
  user: User;
  auth: Auth;
};

export type Response = {
  message: string;
  success: boolean;
  data: ResponseData;
};
