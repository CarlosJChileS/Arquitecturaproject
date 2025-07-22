const notifications = require('../domain/notifications');

function getNotificationsByUser(userId) {
  return notifications.filter(n => n.userId === userId);
}

function addNotification({ userId, message }) {
  const note = { id: notifications.length + 1, userId, message };
  notifications.push(note);
  return note;
}

module.exports = { getNotificationsByUser, addNotification };
