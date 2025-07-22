-- SQL schema for LearnPro on Supabase
-- Requires uuid-ossp extension for UUID generation

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Predefined admin accounts
INSERT INTO users (id, email, password_hash, full_name, role)
VALUES
    (uuid_generate_v4(), 'admin1@example.com', '$2b$10$hashedpassword1', 'Admin One', 'admin'),
    (uuid_generate_v4(), 'admin2@example.com', '$2b$10$hashedpassword2', 'Admin Two', 'admin'),
    (uuid_generate_v4(), 'admin3@example.com', '$2b$10$hashedpassword3', 'Admin Three', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Categories for courses
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- Courses
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    price NUMERIC(10,2),
    status TEXT DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons inside courses
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_url TEXT,
    lesson_order INTEGER
);

-- Subscription plans
CREATE TABLE IF NOT EXISTS plans (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    period INTERVAL NOT NULL,
    description TEXT
);

-- Subscriptions purchased by users
CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id INTEGER NOT NULL REFERENCES plans(id),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'active'
);

-- Payments for subscriptions
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    provider TEXT,
    status TEXT,
    paid_at TIMESTAMPTZ DEFAULT NOW()
);

-- Course progress per lesson
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    lesson_id INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ
);

-- Notifications for users
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
