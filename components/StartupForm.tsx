'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  return (
    <form action={() => {}} className="startup-form w-full text-center">
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
        <label htmlFor="category" className="startup-form_label mb-2 text-center">
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
        {errors.link && (
          <div className="startup-form_error">{errors.link}</div>
        )}
      </div>
    </form>
  );
};

export default StartupForm;
