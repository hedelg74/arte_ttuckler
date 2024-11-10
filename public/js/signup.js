import { showDialog } from "./showdialog.message.js";

document.querySelector("form").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
	event.preventDefault();

	const password = document.getElementById("password").value;
	const confirmPassword = document.getElementById("confirm-password").value;

	if (password !== confirmPassword) {
		alert("Las contraseñas no coinciden!");
		return false;
	} else {
		const formData = new FormData(event.target); // Aquí el cambio
		const formObject = Object.fromEntries(formData);

		fetch("/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formObject),
		})
			.then((response) => {
				if (!response.ok) {
					response.json().then((errData) => {
						throw new Error(errData.message + response.statusText);
					});
				}
				return response.json();
			})
			.then((data) => {
				if (data) window.location.href = "/welcome.html";
			})
			.catch((error) => {
				console.error(error);
				showDialog(false, error.message);
			});
	}
}
