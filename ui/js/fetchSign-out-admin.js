const logout = document.getElementById("logout");

const logoutUser = () => {

  const token = localStorage.getItem("token");

  fetch("http://localhost:7000/api/v2/logout", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/json",
      "authorization": token
    }
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status.length === 7) {
        window.localStorage.clear();
        console.log(data.message);
        window.location.assign("/index");
        return;
      } else {
        window.location.assign("/400_bad");
      }
    })
    .catch(err => {
      return err;
    });
};

logout.onclick = () => {
  let check = confirm("DO YOU WANT TO LOGOUT?");
  if (check) {
    logoutUser();
  }
};

window.onload = () => {
  document.getElementById("user-welcome").style.color = "#ff3008";
  document.getElementById("user-welcome").style.textShadow = "0.5px 0.5px 0.5px white";
  document.getElementById("user-welcome").innerHTML = `Welcome <br> ${localStorage.getItem("fullname")}`;
};





