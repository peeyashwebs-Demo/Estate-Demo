(function(){
// small util
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));


// populate dynamic year
document.getElementById('year')?.textContent = new Date().getFullYear();


// mobile menu
const menuToggle = $('#menu-toggle') || $('#menu-toggle-2') || $('#menu-toggle-3') || $('#menu-toggle-4') || $('#menu-toggle-5') || $('#menu-toggle-6');
const nav = $('#main-nav');
menuToggle?.addEventListener('click', ()=> nav.classList.toggle('open'));


// theme toggle (basic)
const themeButtons = $$('.icon-btn');
themeButtons.forEach(btn=>btn.addEventListener('click', ()=> document.body.classList.toggle('theme-dark')));


// sample property data (unique sample set)
const PROPERTIES = [
{id:1,title:'Lekki Waterfront 5-bed',type:'apartment',price:120,location:'Lekki Phase 1',img:'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',lat:6.4410,lng:3.4910},
{id:2,title:'Ikoyi Executive Terrace',type:'terrace',price:85,location:'Ikoyi',img:'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',lat:6.4325,lng:3.4218},
{id:3,title:'Victoria Island Office Block',type:'commercial',price:200,location:'Victoria Island',img:'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',lat:6.4270,lng:3.4215}
];


// render featured on index
const featured = $('#featured-list');
if(featured){
PROPERTIES.slice(0,3).forEach(p=>{
const el = document.createElement('article');
el.className='card';
el.innerHTML = `<img src="${p.img}" alt="${p.title}" /><h3>${p.title}</h3><p>${p.location} · ₦${p.price}M</p>`;
featured.appendChild(el);
});
}


// listings page render + filters
function renderListings(filter={search:'',type:'all',price:'any'}){
const grid = $('#listings-grid');
if(!grid) return;
grid.innerHTML='';
const results = PROPERTIES.filter(p=>{
const q = filter.search.toLowerCase();
let ok = (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q));
if(filter.type!=='all') ok = ok && p.type===filter.type;
if(filter.price!=='any'){
if(filter.price==='0-50') ok = ok && p.price<=50;
if(filter.price==='50-150') ok = ok && p.price>50 && p.price<=150;
if(filter.price==='150+') ok = ok && p.price>150;
}
return ok;
});


results.forEach(p=>{
const node = document.createElement('div');
node.className='card';
node.style.padding='12px';
node.innerHTML = `<img src='${p.img}' alt='${p.title}' style='width:100%;height:180px;object-fit:cover;border-radius:8px' /><h3>${p.title}</h3><p>${p.location}</p><p><strong>₦${p.price}M</strong></p><a href='property-${p.id}.html' class='btn-outline'>View Details</a>`;
grid.appendChild(node);
});
}


// wire filters
$('#applyFilters')?.addEventListener('click', ()=>{
renderListings({search:$('#searchInput')?.value||'',type:$('#typeFilter')?.value||'all',price:$('#priceFilter')?.value||'any'});
});


// auto render on listings page
renderListings({search:'',type:'all',price:'any'});


// load simple map teaser (Google Maps lite embed)
const mapTeaser = $('#map-teaser');
if(mapTeaser){
mapTeaser.innerHTML = `<iframe src='https://www.google.com/maps?q=lekki+phase+1+lagos&output=embed' style='width:100%;height:100%;border:0;border-radius:10px'></iframe>`;
}


})();