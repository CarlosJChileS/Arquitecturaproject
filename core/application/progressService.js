const progress = require('../domain/progress');

function getUserProgress(userId) {
  return progress.filter(p => p.userId === userId);
}

function addProgress({ userId, courseId, completed }) {
  const entry = { id: progress.length + 1, userId, courseId, completed };
  progress.push(entry);
  return entry;
}

module.exports = { getUserProgress, addProgress };
