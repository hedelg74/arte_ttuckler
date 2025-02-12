document.getElementById("load_products").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.products.js').then(module => {
		module.loadProducts();
	});
});

document.getElementById("load_categories").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.categories.js').then(module => {
		module.loadCategories();
	});
});

document.getElementById("load_subcategories").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.subcategories.js').then(module => {
		module.loadSubCategories();
	});
});
document.getElementById("stock-in").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.stockin.js').then(module => {
		module.loadStockIn();
	});
});
document.getElementById("stock-out").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.stockout.js').then(module => {
		module.loadStockOut();
	});
});

document.getElementById("users").addEventListener("click", (event) => {
	event.preventDefault();
	import('./admin.users.js').then(module => {
		module.loadUsers();
	});
});



