import { showDialog } from "./showdialog.message.js";

/*---------------------------------------------------------------------
	#USERS LOAD-PUT
-----------------------------------------------------------------------*/

async function loadUser() {
	try {
		const response = await fetch("/users/personal-data");

		if (!response.ok) {
			throw new Error("Error al cargar datos de usuario: " + response.statusText);
		}
		const data = await response.json();

		if (data) {
			fillUserForm(data);
		} else {
			console.error("Ha ocurrido un error al cargar datos de usuario: ");
		}
	} catch (error) {
		console.error("Ha ocurrido un error: ", error);
	}
}

function fillUserForm(userData) {
	const { name, last_name, phone } = userData;
	document.getElementById("name").value = name;
	document.getElementById("last-name").value = last_name;
	document.getElementById("phone-number").value = phone;
}

document.getElementById("form-profile").addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	try {
		const data = await fetchData("/users/profile", {
			method: "PUT",
			body: JSON.stringify(Object.fromEntries(formData)),
			headers: { "Content-Type": "application/json" },
		});

		if (data) {
			showDialog(data.success, data.message);
		}
	} catch (error) {
		console.error("Ha ocurrido un error:", error);
	}
});

/*-----------------------------------------------------------------------
	#USER CHANGE-PASSWORD
-------------------------------------------------------------------------*/

document.getElementById("form-password").addEventListener("submit", async (event) => {
	event.preventDefault();
	const inputPassword = document.getElementById("password");
	const inputConfirmPassword = document.getElementById("confirm-password");

	if (inputPassword.value !== inputConfirmPassword.value) {
		showDialog(false, "Las contraseñas no coinciden");
		return;
	}

	const formData = new FormData(event.target);
	try {
		const data = await fetchData(`/user/password`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(Object.fromEntries(formData)),
		});
		if (data) {
			showDialog(data.success, data.message);
		}
	} catch (error) {
		console.error("Ha ocurrido un error:", error);
	}
});

/*-------------------------------------------------------------------------------
	#ADDRESSES LOAD-CRUD
-------------------------------------------------------------------------------*/

let addressArray = [];
let addressOptionsHasChanged = false;
let initialDataLoad = false;

async function loadAddress() {
	try {
		const data = await fetchData("/user/load-address");

		if (data) {
			addressArray = data.map((obj) => ({
				obj,
			}));
			addAddressOption(addressArray);
			if (!initialDataLoad) searchDefaultAddress(addressArray);
			initialDataLoad = true;
		} else {
			console.error("Ha ocurrido un error al cargar las direcciones: ");
		}
	} catch (error) {
		console.error("Ha ocurrido un error: ", error);
	}
}

function addAddressOption(addresses) {
	const selectElement = document.getElementById("address-options");
	removeOptions(selectElement);
	addresses.forEach((address) => {
		const nuevaOpcion = document.createElement("option");
		nuevaOpcion.value = address.obj.id;
		nuevaOpcion.textContent = address.obj.type;
		selectElement.appendChild(nuevaOpcion);
	});
	if (!addressOptionsHasChanged) {
		selectElement.selectedIndex = 0;
	} else {
		const inputAddressType = document.getElementById("address-type");
		const option = Array.from(selectElement.options).find((option) => option.text === inputAddressType.value);

		if (option) {
			option.selected = true; // Marcar la opción como seleccionada
		}
	}
}

function removeOptions(selectElement) {
	const options = selectElement.options;

	for (let i = options.length - 1; i > 0; i--) {
		selectElement.remove(i);
	}
}

function searchDefaultAddress(addresses) {
	const defaultAddress = addresses.find((address) => address.obj.is_default);
	fillAddressForm(defaultAddress || addresses[0]);
}

function searchAddressByType(addresses, addressId) {
	const address = addresses.find((address) => address.obj.id == addressId);
	fillAddressForm(address);
}

function fillAddressForm(address) {
	const { id, is_default, type, address_line1, address_line2, city, state, country, postal_code } = address.obj;
	document.getElementById("address-id").value = id;
	document.getElementById("isDefault").checked = Boolean(is_default);
	document.getElementById("address-type").value = type;
	document.getElementById("address_line1").value = address_line1;
	document.getElementById("address_line2").value = address_line2;
	document.getElementById("city").value = city;
	document.getElementById("state").value = state;
	document.getElementById("country").value = country;
	document.getElementById("postal-code").value = postal_code;
}

document.getElementById("address-options").addEventListener("change", (e) => {
	const addressId = e.target.value;
	addressOptionsHasChanged = true;
	searchAddressByType(addressArray, addressId);
});

document.addEventListener("DOMContentLoaded", () => {
	loadUser();
	loadAddress();
});

document.querySelector("#form-address").addEventListener("submit", async (event) => {
	event.preventDefault();

	const formData = new FormData(event.target);
	const formObject = Object.fromEntries(formData);
	switch (event.submitter.id) {
		case "add":
			await addAddress(formObject);
			break;
		case "update":
			await updateAddress(formObject);
			break;
	}
});

async function addAddress(formObject) {
	try {
		const data = await fetchData("/user/add-address", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formObject),
		});

		if (data) {
			loadAddress();
			showDialog(data.success, data.message);
		}
	} catch (error) {
		console.error("Error: ", error);
	}
}

async function updateAddress(formObject) {
	try {
		const data = await fetchData("/user/update-address", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formObject),
		});

		if (data) {
			loadAddress();
			showDialog(data.success, data.message);
		}
	} catch (error) {
		console.error("Error: ", error);
	}
}

async function fetchData(url, options = {}) {
	const response = await fetch(url, options);
	if (!response.ok) {
		const errorData = await response.json();
		showDialog(errorData.success, errorData.message);
		throw new Error("Error in request: " + response.statusText);
	}
	return response.json();
}
