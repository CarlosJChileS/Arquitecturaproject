const courses = require('../domain/courses');
const supabase = require('../../shared/utils/supabaseClient');

async function getAllCourses() {
  if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw error;
    return data;
  }
  return courses;
}

async function getCourseById(id) {
  if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase.from('courses').select('*').eq('id', id).single();
    if (error) return null;
    return data;
  }
  return courses.find(c => c.id === id);
}

async function addCourse({ title, description }) {
  if (process.env.SUPABASE_URL) {
    const { data, error } = await supabase
      .from('courses')
      .insert({ title, description })
      .single();
    if (error) throw error;
    return data;
  }
  const course = { id: courses.length + 1, title, description };
  courses.push(course);
  return course;
}

module.exports = { getAllCourses, getCourseById, addCourse };
