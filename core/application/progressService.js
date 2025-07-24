const progress = require('../domain/progress');
const supabase = require('../../shared/utils/supabaseClient');
const db = require('../../shared/utils/db');
const { getCourseById } = require('./coursesService');
const { addNotification } = require('./notificationsService');

async function getUserProgress(userId) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query('SELECT * FROM progress WHERE user_id=$1', [userId]);
    return rows;
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
  return progress.filter(p => p.userId === userId);
}

async function addProgress({ userId, courseId, completed }) {
  if (process.env.DATABASE_URL || process.env.DB_HOST) {
    const { rows } = await db.query(
      'INSERT INTO progress (user_id, course_id, completed) VALUES ($1,$2,$3) RETURNING *',
      [userId, courseId, completed]
    );
    const course = await getCourseById(courseId);
    const title = course ? course.title : `curso ${courseId}`;
    const msg = completed
      ? `Has completado el curso ${title}`
      : `Te has inscrito en el curso ${title}`;
    await addNotification({ userId, message: msg });
    return rows[0];
  } else if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('progress')
      .insert({ user_id: userId, course_id: courseId, completed })
      .single();
    if (error) throw error;
    const course = await getCourseById(courseId);
    const title = course ? course.title : `curso ${courseId}`;
    const msg = completed
      ? `Has completado el curso ${title}`
      : `Te has inscrito en el curso ${title}`;
    await addNotification({ userId, message: msg });
    return data;
  }
  const entry = { id: progress.length + 1, userId, courseId, completed };
  progress.push(entry);
  const course = await getCourseById(courseId);
  const title = course ? course.title : `curso ${courseId}`;
  const msg = completed
    ? `Has completado el curso ${title}`
    : `Te has inscrito en el curso ${title}`;
  await addNotification({ userId, message: msg });
  return entry;
}

module.exports = { getUserProgress, addProgress };
