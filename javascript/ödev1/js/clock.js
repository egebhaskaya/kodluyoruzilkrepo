async function showTime() {
  setInterval(() => {
    let info = document.querySelector("#myClock");
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let day = time.getDay();
    let month = time.getMonth();
    let year = time.getFullYear();
    return (info.innerHTML = `${hours}:${minutes}.${seconds} ${day}.${month}.${year}`);
  });
}

document.onload = showTime();
