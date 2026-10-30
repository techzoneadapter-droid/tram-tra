(function agateaSubpages(){
"use strict";
const body=document.body;
const page=body.dataset.page||"home";
const qt=new URLSearchParams(location.search);
const requested=Number(qt.get("mau"));
const theme=Number.isInteger(requested)&&requested>=1&&requested<=5?requested:Number(body.dataset.theme)||1;
body.dataset.theme=String(theme);
const home=`./mau-${theme}.html`;
const pages=[
{key:"home",label:"Trang chủ",href:home},
{key:"story",label:"Câu chuyện",href:`./cau-chuyen.html?mau=${theme}`},
{key:"collection",label:"Bộ sưu tập",href:`./bo-suu-tap.html?mau=${theme}`},
{key:"gift",label:"Quà tặng",href:`./qua-tang.html?mau=${theme}`},
{key:"faq",label:"Giải đáp",href:`./giai-dap.html?mau=${theme}`}
];
const esc=t=>String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nav=document.querySelector(".main-nav");
if(nav){
nav.innerHTML=pages.map(p=>`<a href="${p.href}" ${p.key===page?'aria-current="page"':''}>${p.label}</a>`).join("");
nav.id="site-navigation";
nav.addEventListener("click",e=>{
if(e.target.closest("a")){
nav.classList.remove("nav-open");
const toggle=document.querySelector(".mobile-menu-toggle");
if(toggle){toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";}
}
});
}
const toggle=document.querySelector(".mobile-menu-toggle");
if(toggle){toggle.setAttribute("aria-controls","site-navigation");toggle.setAttribute("aria-label","Mở hoặc đóng menu điều hướng");}
document.querySelectorAll(".brand").forEach(b=>{b.href=home;b.setAttribute("aria-label","AGATEA — Trang chủ");});
const footerNav=document.querySelector(".footer-top > div");
if(footerNav)footerNav.innerHTML=pages.map(p=>`<a href="${p.href}">${p.label}</a>`).join("")+`<a href="#dat-hang">Đặt hàng</a>`;
const pageConfig={
story:{label:"Câu chuyện",eyebrow:"TỪ NHỮNG ĐIỀU MỘC MẠC",title:"Một chén trà. Một câu chuyện đáng giữ.",lead:"Trầm hương gợi nhớ thời gian. Trà đạo nhắc ta trở về với sự hiện diện. AGATEA mong trở thành một phần nhỏ trong những cuộc gặp chân thành.",image:"assets/sen-100.svg",anchor:"#hanh-trinh",action:"Đọc câu chuyện",number:"01 / CÂU CHUYỆN"},
collection:{label:"Bộ sưu tập",eyebrow:"SÁU LỰA CHỌN, HAI HƯƠNG VỊ",title:"Có một hương trà dành cho bạn.",lead:"Trầm trà và Trầm trà Hương Sen, từ hộp 10g gọn nhẹ đến hộp quà 120g chỉn chu. Giá niêm yết và quy cách được trình bày rõ để bạn dễ lựa chọn.",image:"assets/tram-120.svg",anchor:"#bo-suu-tap",action:"Xem đủ 6 sản phẩm",number:"02 / BỘ SƯU TẬP"},
gift:{label:"Quà tặng",eyebrow:"MÓN QUÀ NÓI THAY TẤM LÒNG",title:"Người nhận nhớ không chỉ vì món quà.",lead:"Có những lời cảm ơn khó nói thành lời. Một hộp trà được chọn bằng sự thấu hiểu đôi khi là cách mở đầu câu chuyện đẹp nhất.",image:"assets/sen-120.svg",anchor:"#goi-y-qua-tang",action:"Chọn theo người nhận",number:"03 / QUÀ TẶNG"},
faq:{label:"Giải đáp",eyebrow:"MỌI ĐIỀU BẠN MUỐN BIẾT",title:"Chọn trà an tâm, đặt hàng rõ ràng.",lead:"Tìm hiểu các dòng trà AGATEA, kiểu đóng gói, giá niêm yết và cách gửi yêu cầu đặt hàng. Những thông tin cần xác nhận được nói rõ trước khi bạn quyết định.",image:"assets/tram-100.svg",anchor:"#hoi-dap",action:"Đọc câu trả lời",number:"04 / GIẢI ĐÁP"}
};
const cfg=pageConfig[page];
const app=document.getElementById("app");
if(!app)return;
let main=app.querySelector("#main-content");
if(!main){main=document.createElement("main");main.id="main-content";const footer=app.querySelector(".site-footer");app.insertBefore(main,footer);}
const sectionMap={
hero:app.querySelector(".hero"),
intro:app.querySelector(".intro-strip"),
story:app.querySelector(".story-section"),
ritual:app.querySelector(".ritual-section"),
products:app.querySelector(".catalog-section"),
gifting:app.querySelector(".gift-section"),
assurance:app.querySelector(".assurance"),
faq:app.querySelector(".faq-section"),
checkout:app.querySelector(".checkout-section")
};
function section(html){
const w=document.createElement("div");
w.innerHTML=html.trim();
return w.firstElementChild;
}
function storyChapters(){
return section(`<section class="chapter-section section-wrap" id="hanh-trinh"><div class="section-heading"><p class="eyebrow">BA CHƯƠNG / MỘT TINH THẦN</p><h2>Mỗi hương vị đều có<br><em>một câu chuyện phía sau.</em></h2><p>Câu chuyện lấy cảm hứng từ văn hóa trà và trầm; không thay thế thông tin thành phần hoặc nguồn gốc trên nhãn.</p></div><div class="chapter-grid"><article class="chapter"><span>01 / 03</span><h3>Trầm – dấu vết của thời gian</h3><p>Trong văn hóa Á Đông, trầm hương gắn với sự tĩnh lặng và nét đẹp bền bỉ. Hương trầm nhắc rằng những giá trị sâu sắc thường được nuôi dưỡng qua thời gian.</p><small>Chậm để cảm</small></article><article class="chapter"><span>02 / 03</span><h3>Trà – một cách dành thời gian cho nhau</h3><p>Trà đạo không nhất thiết bắt đầu ở một bộ ấm đắt tiền. Đó có thể là khoảnh khắc ta rót trà cho cha, lắng nghe mẹ kể chuyện, hay ngồi bên bạn cũ mà không nhìn đồng hồ.</p><small>Đủ đầy ở hiện tại</small></article><article class="chapter"><span>03 / 03</span><h3>Quà – điều trao không nằm trong chiếc hộp</h3><p>Món quà đáng nhớ là món quà được chọn vì thấu hiểu người nhận. Một hộp trà là lời mời ngồi lại, chia sẻ và gìn giữ những kết nối thân tình.</p><small>Gửi lời trân quý</small></article></div></section>`);
}
function buyingGuide(){
return section(`<section class="buying-guide section-wrap"><div class="section-heading"><p class="eyebrow">CHỌN THEO NHU CẦU</p><h2>Không cần biết quá nhiều về trà.<br><em>Chỉ cần biết bạn chọn cho ai.</em></h2></div><div class="guide-grid"><article><span>01</span><p class="eyebrow">Dùng thử</p><h3>Hộp giấy 10g</h3><p>Nhỏ gọn để trải nghiệm lần đầu hoặc làm quen với hai dòng hương vị.</p><a class="text-arrow" href="#bo-suu-tap">Xem sản phẩm ↗</a></article><article><span>02</span><p class="eyebrow">Thưởng trà</p><h3>Hộp hít nam châm 100g</h3><p>Đóng gói gọn gàng, phù hợp với một góc thưởng trà quen thuộc.</p><a class="text-arrow" href="#bo-suu-tap">Xem sản phẩm ↗</a></article><article><span>03</span><p class="eyebrow">Biếu tặng</p><h3>Hộp quà 120g</h3><p>Một lựa chọn chỉn chu khi muốn gửi lời trân trọng đến người quan trọng.</p><a class="text-arrow" href="#bo-suu-tap">Xem sản phẩm ↗</a></article></div></section>`);
}
function occasions(){
const data=[
["sen120","Cha mẹ & người thân","Mong những ngày thong thả","Một lời cảm ơn vì những tháng năm đã luôn dành điều tốt đẹp cho chúng ta."],
["tram120","Đối tác & khách hàng","Cảm ơn vì sự đồng hành","Trang trọng nhưng không phô trương; sự trân quý thể hiện bằng lựa chọn chỉn chu."],
["sen100","Bạn bè & người thương","Một lời nhắn về bình yên","Không cần chờ một dịp đặc biệt. Đôi khi trao quà chỉ vì hôm nay ta nhớ đến nhau."]
];
return section(`<section class="occasion-section section-wrap" id="goi-y-qua-tang"><div class="section-heading"><p class="eyebrow">CHỌN THEO NGƯỜI NHẬN</p><h2>Một món quà chỉ thật sự đẹp<br><em>khi có người để nghĩ đến.</em></h2></div><div class="occasion-grid">${data.map((d,i)=>`<article><span>0${i+1} / LỜI GỬI</span><p class="eyebrow">${d[1]}</p><h3>${d[2]}</h3><p>${d[3]}</p><button type="button" data-buy="${d[0]}" class="button-link">Chọn làm quà ↗</button></article>`).join("")}</div></section>`);
}
function faqProcess(){
return section(`<section class="faq-process-section section-wrap"><div class="section-heading"><p class="eyebrow">MINH BẠCH TRƯỚC KHI MUA</p><h2>Điều gì diễn ra<br><em>sau khi bạn gửi đơn?</em></h2></div><div class="faq-process"><article><b>01</b><h3>Chọn sản phẩm</h3><p>Xem quy cách, giá niêm yết và chọn số lượng muốn mua.</p></article><article><b>02</b><h3>Gửi thông tin</h3><p>Điền họ tên, điện thoại và địa chỉ. Bản review là đơn thử, không gửi cho cửa hàng.</p></article><article><b>03</b><h3>Nhận xác nhận</h3><p>Khi trang đã kết nối hệ thống nhận đơn, nhân viên sẽ liên hệ xác nhận giao nhận và thanh toán.</p></article></div><a class="text-arrow" href="${pages[2].href}">Xem bộ sưu tập ↗</a></section>`);
}
function specializedIntro(d){
return section(`<section class="special-top"><div class="special-breadcrumb"><a href="${home}">Trang chủ</a><span aria-hidden="true">/</span><span aria-current="page">${d.label}</span></div><div class="special-hero"><div class="special-hero-copy"><p class="eyebrow">${d.eyebrow}</p><h1>${d.title}</h1><p>${d.lead}</p><div class="special-actions"><a href="${d.anchor}" class="btn btn-primary">${d.action} ↗</a><a href="#dat-hang" class="special-order-link">Đặt hàng tại đây ↗</a></div></div><div class="special-hero-image"><span>${d.number}</span><img src="${d.image}" width="600" height="500" alt="Minh họa bao bì AGATEA ${esc(d.label)}"><small>AGATEA · Tinh hoa trà Việt</small></div></div></section>`);
}
const originalOrder=Object.keys(sectionMap).map(k=>sectionMap[k]).filter(Boolean);
const plan=cfg?{
story:[specializedIntro(cfg),storyChapters(),sectionMap.story,sectionMap.ritual,sectionMap.gifting,sectionMap.checkout],
collection:[specializedIntro(cfg),buyingGuide(),sectionMap.products,sectionMap.assurance,sectionMap.faq,sectionMap.checkout],
gift:[specializedIntro(cfg),occasions(),sectionMap.gifting,sectionMap.products,sectionMap.faq,sectionMap.checkout],
faq:[specializedIntro(cfg),faqProcess(),sectionMap.faq,sectionMap.assurance,sectionMap.checkout]
}:null;
const chosen=cfg?plan[page]:originalOrder;
chosen.filter(Boolean).forEach(el=>main.appendChild(el));
if(cfg){
originalOrder.forEach(el=>{if(!main.contains(el))el.remove()});
const labels={story:"Câu chuyện Trầm Hương, Trà Đạo và AGATEA",collection:"Bộ sưu tập 6 sản phẩm Trà Trầm Hương AGATEA",gift:"Quà tặng Trà Trầm Hương AGATEA",faq:"Giải đáp về Trà Trầm Hương AGATEA và đặt hàng"};
document.title=labels[page]+" | Tinh hoa trà Việt";
}
document.querySelectorAll(".site-header .header-cta, .mobile-sticky-cta").forEach(a=>a.href="#dat-hang");
if(cfg){
main.addEventListener("click",e=>{
const b=e.target.closest("[data-buy]");
if(!b)return;
const select=document.getElementById("order-product"),quantity=document.getElementById("order-quantity");
if(!select)return;
select.value=b.dataset.buy;
quantity.value="1";
select.dispatchEvent(new Event("change",{bubbles:true}));
document.getElementById("dat-hang").scrollIntoView({behavior:"smooth",block:"start"});
});
}
})();
