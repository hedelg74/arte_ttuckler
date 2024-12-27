import { showDialog } from "./showdialog.message.js";

function loadMainMenu() {
	return fetch("/main-menu", { method: "GET" })
		.then((response) => {
			if (!response.ok) {
				return response.json().then((data) => {
					throw new Error(`${data.message} ${response.statusText}`);
				});
			}
			return response.text();
		})
		.then((data) => {
			document.getElementById("main-menu").innerHTML = data;
			window.dispatchEvent(new Event("menuLoaded"));
		})

		.catch((error) => {
			console.error("Failed to load main menu:", error);
			showDialog(false, error.message);
		});
}

loadMainMenu();
