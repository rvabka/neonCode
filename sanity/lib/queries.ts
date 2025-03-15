import { defineQuery } from 'next-sanity';

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {_id, name, image, bio},
    views,
    description,
    category,
    image
}`
);

export const POST_BY_ID_QUERY = defineQuery(
  `*[_type == "post" && _id == $id][0] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {_id, name, username, image, bio},
    views,
    description,
    category,
    image,
    pitch
}`
);

export const POST_VIEWS_QUERY = defineQuery(
  `*[_type == "post" && _id == $id][0] {
    _id,
    views
  }`
);
