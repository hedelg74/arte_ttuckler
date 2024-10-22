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
					throw new Error(`Error del servidor: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data.success) {
					window.location.href = "/welcome.html";
					console.log("La cuenta se ha creado con éxito.");
				}
			})
			.catch((e) => {
				console.error("Ha ocurrido un error al crear la cuenta: ", e);
			});
	}
}
