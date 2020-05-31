/*Global Variables*/ 
let view; 
let service;
/*Default class*/
function PartnerComponent(service) { 
	//TODO: Intitialize controller for PartnerComponent 
	current_component = 'Partner'; 
	loadResources(); 
	this.service = service; 
	//this.table = $('#table-PartnerID'); Uncomment for apply dynamic data loading to a declared html tag by id (Add other tables if needed with associated methods)
	this.currentblock=null;
	this.block_menu = $('#menu');
	this.block_container = $('#container');
	this.htmlSaver = {
		menu: this.block_menu.innerHTML,
		container: this.block_container.innerHTML
	};
	console.log(this.htmlSaver);
}

// Adding a row in the table member 
PartnerComponent.prototype.addPartnerRow = function (onePartner) { 
	let row = this.table.insertRow(); 
	//row.insertCell().innerHTML = news.id; 
	//TODO:INSERT DATA IN CELLS 
}; 
// Printing all service data into the table member 
PartnerComponent.prototype.printPartnerList = function () { 
	for (let i = 0; i < this.service.size(); i++) { 
		this.addPartnerRow(this.service.get(i)); 
	} 
};

PartnerComponent.prototype.addOnePartner = function (onePartner) {
	this.block_container.innerHTML +=
		'<div class="card" id="'+onePartner.name+'">' +
			'<div class="card-image">' +
				'<img src="'+onePartner.bg+'" alt="">' +
			'</div>'+
			'<div class="card-body">' +
				'<div class="title" style="color: ' + onePartner.color + '">'+onePartner.name+'</div> <div class="ca">Chiffre d\'affaire :'+onePartner.ca+'</div><hr>'+
				'<p class="description">'+onePartner.description+'</p>'+
				'<p class="description">Sur : '+onePartner.zone+'.</p>'+
				'<p class="colabs">Nombre de collobaroteurs de MQL chez '+onePartner.name+' est :'+onePartner.nbr_colla+'</p>'+
				'<img src="' + onePartner.image + '" class="micro-logo" alt="">' +
				'<p class="website">Site web officiel : <a href="https://'+onePartner.website+'" target="_blank">'+onePartner.website+'</a></p>'+
			'</div></div>'
		;
};
PartnerComponent.prototype.addMenuPartners = function (onePartner) {
	this.block_menu.innerHTML +=
			'<div id="menu-' + onePartner.name + '" class="partner active" onclick=view.show("'+onePartner.name+'")>'+onePartner.name+'</div>';
};
// Printing all service data into the table member
PartnerComponent.prototype.printPartners = function () {
	this.currentblock =""+this.service.get(0).name;
	for (let i = 0; i < this.service.size(); i++) {
		this.addMenuPartners(this.service.get(i));
	}
	this.block_menu.innerHTML += '<img class="end-img" src="../../resources/pictures/Partners/menu-bottom.jpg">'
	for (let i = 0; i < this.service.size(); i++) {
		this.addOnePartner(this.service.get(i));
	}
};
PartnerComponent.prototype.show = function (id) {
    let hide_block= $('#' + this.currentblock);
	$('#menu-' + this.currentblock).classList.remove('active');
	let show_block = $('#' + id);
	this.currentblock=id;
    hide_block.style['display'] = 'none';
    show_block.style['display'] = 'block';
    $('#menu-' + id).classList.add('active');
};
PartnerComponent.prototype.show2 = function (id) {
	view.show(id);
	window.location.href='#'+id;
};
PartnerComponent.prototype.hideAll = function () {
	for (let i = 1; i < this.service.size(); i++) {
		let partner = $('.card')[i];
		partner.style['display'] = 'none';
		$('.partner')[i].classList.remove('active');
	}
};

PartnerComponent.prototype.trigger = function () {
	let anchor = window.location.href.split('#')[1];
	if(anchor !== undefined) {
		$('#menu-' + anchor).click();
		route('#' + anchor);
	}
};

