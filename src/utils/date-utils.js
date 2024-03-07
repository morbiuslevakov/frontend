export function transformToDate(milliseconds) {
  const date = new Date(milliseconds);

  const day = date.getDate();

  const month = date.getMonth() + 1;

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

  return `${day} ${months[month - 1]} в ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}