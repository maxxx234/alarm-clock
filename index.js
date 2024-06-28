document.addEventListener('DOMContentLoaded', (event) => {
  const currentTimeElement = document.getElementById('current-time');
  const alarmTimeInput = document.getElementById('alarm-time');
  const setAlarmButton = document.getElementById('set-alarm');
  const alarmMessageElement = document.getElementById('alarm-message');
  let alarmTime = null;
  let alarmTimeout = null;

  // Update current time every second
  setInterval(() => {
      const now = new Date();
      currentTimeElement.textContent = now.toLocaleTimeString();
  }, 1000);

  // Set alarm
  setAlarmButton.addEventListener('click', () => {
      const alarmTimeValue = alarmTimeInput.value;
      if (!alarmTimeValue) {
          alert('Please set a valid alarm time.');
          return;
      }

      const now = new Date();
      const [hours, minutes] = alarmTimeValue.split(':').map(Number);
      alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

      if (alarmTime < now) {
          alarmTime.setDate(alarmTime.getDate() + 1); // Set for the next day if the time has already passed today
      }

      const timeToAlarm = alarmTime.getTime() - now.getTime();
      if (alarmTimeout) {
          clearTimeout(alarmTimeout); // Clear any existing alarm timeout
      }

      alarmTimeout = setTimeout(() => {
          alarmMessageElement.textContent = 'Alarm ringing!';
      }, timeToAlarm);

      alarmMessageElement.textContent = `Alarm set for ${alarmTime.toLocaleTimeString()}`;
  });
});
