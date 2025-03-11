import { defineQuery } from 'next-sanity';

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {_id, name, image, bio},
    view,
    description,
    category,
    image
}`
);
