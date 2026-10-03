# Vivek Singh – Video Editor & Motion Graphics Designer Portfolio

Personal portfolio website for **Vivek Singh**, showcasing cinematic video editing, YouTube projects, Instagram Reels, and client reviews. Built with Next.js 15, TypeScript, Tailwind CSS, Supabase, shadcn/ui, and Framer Motion.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & Auth**: [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) & Radix UI
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & Lenis Smooth Scroll
- **Contact / Messaging**: WhatsApp Direct (`wa.me`) & Direct Gmail
- **Package Manager**: [pnpm](https://pnpm.io/)

---

## 🛠️ Getting Started (Local Development)

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables Setup

Ensure you have a `.env.local` file in the root directory (refer to `.env.example`):

```env
CONTACT_TO_EMAIL=creativeorbitinfo@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=9935896755

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_anon_key_here
```

> **Security Note:** Keys are read strictly from environment variables. Only the public Supabase URL and Publishable Anon key are used in the application. Row Level Security (RLS) protects tables and storage.

### 3. How to Run `seed.sql`

To populate the database with all existing YouTube videos and Instagram reels:

1. Open your [Supabase Dashboard](https://supabase.com/dashboard).
2. Go to the **SQL Editor** tab on the left sidebar.
3. Open [`supabase/seed.sql`](supabase/seed.sql) in this repository and copy its contents.
4. Paste the SQL query into the Supabase SQL Editor and click **Run**.
5. Once completed, your `projects` table will have all 6 YouTube videos and 5 Instagram reels ready and visible on the website.

> **Note:** Run `supabase/seed.sql` once only.

### 4. Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 How to Use the Admin Panel

The portfolio includes a private, unindexed Admin Dashboard for managing video projects and client review screenshots.

### Accessing the Dashboard

- **Login URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Admin Email:** `creativeorbitinfo@gmail.com`
- **Dashboard URL:** [http://localhost:3000/admin](http://localhost:3000/admin) (Automatically redirects to login if not authenticated).

### Features in the Admin Panel

#### 1. Projects Tab
- **Add Project:** Paste any YouTube video (`youtube.com/watch?v=...`, `youtu.be/...`), YouTube Short (`youtube.com/shorts/...`), or Instagram Reel (`instagram.com/reel/...`) link.
- **Auto-Detection:** Strips tracking parameters (`?si=`, `utm_*`), extracts the video ID, fetches YouTube title automatically, and displays a thumbnail preview.
- **Edit & Organize:**
  - Toggle project visibility on/off instantly.
  - Edit title and summary descriptions.
  - Move items up or down to adjust display order.
  - Delete with confirmation dialog.
- **Filter Projects:** Easily filter by *All*, *YouTube Videos*, or *Reels & Shorts*.

#### 2. Reviews Tab
- **Upload Screenshot:** Upload client praise screenshots (PNG, JPG, or WebP).
- **Browser Compression:** Images are automatically optimized and converted to WebP (max width 1200px, 80% quality) in the browser before uploading to the `review-screenshots` storage bucket.
- **Client Details:** Optional fields for client name and highlighted review text quote.
- **Manage Reviews:** Toggle visibility, edit client names and text, reorder, and delete (which also removes the file from Supabase storage).
- **Auto-Hiding:** The public "Client Reviews" section only appears on the homepage when there is at least one visible review.

---

## 🧪 Running Tests & Validation

```bash
pnpm test     # Run Vitest unit tests
pnpm lint     # Run ESLint validation
pnpm build    # Verify production Next.js build
```

---

## 📜 Credits & License

- Code licensed under the [GNU General Public License v2.0](LICENSE).
