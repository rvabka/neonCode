# NeonCode

NeonCode is a full-stack blog application built with Next.js, Sanity.io, and TailwindCSS. It allows users to create and publish blog posts in real time. Future updates will include an approval system for post moderation.

## Features

- 🚀 **Full-stack Blog** – Users can create and publish posts.
- ⚡ **Real-time Updates** – New posts appear instantly without requiring a refresh.
- 🎨 **Modern UI** – Built with TailwindCSS and styled using shadcn components.
- 🖥 **Skeleton Loading** – Smooth user experience with loading placeholders.
- 💾 **Caching & Performance** – Optimized with caching mechanisms.
- 📡 **Sanity.io Backend** – Headless CMS for managing content.
- 🔜 **Post Moderation** – Admin approval system for posts (coming soon).

## Tech Stack

- **Frontend:** Next.js, TailwindCSS, shadcn
- **Backend:** Sanity.io (Headless CMS)
- **Deployment:** Vercel (Recommended)

## Installation

```bash
git clone https://github.com/rvabka/neonCode.git
cd neonCode
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file in the root directory and add your Sanity API credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01
```

## Running the Project

```bash
npm run dev
```
The application will be available at `http://localhost:3000/`.

## Contributing

Feel free to open an issue or submit a pull request if you find a bug or want to suggest improvements!

## License

This project is licensed under the MIT License.

---

🚀 Made with ❤️ by [rvabka](https://github.com/rvabka)

