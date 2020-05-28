/*Global Variables*/ 
let view; 
let service;
/*Default class*/ 
function AreaComponent(service) { 
	//TODO: Intitialize controller for AreaComponent 
	current_component = 'Area'; 
	loadResources(); 
	this.service = service; 
	//this.table = this.get('table-AreaID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods) 
} 
AreaComponent.prototype.get = function (id) {
	return document.getElementById(id); 
}; 
// Adding a row in the table member 
AreaComponent.prototype.addAreaRow = function (oneArea) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
AreaComponent.prototype.printAreaList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addAreaRow(this.service.get(i));
	}
};

AreaComponent.prototype.promptLogin = function () {
	this.get('restricted').style.display = 'none';
	let window = this.get('login-window');
	window.style.display = 'block';
};

AreaComponent.prototype.authenticate = function() {
	let username = this.get('username').value;
	let password = this.get('password').value;
	if(this.service.isExist(username, password)) {
		// GRANT ACCESS (WORKING ONLY WHEN DATA IS EXTERNAL)
		localStorage.setItem('ACCESS', username);
		this.loadData();
	} else {
		this.get('errorMess').innerHTML = 'Username or Password not valid';
		this.get('errorBlock').style.display = 'block';
	}
};

AreaComponent.prototype.logout = function() {
	// DENY ACCESS
	localStorage.setItem('ACCESS', null);
	window.location.reload();
};

AreaComponent.prototype.loadData = function() {
	// REMOVE RESTRICTIONS
	this.get('errorBlock').style.display = 'none';
	this.get('login-window').style.display = 'none';
	this.get('user').innerHTML = localStorage.getItem('ACCESS');
	this.get('phone-user').innerHTML = localStorage.getItem('ACCESS');
	this.get('restricted').style.display = 'block';
};

AreaComponent.prototype.cancel = function () {
	route('../Home');
};

/* Main Function */ 
function main() { 
	service = new AreaComponentService(); 
	service.load(dbArea);
	view = new AreaComponent(service); 
	//view.printAreaList(); Uncomment to print data in table member
	if(localStorage.getItem('ACCESS') !== 'null'){
		view.loadData();
	} else view.promptLogin();
} 
