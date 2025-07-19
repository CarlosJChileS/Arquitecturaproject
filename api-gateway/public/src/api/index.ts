export async function getCourses() {
  const res = await fetch('http://localhost:3000/products');
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  return res.json();
}

export async function getCourse(id: number) {
  const res = await fetch(`http://localhost:3000/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course');
  }
  return res.json();
}
