function authenticateClientToken() {
	const formLogin = document.getElementById("loginForm");

	const linkLogOut = document.getElementById("logout");
	const spanSessionStatus = document.getElementById("session-status");
	const hrLineDos = document.getElementById("line-2");
	const hrLineTres = document.getElementById("line-3");
	const forgotPwd = document.getElementById("forgot-pwd");
	const signUp = document.getElementById("signup");
	fetch("/auth", {
		method: "GET",
		credentials: "same-origin",
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				spanSessionStatus.textContent = data.username;
				hrLineDos.classList.toggle("hidden");
				formLogin.classList.toggle("hidden");
				hrLineTres.classList.toggle("hidden");
				linkLogOut.classList.toggle("hidden");
				signUp.classList.toggle("hidden");
				forgotPwd.classList.toggle("hidden");
			} else {
				spanSessionStatus.textContent = "Login";
			}
		})
		.catch((error) => {
			console.error("Error en el servidor: ", error);
		});
}

document.addEventListener("DOMContentLoaded", authenticateClientToken);
