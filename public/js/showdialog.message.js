export function showDialog(success, message) {
	const myDialog = document.createElement("dialog");

	const myMessage = document.createElement("p");
	myMessage.classList.add("text-lg", "text-center");
	myMessage.textContent = message;

	const iError = document.createElement("i");
	iError.classList.add("bi", "bi-ban", "text-red-500", "text-4xl");

	const iSuccess = document.createElement("i");
	iSuccess.classList.add("bi", "bi-check-circle", "text-green-500", "text-4xl");

	if (!success) {
		iSuccess.classList.toggle("hidden");
	} else {
		iError.classList.toggle("hidden");
	}

	myDialog.appendChild(iError);
	myDialog.appendChild(iSuccess);
	myDialog.appendChild(myMessage);
	document.body.appendChild(myDialog);

	myDialog.classList.add("flex", "justify-center", "items-center", "w-[500px]", "h-auto", "gap-x-5", "rounded", "p-10", "mx-auto", "w-auto");

	myDialog.showModal();

	setTimeout(() => {
		myDialog.close();
		document.body.removeChild(myDialog);
	}, 3000);
	return message;
}
