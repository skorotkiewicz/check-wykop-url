let popupEl = document.createElement("DIV");
let popupBody = document.createElement("DIV");

popupEl.addEventListener("click", destroyWindow, false);

Object.assign(popupEl.style, {
  position: "fixed",
  top: "10px",
  left: "10px",
  zIndex: Number.MAX_SAFE_INTEGER,
  minWidth: "250px",
  height: "35px",
  background: "#ccc",
  border: "1px solid #000",
  borderRadius: "0.5rem",
  padding: "10px",
});

Object.assign(popupBody.style, {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "14px",
  color: "#000",
});

function destroyWindow() {
  popupEl.removeEventListener("click", destroyWindow, false);
  popupEl.removeChild(popupBody);
  document.body.removeChild(popupEl);
}

popupBody.textContent = "Sprawdzam...";

fetch("https://wykop-url.herokuapp.com/check/?url=" + window.location.href)
  .then((response) => response.json())
  .then((data) => {
    if (data.exists === false) {
      popupBody.textContent = "Możesz dodać ten link na Wykop! :)";
    } else if (data.exists === true) {
      popupBody.textContent = "Link juz został dodany na Wykop :(";

      let anchorEl = document.createElement("A");
      anchorEl.setAttribute("href", data.link.url);
      anchorEl.setAttribute("target", "_blank");
      anchorEl.textContent = "URL: " + data.link.title;
      popupBody.appendChild(anchorEl);
    } else {
      popupBody.textContent = "Niepoprawny link";
    }
  });

popupEl.appendChild(popupBody);

document.body.appendChild(popupEl);

// https://caiorss.github.io/bookmarklet-maker/

// javascript:(function()%7Blet%20popupEl%20%3D%20document.createElement(%22DIV%22)%3B%0Alet%20popupBody%20%3D%20document.createElement(%22DIV%22)%3B%0A%0ApopupEl.addEventListener(%22click%22%2C%20destroyWindow%2C%20false)%3B%0A%0AObject.assign(popupEl.style%2C%20%7B%0A%20%20position%3A%20%22fixed%22%2C%0A%20%20top%3A%20%2210px%22%2C%0A%20%20left%3A%20%2210px%22%2C%0A%20%20zIndex%3A%20Number.MAX_SAFE_INTEGER%2C%0A%20%20minWidth%3A%20%22250px%22%2C%0A%20%20height%3A%20%2235px%22%2C%0A%20%20background%3A%20%22%23ccc%22%2C%0A%20%20border%3A%20%221px%20solid%20%23000%22%2C%0A%20%20borderRadius%3A%20%220.5rem%22%2C%0A%20%20padding%3A%20%2210px%22%2C%0A%7D)%3B%0A%0AObject.assign(popupBody.style%2C%20%7B%0A%20%20display%3A%20%22flex%22%2C%0A%20%20justifyContent%3A%20%22center%22%2C%0A%20%20flexDirection%3A%20%22column%22%2C%0A%20%20fontSize%3A%20%2214px%22%2C%0A%7D)%3B%0A%0Afunction%20destroyWindow()%20%7B%0A%20%20popupEl.removeEventListener(%22click%22%2C%20destroyWindow%2C%20false)%3B%0A%20%20popupEl.removeChild(popupBody)%3B%0A%20%20document.body.removeChild(popupEl)%3B%0A%7D%0A%0ApopupBody.textContent%20%3D%20%22Sprawdzam...%22%3B%0A%0Afetch(%22https%3A%2F%2Fwykop-url.herokuapp.com%2Fcheck%2F%3Furl%3D%22%20%2B%20window.location.href)%0A%20%20.then((response)%20%3D%3E%20response.json())%0A%20%20.then((data)%20%3D%3E%20%7B%0A%20%20%20%20if%20(data.exists%20%3D%3D%3D%20false)%20%7B%0A%20%20%20%20%20%20popupBody.textContent%20%3D%20%22Mo%C5%BCesz%20doda%C4%87%20ten%20link%20na%20Wykop!%20%3A)%22%3B%0A%20%20%20%20%7D%20else%20if%20(data.exists%20%3D%3D%3D%20true)%20%7B%0A%20%20%20%20%20%20popupBody.textContent%20%3D%20%22Link%20juz%20zosta%C5%82%20dodany%20na%20Wykop%20%3A(%22%3B%0A%0A%20%20%20%20%20%20let%20anchorEl%20%3D%20document.createElement(%22A%22)%3B%0A%20%20%20%20%20%20anchorEl.setAttribute(%22href%22%2C%20data.link.url)%3B%0A%20%20%20%20%20%20anchorEl.setAttribute(%22target%22%2C%20%22_blank%22)%3B%0A%20%20%20%20%20%20anchorEl.textContent%20%3D%20%22URL%3A%20%22%20%2B%20data.link.title%3B%0A%20%20%20%20%20%20popupBody.appendChild(anchorEl)%3B%0A%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20popupBody.textContent%20%3D%20%22Niepoprawny%20link%22%3B%0A%20%20%20%20%7D%0A%20%20%7D)%3B%0A%0ApopupEl.appendChild(popupBody)%3B%0A%0Adocument.body.appendChild(popupEl)%3B%7D)()%3B
