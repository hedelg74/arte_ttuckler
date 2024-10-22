document.querySelector("#loginForm").addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
	event.preventDefault();

	const formData = new FormData(event.target); // Aquí el cambio
	const formObject = Object.fromEntries(formData);

	fetch("/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formObject),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.redirect) {
				if (window.location.pathname === "/") {
					document.getElementById("line-2").classList.toggle("hidden");
					document.getElementById("loginForm").classList.toggle("hidden");
					document.getElementById("logout").classList.toggle("hidden");
					document.getElementById("session-status").textContent = data.username;
					document.getElementById("line-3").classList.toggle("hidden");
					document.getElementById("signup").classList.toggle("hidden");
					document.getElementById("forgot-pwd").classList.toggle("hidden");

					document.querySelector("loginForm").reset(); // Limpiar el formulario
				} else {
					window.location.href = data.redirect; // Redirigir manualmente
				}
			}
		})
		.catch((error) => console.error("Error:", error));
}
