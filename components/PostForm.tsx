'use client';
import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { toast } from 'sonner';
// import { useRouter }   from 'next/router';

const PostForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');
  // const router = useRouter();

  const handleFormSubmit = async (
    prevState: { error: string; status: string } | undefined,
    formData: FormData
  ) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch: pitch
      };

      await formSchema.parseAsync(formValues);

      // const result = await createIdea(prevState, formData, pitch);

      // if (result.status === 'SUCCESS') {
      //   toast('Your post has been created successfully');
      //   router.push(`/post/${result.id}`);
      // }

      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast('Please check your inputs and try again');
        return { ...prevState, error: 'Validation error', status: 'ERROR' };
      }
    }

    toast('Please check your inputs and try again');
    return {
      ...prevState,
      error: 'An error occurred while submitting the form',
      status: 'ERROR'
    };
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL'
  });

  return (
    <form action={formAction} className="startup-form w-full text-center">
      <div>
        <label htmlFor="title" className="startup-form_label mb-2 text-center">
          Title
        </label>
        <Input
          className="startup-form_input"
          id="title"
          name="title"
          required
          placeholder="Post title"
        />
        {errors.title && (
          <div className="startup-form_error">{errors.title}</div>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="startup-form_label mb-2 text-center"
        >
          Description
        </label>
        <Textarea
          className="startup-form_textarea"
          id="description"
          name="description"
          required
          placeholder="Post description"
        />
        {errors.description && (
          <div className="startup-form_error">{errors.description}</div>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="startup-form_label mb-2 text-center"
        >
          Category
        </label>
        <Input
          className="startup-form_input"
          id="category"
          name="category"
          placeholder="Post category (Typescript, CSS, etc.)"
        />
        {errors.category && (
          <div className="startup-form_error">{errors.category}</div>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label mb-2 text-center">
          Image URL
        </label>
        <Input
          className="startup-form_input"
          id="link"
          name="link"
          placeholder="Post Image URL"
        />
        {errors.link && <div className="startup-form_error">{errors.link}</div>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label mb-2 text-center">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={value => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden', marginTop: 10 }}
          textareaProps={{ placeholder: 'Post pitch' }}
          previewOptions={{ disallowedElements: ['style'] }}
        />
        {errors.link && <div className="startup-form_error">{errors.link}</div>}
      </div>
      <Button
        type="submit"
        className="bg-gray-400 text-base p-6 hover:bg-gray-500 transition-colors cursor-pointer"
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit Your Post!'}{' '}
        <Send className="size-6" />
      </Button>
    </form>
  );
};

export default PostForm;
