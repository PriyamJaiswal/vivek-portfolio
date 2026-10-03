-- run once only

-- ==============================================================================
-- Seed Data for Vivek Singh Portfolio Projects
-- Run this in Supabase SQL Editor once to populate the projects table.
-- ==============================================================================

INSERT INTO public.projects (
  platform,
  format,
  url,
  title,
  summary,
  thumbnail_url,
  is_visible,
  sort_order
) VALUES
-- 1. YouTube Long-Form Videos (platform: youtube, format: video)
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=4Zj6cilMYI8',
  'A Day in the Future – Short Film',
  'A short film exploring futuristic concepts and innovation, edited with narrative pacing and clean visual cuts.',
  'https://img.youtube.com/vi/4Zj6cilMYI8/hqdefault.jpg',
  true,
  1
),
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=x9fvufhEVmw',
  'Varanasi | Ganga Aarti, Ghats & Divine Vibes | Banaras Vlog',
  'A travel vlog capturing the sacred ghats and Ganga Aarti of Varanasi, edited with cinematic pacing and atmospheric visual flow.',
  'https://img.youtube.com/vi/x9fvufhEVmw/hqdefault.jpg',
  true,
  2
),
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=EdJ4dlxwQpU',
  'Banaras Trip | Ganga Aarti, Ghats & Travel Vlog',
  'A vibrant travel vlog with friends documenting the Ghats and Ganga Aarti, edited with energetic pacing and clean cuts.',
  'https://img.youtube.com/vi/EdJ4dlxwQpU/hqdefault.jpg',
  true,
  3
),
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=D95W37VvO2o',
  'Shikayat Song | Cinematic Shots',
  'Cinematic visuals crafted for the song Shikayat, edited with sound synchronization and emotive visual storytelling.',
  'https://img.youtube.com/vi/D95W37VvO2o/hqdefault.jpg',
  true,
  4
),
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=RklzLxJtBiU',
  'Uttarakhand Trip | Haridwar, Rishikesh & Delhi Travel Vlog',
  'A scenic travel vlog journeying through Haridwar, Rishikesh, and Delhi, edited with clean visual transitions and natural soundscapes.',
  'https://img.youtube.com/vi/RklzLxJtBiU/hqdefault.jpg',
  true,
  5
),
(
  'youtube',
  'video',
  'https://www.youtube.com/watch?v=okseUAVJsHo',
  'Internal Smart India Hackathon 2024 - UNSIET Jaunpur',
  'Event recap video documenting technical solutions and presentations at the Smart India Hackathon, edited with clear narrative structure and crisp cuts.',
  'https://img.youtube.com/vi/okseUAVJsHo/hqdefault.jpg',
  true,
  6
),

-- 2. YouTube Shorts (platform: youtube, format: short)
(
  'youtube',
  'short',
  'https://www.youtube.com/shorts/O_qovMhgdM0',
  'Smart India Hackathon #sih',
  'Vertical event recap of the Smart India Hackathon showcasing innovation and student energy.',
  'https://img.youtube.com/vi/O_qovMhgdM0/hqdefault.jpg',
  true,
  7
),
(
  'youtube',
  'short',
  'https://www.youtube.com/shorts/QMGmblj8Zz8',
  'Hostel Boys Dance Video',
  'Hostel dance short edited with high-energy cuts and sound-matched transitions.',
  'https://img.youtube.com/vi/QMGmblj8Zz8/hqdefault.jpg',
  true,
  8
),

-- 3. Instagram Reels (platform: instagram, format: video)
(
  'instagram',
  'video',
  'https://www.instagram.com/reel/DIa-zyitQ85/',
  'Hotel ki Chai ☕',
  'Short-form vertical edit capturing hostel tea moments with crisp pacing and authentic atmosphere.',
  NULL,
  true,
  9
),
(
  'instagram',
  'video',
  'https://www.instagram.com/reel/C_uPkHqIwDL/',
  'Campus Memories & Fun',
  'A fast-paced campus edit showcasing friendship, campus memories, and energetic transitions.',
  NULL,
  true,
  10
),
(
  'instagram',
  'video',
  'https://www.instagram.com/reel/C_uBb8uMPMG/',
  'College Life Vibes',
  'Lively college montage celebrating hostel life and friendships with music synchronization.',
  NULL,
  true,
  11
),
(
  'instagram',
  'video',
  'https://www.instagram.com/reel/C5qjLvyPUna/',
  'VBSP University ❌ Sasural ✅',
  'A viral humorous take on university hostel life with kinetic text and punchy audio timing.',
  NULL,
  true,
  12
),
(
  'instagram',
  'video',
  'https://www.instagram.com/reel/CsTkZpBNuzN/',
  'Gaon | Rural Serenity',
  'Serene short-form vertical edit capturing rural life and morning peacefulness with warm color grading.',
  NULL,
  true,
  13
);
