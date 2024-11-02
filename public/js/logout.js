function logOut() {
	fetch("/logout", {
		method: "POST",
		credentials: "same-origin", // Incluye las cookies de la sesión en la solicitud
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => {
			if (response.ok) {
				document.getElementById("line-2").classList.toggle("hidden");
				document.getElementById("loginForm").classList.toggle("hidden");
				document.getElementById("logout").classList.toggle("hidden");
				document.getElementById("session-status").textContent = "Login";
				document.getElementById("line-3").classList.toggle("hidden");
			} else {
				// Maneja cualquier error
				console.error("Logout fallido");
			}
		})
		.catch((error) => {
			console.error("Error en la solicitud de logout:", error);
		});
}
