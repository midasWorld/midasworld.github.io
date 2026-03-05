export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  parentCategory: string;
  category: string;
}

export interface Post extends PostMeta {
  content: string;
}
