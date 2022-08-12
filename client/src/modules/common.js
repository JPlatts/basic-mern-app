const validateEmail = (email) => {
  return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassword = (password) => {
  let pwRegex = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return pwRegex.test(password);
}

const padTime = (n) => {
    return n < 10 ? `0${n}` : n;
};

const fmtStopDate = (d) => {
  let dt = new Date(d);
  let h = dt.getHours();
  let m = padTime(dt.getMinutes());
  let s = padTime(dt.getSeconds());
  let a = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = padTime(h ? h : 12); // the 0 should be 12
  return `${h}:${m}:${s} ${a}`;
}

const getMins = (d) => {
  let dt = new Date(d);
  return parseInt(Math.abs(dt.getTime() - new Date().getTime()) / (1000 * 60) % 60);
}
export { validateEmail, validatePassword, fmtStopDate, getMins } 
