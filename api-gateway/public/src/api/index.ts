const API_BASE = '';

export async function getCourses() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export async function getCourse(id: number) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}
