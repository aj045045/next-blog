# 🚀 Next.js Blog App

A modern blog application built with Next.js, allowing users to create and manage blog posts while providing admins with insightful analytics and management tools.

[Linktree](https://linktr.ee/Yadav_Ansh)

## Table of Contents

1. [Project Overview](#project-overview)
2. [Getting Started](#getting-started)
3. [Environment Variables](#environment-variables)
4. [Technology Stack](#technology-stack)
5. [Database schema](#database-schema)
6. [Folder Structure](#folder-structure)
7. [File Formats](#file-formats)
8. [Page Routes](#page-routes)
9. [API Endpoints](#api-endpoints)
10. [Component Libraries](#component-libraries)

---

## Project Overview

This Next.js blog application enables users to write, publish, and manage their blog posts through a user-friendly interface. Admins have access to a dedicated dashboard for viewing blog analytics, managing content, and overseeing user activity. The app leverages modern web technologies for performance, scalability, and a seamless user experience.

---

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd next-post
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (see [Environment Variables](#environment-variables)).

4. **Run the development server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000` (or the port specified in `.env`).

5. **Run the email server (Optional)**:

   ```
   npm run email
   ```

   The email development app will be available at port `http://localhost:3000` (or the port specified in `.env`).

6. **Run the prisma studio to view tables**:

   ```
   npx prisma studio
   ```

   This will run a prisma studio in table view format

---

## Environment Variables

The `.env` file is used to configure environment-specific settings.

### Required Environment Variables

- `DATABASE_URL`: Connection string for your Prisma ORM to access your database.
- `SECRET_KEY`: Used for custom encryption, session signing, JWT encryption, or password reset tokens (by running `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`).
- `PORT`: The port on which the Next.js server will run (default: 3000).
- `NEXTAUTH_URL`: Tells NextAuth what the base URL of your app.
- `NEXTAUTH_SECRET`: Secret used to encrypt session tokens, JWTs, and cookies (by running `openssl rand -base64 32`).
- `EMAIL_USER`: Email address or username used to authenticate with the SMTP server.
- `EMAIL_PASS`: Password or app-specific password for the SMTP server (Gmail).
- `EMAIL_FROM`: The name and email address displayed in outgoing emails
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` : Your Cloudinary cloud name (to access keys visit [Tutorial](https://www.koladechris.com/blog/how-to-integrate-cloudinary-with-your-nextjs-project/)).
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`: Your api keys
- `NEXT_PUBLIC_CLOUDINARY_API_SECRET`: Your api secret
- `NEXT_PUBLIC_CLOUDINARY_PRESET_NAME` : This will be unsigned name

### Example `.env`

```bash
# === Basic Application Config ===
DATABASE_URL="file:./dev.db"
SECRET_KEY=your_secret_key
PORT=3000

# === NextAuth Configuration ===
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_auth_secret

# === Nodemailer (Email) ===
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
EMAIL_FROM="Your name <your_email@gmail.com>"

# === Cloudinary (Media Storage) ===
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_present_name
```

---

## Technology Stack

The project is built with the following technologies:

1. **[Next.js](https://nextjs.org/)**: React framework for server-side rendering and static site generation.
   - `npx create-next-app@latest .`
2. **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
   - `npm install lucide-react`
   - `npm install tailwindcss-animate`
3. **[Prisma SQLite](https://www.prisma.io/docs/orm/overview/databases/sqlite)**: ORM for database management

   - `npm install prisma --save-dev`
   - `npx prisma init --datasource-provider sqlite`
   - `npx prisma migrate dev --name init`

4. **[Shadcn/ui](https://ui.shadcn.com/)**: Accessible and customizable UI components.
   - `npx shadcn@latest init`
   - `use --legacy-peer-deps`
5. **[NextAdmin](https://next-admin-docs.vercel.app/)**: Admin panel for managing blog content and users.
   - `npx @premieroctet/next-admin-cli@latest init`
6. **[React email](https://react.email/)**: The next generation of writing emails
   - `npm install react-email -D -E`
   - `npm install @react-email/components -E`
   - `npm i nodemailer`
   - `npm i --save-dev @types/nodemailer`
7. **[NextAuth](https://next-auth.js.org/)**: Authentication library for secure user login.
   - `npm install next-auth`
   - `npm install bcryptjs`
8. **[NextCrud](https://next-crud.js.org/)**: Simplifies CRUD operations for API routes.
   - `npm install -S @premieroctet/next-crud --legacy-peer-deps`
   - `npm install @prisma/client@5.22.0 prisma@5.22.0`
9. **[SWR](https://swr.vercel.app/)**: React hooks for data fetching.
   - `npm i swr --legacy-peer-deps`
10. **[Next Cloudinary](https://next.cloudinary.dev/)** : Cloudinary is a cloud service that manages images and videos

    - `npm install next-cloudinary --legacy-peer-deps`

11. **[React Hook Form](https://www.react-hook-form.com/)**: Form handling and validation.

    - `npm install react-hook-form`

12. **[Zod](https://zod.dev/)**: Schema validation for forms and API payloads.

    - `npm install zod @hookform/resolvers`

13. **[Zustand](https://zustand-demo.pmnd.rs/)**: Lightweight state management.
14. **[Novel](https://novel.sh/docs/introduction)** : The novel is a headless Notion-style WYSIWYG editor
15. **[Nuqs](https://nuqs.47ng.com/)**: Type-safe search params state manager for React

---

## Database Schema

### ER Diagram

<div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
    <img src="./public/prisma.svg" alt="ERD Diagram" style="display: block; margin-left: auto; margin-right: auto;">
</div>

### Admin table

| Field     | Type     | Attributes                     |
| --------- | -------- | ------------------------------ |
| id        | Int      | @id, @default(autoincrement()) |
| name      | String   |                                |
| username  | String   | @unique                        |
| password  | String   |                                |
| email     | String   | @unique                        |
| createdAt | DateTime | @default(now())                |
| updatedAt | DateTime | @updatedAt                     |

### User table

| Field     | Type       | Attributes                     |
| --------- | ---------- | ------------------------------ |
| id        | Int        | @id, @default(autoincrement()) |
| name      | String     |                                |
| username  | String     | @unique                        |
| password  | String     |                                |
| email     | String     | @unique                        |
| bio       | String?    | Optional                       |
| image     | String?    | Optional (Profile Picture URL) |
| posts     | Post[]     | Relation (One-to-Many)         |
| comments  | Comment[]  | Relation (One-to-Many)         |
| reactions | Reaction[] | Relation (One-to-Many)         |
| createdAt | DateTime   | @default(now())                |
| updatedAt | DateTime   | @updatedAt                     |

### Post table

| Field     | Type        | Attributes                            |
| --------- | ----------- | ------------------------------------- |
| id        | Int         | @id, @default(autoincrement())        |
| title     | String      |                                       |
| content   | String      |                                       |
| slug      | String      | @unique (SEO-friendly URL)            |
| authorId  | Int         | Foreign Key (User)                    |
| author    | User        | Relation (Many-to-One)                |
| imageId   | Int         | Foreign Key (User)                    |
| image     | Image       | Relation (Many-to-One)                |
| tags      | TagOnPost[] | Relation (Many-to-Many via TagOnPost) |
| comments  | Comment[]   | Relation (One-to-Many)                |
| reactions | Reaction[]  | Relation (One-to-Many)                |
| createdAt | DateTime    | @default(now())                       |
| updatedAt | DateTime    | @updatedAt                            |

### Comment table

| Field     | Type     | Attributes                     |
| --------- | -------- | ------------------------------ |
| id        | Int      | @id, @default(autoincrement()) |
| content   | String   |                                |
| authorId  | Int      | Foreign Key (User)             |
| postId    | Int      | Foreign Key (Post)             |
| author    | User     | Relation (Many-to-One)         |
| post      | Post     | Relation (Many-to-One)         |
| createdAt | DateTime | @default(now())                |
| updatedAt | DateTime | @updatedAt                     |

### Reaction table

| Field     | Type     | Attributes                     |
| --------- | -------- | ------------------------------ |
| id        | Int      | @id, @default(autoincrement()) |
| userId    | Int      | Foreign Key (User)             |
| postId    | Int      | Foreign Key (Post)             |
| type      | Boolean  | True = LIKE, False = DISLIKE   |
| user      | User     | Relation (Many-to-One)         |
| post      | Post     | Relation (Many-to-One)         |
| createdAt | DateTime | @default(now())                |

### Tag table

| Field | Type        | Attributes                        |
| ----- | ----------- | --------------------------------- |
| id    | Int         | @id, @default(autoincrement())    |
| name  | String      | @unique                           |
| posts | TagOnPost[] | Relation (Many-to-Many with Post) |

### Tag on post table

| Field  | Type                                 | Attributes             |
| ------ | ------------------------------------ | ---------------------- |
| postId | Int                                  | Foreign Key (Post)     |
| tagId  | Int                                  | Foreign Key (Tag)      |
| post   | Post                                 | Relation (Many-to-One) |
| tag    | Tag                                  | Relation (Many-to-One) |
|        | @@id([postId, tagId]) (Composite PK) |                        |

### Image table

| Field     | Type     | Attributes                        |
| --------- | -------- | --------------------------------- |
| id        | Int      | @id,@default(autoincrement())     |
| imageId   | String   | The public id of cloudinary image |
| altText   | String?  |                                   |
| createdAt | DateTime | @default(now())                   |
| posts     | Post     | Relation (Many-to-One)            |

### Bookmark table

| Field  | Type | Attributes             |
| ------ | ---- | ---------------------- |
| userId | Int  | Foreign key            |
| postId | Int  | Foreign key            |
| post   | Post | Relation (Many-to-One) |
| user   | User | Relation (Many-to-One) |

---

## Folder Structure

The project follows a clean and modular folder structure:

```
.
├── app/        # Project root
│   ├── api/    # API endpoint
│   │   ├── admin/
│   │   │   └── [[...nextadmin]] # Next admin configuration
│   │   ├── crud/
│   │   │   └── [...nextcrud]    # Next crud configuration
│   │   └── auth/
│   │       └── [...nextauth]    # Next auth configuration
│   ├── (user)  # Contain project route
│       └── u   # User route
│   └── admin   # Admin route
├── components/ # The components to be store
│   ├── ui      # The shadcn components
│   └── custom  # The custom components
├── constant    # Reusable codes
├── emails       # Email components
├── font        # Font components
├── interface   # Interface storage
├── lib         # Reusable library configuration
├── prisma      # The prisma setting
├── public      # The assets folder
├── store      # The zustand config for state management
└── types       # The package configuration

```

---

## File Formats

Key file structure to keep in find while creating the project:

### Default structure

```
.
├── app/
│   ├── config.tsx    # Root project configuration.
│   ├── error.tsx     # Render UI when an error occur in the system.
│   ├── layout.ts     # The layout page for configuring the root system layout.
│   ├── loading.tsx   # Renders a loading UI for every page or route.
│   ├── manifest.ts   # Contains the project manifest data.
│   ├── not-found.tsx # Change the default Not found page in the system.
│   ├── page.tsx      # The root `/` page component.
│   ├── robots.ts     # The robots configuration for crawlers.
│   └── sitemap.ts    # The sitemap configuration for web app.
└── constant/
    ├── assets.ts # Reuseable assets (eg. video, audio and image) link storage.
    └── links.ts  # Reuseable page and external link storage.
```

### File structure

```
.
├── api.ts     # Contains method for data fetching (eg. async, await method used).
├── form.tsx   # Form creation and handling,
├── page.tsx   # The route UI for handling the system
├── layout.tsx # The layout route for project rendering
└── table.tsx  # The table data for display table format
```

---

## Page Routes

The app uses Next.js file-based routing. Key routes include:

- `/`: Homepage with featured blogs and navigation.
- `/login`: Login page
- `/register`: Register page
- `/tag`: The tag search
- `/tag/[tag]`: List of post on tags
- `/admin`: Admin-only route for managing the app.
  - `/dashboard`: Admin dashboard with analytics.
- `/u`: User logged-in route.
  - `/profile`: User profile page for managing account details and posts.
  - `/posts`: The post summary dashboard.
  - `/posts/[slug]`: Edit an existing article or create one.
  - `/comments`: The comments on post.

---

## API Endpoints

API routes are defined in the `/api` directory for server-side functionality:

- **GET**`/api/users`: Retrieves a list of registered users (admin-only).

---

## Component Libraries

The app uses multiple for modular, customizable UI components.

### Shadcn/ui `components/ui`:

- **Button**: Reusable button component with various styles (primary, secondary, etc.).
- **Pagination**: Component for navigating through paginated blog post lists.
- **Card**: Container for blog post previews and admin dashboard widgets.
- **Input**: Form input fields integrated with React Hook Form.
- **Dialog**: Modal dialogs for confirmations and forms.
