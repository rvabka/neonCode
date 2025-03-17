'use server';
import { parseServerActionResponse } from '@/lib/utils';
import slugify from 'slugify';
import { auth } from '@/auth';
import { writeClient } from '@/sanity/lib/writeClient';

export const createPitch = async (
  state: unknown,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: 'You must be logged in to create a pitch',
      status: 'ERROR'
    });

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const post = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug
      },
      author: {
        _type: 'reference',
        _ref: session?.id
      },
      pitch
    };

    const result = await writeClient.create({ _type: 'post', ...post });

    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS'
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: 'ERROR'
    });
  }
};
