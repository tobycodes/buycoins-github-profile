export const debounce = (fn, timeout = 500) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
};

export const isEmpty = (value) => {
  if (Array.isArray(value) && !value.length) return true;
  if (value == null) return true;
  if (typeof value == "object" && !Object.keys(value).length) return true;
  if (typeof value == "string" && !value.trim().length) return true;
  if (typeof value == "number" && !Number.isFinite(value)) return true;

  return false;
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const lang = navigator.language ?? "en-UK";
  const day = new Intl.DateTimeFormat(lang, { day: "numeric" }).format(date);
  const month = new Intl.DateTimeFormat(lang, { month: "short" }).format(date);

  return `${day} ${month}`;
};