PartnerComponent.prototype.ajustLinks = function () {
	let links = $('.img-partenaire');
	for(let link of links) {
		link.setAttribute('onclick', 'view.show2(\'' + link.id + '\')');
	}
};
/* FORM SERVICES */
PartnerComponent.prototype.addData = function() {
	$('#partnerSubmit').setAttribute('onclick', 'view.submitData()');
	popFORM();
};

PartnerComponent.prototype.editData = function(index) {
	let el_name = $('#partnerName');
	let el_color = $('#partnerColor');
	let el_ca=$('#partnerCa');
	let el_desc = $('#partnerDescription');
	let el_co=$('#partnerCo');
	let el_website=$('#partnerWebSite');

	//....
	let target = this.service.get(index);
	el_name.value = target.name;
	el_color.value= target.color;
	el_ca.value= target.ca;
	el_desc.value = target.description;
	el_co.value = target.nbr_colla;
	el_website.value = target.website;
	//...
	$('#partnerSubmit').setAttribute('onclick', 'view.submitData(\'edit\', ' + index + ')');
	popFORM();
};

PartnerComponent.prototype.deleteData = function(index) {
	if(confirm('Are you sure you want to delete this Partner ?')) {
		this.service.remove(index);
		//....
		this.navigate();
	}
};

PartnerComponent.prototype.submitData = function (action = 'add', index = '0') {
	// GETTING DATA MEMBERS
	let name = $('#partnerName').value;
	let color = $('#partnerColor').value;
	let ca=$('#partnerCa').value;
	let desc = $('#partnerDescription').value;
	let co=$('#partnerCo').value;
	let website=$('#partnerWebSite').value;
	//...
	if(action === 'add') {
		this.service.add(new Partner(this.service.size() + 1,'',name,ca,desc,co,[],website,''));
	}
	if(action === 'edit') {
		let target = this.service.get(index);
		target.name = name;
		target.color = color;
		target.ca = ca;
		target.description = desc;
		target.nbr_colla = co;
		target.website = website;
		//...
		$('#partnerSubmit').setAttribute('onclick', 'view.submitData()');
	}
	closeFORM();
	this.navigate();
};
PartnerComponent.prototype.triggerSubmit = function () {
	let submit_element = $('#partnerSubmit');
	submit_element.click();
};
PartnerComponent.prototype.addButtons = function() {
	let names = $('.title');
	let i=0;
	for (let name of names) {
		if(localStorage.getItem('ACCESS') !== 'null') {
			// ADD EDIT AND DELETE ICONS
			name.innerHTML += '<img name="edit-icon" src="../../resources/pictures/icons/edit.png" alt=""  ' +
				'class="sh-icon" onclick="view.editData(' + i + ')">' +
				'<img name="delete-icon" src="../../resources/pictures/icons/delete.png" alt=""  ' +
				'class="sh-icon" onclick="view.deleteData(' + i + ')">';
		}
		i++;
	}
	if(localStorage.getItem('ACCESS') !== 'null') {
		// ADD NEW ICON BLOCK
		let saver = $('.sub-content')[0];
		saver.innerHTML = '<div class="new-block"><img onclick="view.addData()" src="../../resources/pictures/icons/new-icon.png" alt="" class="new-icon"></div>' ;
	}
};
PartnerComponent.prototype.navigate = function() {
	this.block_menu.innerHTML = this.htmlSaver.menu;
	this.block_container.innerHTML = this.htmlSaver.container;
	view.printPartners();
	view.hideAll();
	view.trigger();
	view.ajustLinks();
	view.addButtons();
	setKeysAction('.form-content',view.triggerSubmit.bind(view));
};
/**-------------------------------------------------------------------------------------------------------------------*/
/* Main Function */ 
function main() {
	service = new PartnerComponentService(); 
	service.load(dbPartner);
	view = new PartnerComponent(service); 
	//view.printPartnerList(); Uncomment to print data in table member
	view.printPartners();
	view.hideAll();
	view.trigger();
	view.ajustLinks();
	//view.addButtons();
	setKeysAction('.form-content',view.triggerSubmit.bind(view));
}
