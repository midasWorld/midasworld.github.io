export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface Post extends PostMeta {
  content: string;
}
