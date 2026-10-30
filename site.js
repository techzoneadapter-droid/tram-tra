(function agateaApp(){
"use strict";
const PRODUCTS=[
{id:"sen120",name:"Trầm trà Hương Sen",weight:"120g",pack:"Hộp quà tặng",price:1499000,category:"gift",image:"assets/sen-120.svg",short:"Một món quà thanh nhã dành cho những cuộc gặp đáng nhớ."},
{id:"tram120",name:"Trầm trà",weight:"120g",pack:"Hộp quà tặng",price:1199000,category:"gift",image:"assets/tram-120.svg",short:"Vị trầm nguyên bản, chỉn chu trong dáng hộp quà."},
{id:"sen100",name:"Trầm trà Hương Sen",weight:"100g",pack:"Hộp hít nam châm",price:650000,category:"magnet",image:"assets/sen-100.svg",short:"Một khoảng bình yên nho nhỏ trên bàn trà."},
{id:"tram100",name:"Trầm trà",weight:"100g",pack:"Hộp hít nam châm",price:500000,category:"magnet",image:"assets/tram-100.svg",short:"Gọn gàng, tinh tế, dành cho người thật sự yêu trà."},
{id:"sen10",name:"Trầm trà Hương Sen",weight:"10g",pack:"Hộp giấy",price:80000,category:"paper",image:"assets/sen-10.svg",short:"Lời chào nhẹ nhàng để bắt đầu làm quen với trà."},
{id:"tram10",name:"Trầm trà",weight:"10g",pack:"Hộp giấy",price:60000,category:"paper",image:"assets/tram-10.svg",short:"Một trải nghiệm nhỏ, đủ để nhớ hương trà."}
];
const meta={
1:{eyebrow:"AGATEA — TINH HOA TRÀ VIỆT",title:"Có những món quà, không cần nói nhiều.",subtitle:"Trà trầm hương AGATEA. Một khoảng lặng đủ sâu để gửi trọn sự trân quý.",cta:"Chọn một món quà",note:"Di sản · Trang trọng · Sâu lắng"},
2:{eyebrow:"MỘT KHOẢNG LẶNG CHO RIÊNG MÌNH",title:"Chậm lại, để nghe hương trà kể chuyện.",subtitle:"Giữa những ngày vội vã, một chén trà là lời hẹn với chính mình.",cta:"Bắt đầu từ một chén trà",note:"Tĩnh tại · Tối giản · Tự nhiên"},
3:{eyebrow:"TỪ TÂM Ý ĐẾN MỘT MÓN QUÀ",title:"Điều đẹp nhất là cảm giác được nhớ đến.",subtitle:"Không chỉ trao một hộp trà. Trao một lời chúc bình an, một sự quan tâm thật lòng.",cta:"Khám phá hộp quà",note:"Trao tặng · Gắn kết · Ý nghĩa"},
4:{eyebrow:"AGATEA / TRÀ TRẦM HƯƠNG",title:"Chọn đúng trà. Đặt hàng thật dễ.",subtitle:"Sáu lựa chọn rõ ràng. Giá niêm yết minh bạch. Chọn sản phẩm, điền thông tin và gửi yêu cầu đặt hàng.",cta:"Xem giá & đặt hàng",note:"Rõ ràng · Tiện lợi · Tin cậy"},
5:{eyebrow:"CHƯƠNG I — TINH HOA TRÀ VIỆT",title:"Hương trầm ở lại. Chuyện người tiếp nối.",subtitle:"Một hành trình từ nét mộc của trầm, sự tĩnh tại của trà đạo, đến vẻ đẹp trong mỗi lần trao tặng.",cta:"Đọc câu chuyện AGATEA",note:"Kể chuyện · Khám phá · Đương đại"}
};
const theme=Math.min(5,Math.max(1,Number(document.body.dataset.theme)||1));
const cfg=meta[theme];
const money=n=>Number(n).toLocaleString("vi-VN")+"đ";
const shortLabel=p=>`${p.name} — ${p.weight} · ${p.pack}`;
const clean=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function productCard(p,index){
return `<article class="product-card" data-category="${p.category}">
<div class="product-visual"><span class="product-index">${String(index+1).padStart(2,"0")}</span><img src="${p.image}" alt="Minh họa bao bì AGATEA ${clean(shortLabel(p))}" loading="lazy" width="440" height="430"></div>
<div class="product-copy"><p class="product-type">${p.pack} · ${p.weight}</p><h3>${p.name}</h3><p class="product-description">${p.short}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button type="button" class="button-link" data-buy="${p.id}" aria-label="Đặt ${clean(shortLabel(p))}">Chọn mua <span aria-hidden="true">↗</span></button></div></div></article>`;
}
const mark=`<a class="brand" href="./index.html" aria-label="AGATEA — về trang chọn mẫu"><span class="brand-symbol" aria-hidden="true">A<span>◈</span></span><span class="brand-name">AGATEA<small>TINH HOA TRÀ VIỆT</small></span></a>`;
const header=`<header class="site-header"><div class="header-inner">${mark}<nav class="main-nav" aria-label="Điều hướng chính"><a href="#cau-chuyen">Câu chuyện</a><a href="#bo-suu-tap">Bộ sưu tập</a><a href="#nghe-thuat-trao-tang">Quà tặng</a><a href="#hoi-dap">Giải đáp</a></nav><a class="header-cta" href="#dat-hang">Đặt hàng <span aria-hidden="true">↗</span></a><button type="button" class="mobile-menu-toggle" aria-label="Mở điều hướng" aria-expanded="false">☰</button></div></header>`;
function hero(){
const heroProd=(theme===2||theme===5)?"sen100":"sen120";
const src=PRODUCTS.find(p=>p.id===heroProd);
if(theme===4)return `<section class="hero hero-4"><div class="hero-copy"><p class="eyebrow">${cfg.eyebrow}</p><h1>${cfg.title}</h1><p class="hero-lead">${cfg.subtitle}</p><div class="hero-actions"><a class="btn btn-primary" href="#bo-suu-tap">${cfg.cta} <span>↗</span></a><a class="btn btn-outline" href="#dat-hang">Điền đơn ngay</a></div><div class="hero-facts"><span><b>06</b> sản phẩm</span><span><b>Từ 60.000đ</b> giá niêm yết</span><span><b>01</b> biểu mẫu</span></div></div><div class="hero-art"><div class="scene-label">SẢN PHẨM NỔI BẬT / 01</div><img src="${src.image}" alt="Trà trầm hương Hương Sen AGATEA, hộp quà tặng" width="600" height="600"><div class="price-pin">Hương Sen · 120g<b>1.499.000đ</b></div></div></section>`;
if(theme===3)return `<section class="hero hero-3"><div class="hero-art"><div class="seal">AGATEA<br><span>WITH CARE</span></div><img src="${src.image}" width="600" height="600" alt="Hộp quà Trầm trà Hương Sen AGATEA"></div><div class="hero-copy"><p class="eyebrow">${cfg.eyebrow}</p><h1>${cfg.title}</h1><p class="hero-lead">${cfg.subtitle}</p><p class="handwritten">“Cảm ơn vì bạn đã ở đây.”</p><div class="hero-actions"><a class="btn btn-primary" href="#bo-suu-tap">${cfg.cta} ↗</a></div></div></section>`;
if(theme===5)return `<section class="hero hero-5"><div class="hero-chapter">01 <span></span> HƯƠNG</div><div class="hero-copy"><p class="eyebrow">${cfg.eyebrow}</p><h1>${cfg.title}</h1><p class="hero-lead">${cfg.subtitle}</p><a class="story-link" href="#cau-chuyen">${cfg.cta} <span aria-hidden="true">↘</span></a></div><div class="hero-art"><img src="${src.image}" alt="Hộp trà AGATEA nâu ánh kim thiết kế truyền thống" width="600" height="600"></div><p class="hero-side-note">Một chén trà<br>Muôn điều chưa nói</p></section>`;
if(theme===2)return `<section class="hero hero-2"><div class="hero-copy"><p class="eyebrow">${cfg.eyebrow}</p><h1>${cfg.title}</h1><p class="hero-lead">${cfg.subtitle}</p><a class="btn btn-primary" href="#bo-suu-tap">${cfg.cta} <span>↗</span></a></div><div class="hero-art"><span class="sun" aria-hidden="true"></span><img src="${src.image}" alt="Minh họa hộp trà Hương Sen AGATEA 100g" width="600" height="600"><p>Một chén trà. Một nhịp thở.</p></div><div class="hero-bottomline">TRÀ ĐẠO KHÔNG VỘI. NGƯỜI THƯỞNG TRÀ CŨNG KHÔNG CẦN VỘI.</div></section>`;
return `<section class="hero hero-1"><div class="hero-copy"><p class="eyebrow">${cfg.eyebrow}</p><h1>${cfg.title}</h1><p class="hero-lead">${cfg.subtitle}</p><a class="btn btn-primary" href="#bo-suu-tap">${cfg.cta} <span>↗</span></a><p class="hero-footnote">Trà trầm hương · Hương Sen · Hộp quà tinh tuyển</p></div><div class="hero-art"><span class="hero-watermark">A</span><img src="${src.image}" alt="Hộp quà Trầm trà Hương Sen AGATEA với nhận diện nâu vàng kim" width="600" height="600"><span class="hero-vertical">Một món quà từ sự trân trọng</span></div></section>`;
}
function introStrip(){
const bits=[
["01","Hai phong vị","Trầm trà & Trầm trà Hương Sen"],
["02","Ba quy cách","Hộp quà · Hộp hít nam châm · Hộp giấy"],
["03","Một tinh thần","Trao đi điều tử tế, giữ lại phút an yên"]
];return `<div class="intro-strip">${bits.map(i=>`<div><span>${i[0]}</span><strong>${i[1]}</strong><small>${i[2]}</small></div>`).join("")}</div>`;
}
function story(){
return `<section class="story-section section-wrap" id="cau-chuyen"><div class="section-heading story-heading"><p class="eyebrow">CÂU CHUYỆN AGATEA</p><h2>Chuyện của trầm.<br>Chuyện của trà.<br><em>Chuyện của người.</em></h2></div><div class="story-body"><p class="dropcap">Có những điều đẹp đẽ không thể vội vàng. Trầm hương gợi nhắc về sự bền bỉ của thời gian. Trà đạo dạy ta đặt chiếc điện thoại xuống, nâng chén trà bằng hai tay và thật sự hiện diện trong một cuộc gặp.</p><p>AGATEA tìm đến điểm gặp của hai tinh thần ấy: nét mộc mạc, chiều sâu của hương trầm và khoảnh khắc tĩnh tại khi thưởng trà. Mỗi hộp trà không chỉ dành để mở ra, mà còn dành để mở đầu một cuộc chuyện trò.</p><p>Và khi được trao tặng, món quà trở thành một lời nhắn giản dị: <strong>“Tôi trân trọng bạn. Mong bạn có thêm những phút bình yên.”</strong></p><a href="#nghe-thuat-trao-tang" class="text-arrow">Khám phá ý nghĩa trao tặng <span>↗</span></a></div><div class="story-aside"><div class="ink-landscape" aria-hidden="true"><span class="ridge ridge-a"></span><span class="ridge ridge-b"></span><span class="moon"></span></div><span>茶<br>道</span><small>Không phải để sống chậm hơn người khác.<br>Chỉ để sống trọn hơn với hiện tại.</small></div></section>`;
}
function ritual(){
return `<section class="ritual-section"><div class="ritual-index">CHƯƠNG II / TRÀ ĐẠO</div><div class="ritual-layout"><div class="ritual-visual"><div class="tea-bowl"><div class="tea-surface"></div></div><div class="tea-steam steam-1"></div><div class="tea-steam steam-2"></div><p>Hương trà như một khoảng nghỉ</p></div><div class="ritual-copy"><p class="eyebrow">NGHI THỨC NHỎ, Ý NGHĨA LỚN</p><h2>Rót trà.<br>Gác lại vội vàng.</h2><p>Một ấm nước vừa độ, một chiếc chén sạch, một người có mặt trọn vẹn: đôi khi chỉ thế đã đủ để một ngày trở nên dịu lại. Với AGATEA, thưởng trà không cần cầu kỳ. Điều quan trọng là sự chăm chú dành cho khoảnh khắc đang diễn ra.</p><div class="ritual-steps"><span><b>01</b> Đun nước & chuẩn bị chén</span><span><b>02</b> Thưởng hương, nhấp vị trà</span><span><b>03</b> Để câu chuyện tự nhiên bắt đầu</span></div></div></div></section>`;
}
function productsSection(){
return `<section class="catalog-section section-wrap" id="bo-suu-tap"><div class="section-heading catalog-heading"><div><p class="eyebrow">BỘ SƯU TẬP AGATEA / 06 LỰA CHỌN</p><h2>Chọn một hương trà.<br><em>Giữ một tâm ý.</em></h2></div><p>Từ hộp dùng thử nhỏ gọn đến hộp quà chỉn chu. Chọn theo nhu cầu của bạn, không cần mua nhiều hơn điều cần thiết.</p></div><div class="filters" role="group" aria-label="Lọc sản phẩm"><button type="button" class="filter active" data-filter="all" aria-pressed="true">Tất cả <span>06</span></button><button type="button" class="filter" data-filter="gift" aria-pressed="false">Hộp quà tặng</button><button type="button" class="filter" data-filter="magnet" aria-pressed="false">Hộp hít nam châm</button><button type="button" class="filter" data-filter="paper" aria-pressed="false">Hộp giấy 10g</button></div><div class="product-grid">${PRODUCTS.map(productCard).join("")}</div><p class="catalog-note">Giá trên là giá niêm yết trong bảng sản phẩm COST A. Phí vận chuyển (nếu có) được xác nhận trước khi hoàn tất đơn.</p></section>`;
}
function gifting(){
return `<section class="gift-section" id="nghe-thuat-trao-tang"><div class="gift-visual"><div class="gift-art"><img src="assets/tram-120.svg" alt="Hộp quà Trầm trà AGATEA nâu ánh kim" loading="lazy" width="600" height="600"></div><div class="gift-stamp">TẶNG <span>từ tâm</span></div></div><div class="gift-copy"><p class="eyebrow">NGHỆ THUẬT TRAO TẶNG</p><h2>Quà quý không ở giá tiền.<br><em>Ở người được nghĩ tới.</em></h2><p>Trong văn hóa Việt, một món quà đẹp luôn mang theo lời chúc. Tặng trà cho cha mẹ là lời mong về những ngày thong thả. Tặng trà cho người bạn cũ là lời hẹn gặp nhau lâu hơn. Tặng đối tác một hộp trà chỉn chu là cách nói lời cảm ơn mà không cần phô trương.</p><p>Vì vậy, AGATEA chú trọng khoảnh khắc người nhận mở hộp, pha chén trà đầu tiên và nhớ đến người đã gửi tặng.</p><div class="gift-occasions"><span>Người thân</span><span>Đối tác</span><span>Tri ân</span><span>Dịp đặc biệt</span></div><a href="#bo-suu-tap" class="text-arrow">Tìm món quà phù hợp <span>↗</span></a></div></section>`;
}
function assurance(){
return `<section class="assurance section-wrap" aria-label="Thông tin mua hàng"><div><span class="assurance-sign">↗</span><h3>Giá rõ ràng</h3><p>Giá niêm yết được hiển thị trên từng sản phẩm, không dùng mức giá gây hiểu nhầm.</p></div><div><span class="assurance-sign">✦</span><h3>Chọn lựa vừa đủ</h3><p>Hai dòng trà và ba kiểu đóng gói, dễ chọn cho mình hoặc một người quan trọng.</p></div><div><span class="assurance-sign">⌁</span><h3>Xác nhận đơn riêng</h3><p>Đơn gửi thành công được ghi nhận; bộ phận bán hàng liên hệ xác nhận phí và giao nhận.</p></div></section>`;
}
function faq(){
const q=[
["AGATEA hiện có những dòng sản phẩm nào?","Có Trầm trà và Trầm trà Hương Sen. Mỗi dòng có ba kiểu đóng gói: hộp quà 120g, hộp hít nam châm 100g và hộp giấy 10g."],
["Tôi nên chọn hộp quà hay hộp giấy?","Hộp quà 120g phù hợp khi cần trao tặng chỉn chu; hộp hít nam châm 100g phù hợp thưởng trà hoặc biếu tặng; hộp giấy 10g gọn nhẹ để trải nghiệm trước."],
["Giá trên web đã bao gồm phí giao hàng chưa?","Đây là giá niêm yết của sản phẩm. Phí vận chuyển và phương thức thanh toán sẽ được bộ phận bán hàng thông báo khi xác nhận đơn."],
["Gửi biểu mẫu có phải đã thanh toán không?","Không. Biểu mẫu ghi nhận yêu cầu đặt hàng, chưa thực hiện thanh toán trực tuyến. Nhân viên sẽ liên hệ để xác nhận thông tin và bước thanh toán tiếp theo."],
["Tôi có thể mua để biếu tặng hoặc đặt nhiều hộp không?","Có thể chọn số lượng ở biểu mẫu đặt hàng hoặc để lại lời nhắn về nhu cầu quà tặng; đội ngũ bán hàng sẽ tư vấn phương án phù hợp."],
["Trà có tác dụng chữa bệnh hoặc thay thế thuốc không?","AGATEA là sản phẩm trà, không phải thuốc và không được giới thiệu như một phương pháp điều trị. Nếu có vấn đề sức khỏe hoặc chế độ ăn đặc biệt, bạn nên hỏi ý kiến chuyên gia y tế."]
];
return `<section class="faq-section section-wrap" id="hoi-dap"><div class="section-heading"><p class="eyebrow">NHỮNG ĐIỀU BẠN CÓ THỂ MUỐN BIẾT</p><h2>Hỏi trước khi chọn.<br><em>An tâm khi trao.</em></h2></div><div class="faq-list">${q.map(([a,b],i)=>`<details ${i===0?"open":""}><summary><span class="faq-num">${String(i+1).padStart(2,"0")}</span>${a}<span class="faq-plus" aria-hidden="true">+</span></summary><p>${b}</p></details>`).join("")}</div></section>`;
}
function checkout(){
const opts=PRODUCTS.map(p=>`<option value="${p.id}">${clean(shortLabel(p))} — ${money(p.price)}</option>`).join("");
return `<section class="checkout-section" id="dat-hang"><div class="checkout-intro"><p class="eyebrow">MỘT BƯỚC NỮA, MỘT MÓN QUÀ GẦN HƠN</p><h2>Gửi lời nhắn.<br><em>Chúng tôi nhận đơn.</em></h2><p>Chọn sản phẩm và điền thông tin liên hệ. Đơn hàng chỉ được tính là đã gửi khi hệ thống nhận thành công. Chúng tôi sẽ liên hệ xác nhận trước khi giao.</p><div class="checkout-quote">“Một chén trà ngon đôi khi bắt đầu bằng một ý nghĩ đẹp dành cho ai đó.”</div><div class="checkout-product"><img src="assets/sen-120.svg" loading="lazy" alt="Minh họa hộp quà trà AGATEA" width="240" height="240"></div></div><form id="order-form" class="order-form" autocomplete="on" novalidate><div class="form-head"><span>PHIẾU ĐẶT HÀNG</span><span>AGATEA / 01</span></div><label for="order-product">Sản phẩm bạn chọn <span class="required">*</span></label><select id="order-product" name="product_id" required>${opts}</select><div class="form-row"><div><label for="order-quantity">Số lượng <span class="required">*</span></label><input id="order-quantity" name="quantity" type="number" min="1" max="99" value="1" required inputmode="numeric"></div><div class="order-estimate"><small>Tạm tính sản phẩm</small><strong id="order-total">${money(PRODUCTS[0].price)}</strong><small>Chưa gồm phí vận chuyển (nếu có)</small></div></div><div class="form-row"><div><label for="order-name">Tên người nhận <span class="required">*</span></label><input id="order-name" name="customer_name" type="text" autocomplete="name" maxlength="80" required placeholder="Họ và tên"></div><div><label for="order-phone">Số điện thoại <span class="required">*</span></label><input id="order-phone" name="phone" type="tel" autocomplete="tel" pattern="^\\+?[0-9][0-9 .-]{8,17}$" maxlength="20" required placeholder="Số điện thoại nhận hàng"></div></div><label for="order-address">Địa chỉ giao hàng <span class="required">*</span></label><input id="order-address" name="address" type="text" autocomplete="street-address" maxlength="240" required placeholder="Số nhà, đường, phường/xã, tỉnh/thành"><label for="order-note">Lời nhắn / lời chúc (không bắt buộc)</label><textarea name="message" id="order-note" rows="3" maxlength="700" placeholder="Ví dụ: Mình muốn gửi tặng cha mẹ…"></textarea><div class="honeypot" aria-hidden="true"><label>Không điền ô này<input type="text" tabindex="-1" autocomplete="off" name="bot-field"></label></div><label class="consent"><input type="checkbox" name="consent" required><span>Tôi đồng ý cung cấp thông tin để AGATEA liên hệ xác nhận đơn và giao hàng, theo <a href="./chinh-sach.html" target="_blank" rel="noopener">chính sách bảo mật</a>. <span class="required">*</span></span></label><button type="submit" id="order-submit" class="btn btn-primary form-submit">Gửi yêu cầu đặt hàng <span aria-hidden="true">↗</span></button><p class="form-status" id="order-status" role="status" aria-live="polite"></p><div class="order-small">Không yêu cầu chuyển khoản trước trên biểu mẫu này. Thông tin thanh toán sẽ được xác nhận riêng.</div></form></section>`;
}
function footer(){
return `<footer class="site-footer"><div class="footer-top">${mark}<p>“Tinh hoa trà Việt”<br>Hương trầm gợi chuyện. Chén trà nối người.</p><div><a href="#cau-chuyen">Câu chuyện</a><a href="#bo-suu-tap">Sản phẩm</a><a href="#dat-hang">Đặt hàng</a></div></div><div class="footer-bottom"><span>© AGATEA. Giao diện minh họa được xây dựng từ tài liệu sản phẩm.</span><span><a href="./chinh-sach.html">Bảo mật</a> · <a href="./index.html">Xem 5 thiết kế</a></span></div></footer>`;
}
function variantRibbon(){
return `<div class="variant-ribbon"><span>MẪU ${String(theme).padStart(2,"0")} / 05</span><span>${cfg.note}</span><a href="./index.html">Xem các mẫu khác ↗</a></div>`;
}
function assemble(){
const blocks={story:story(),ritual:ritual(),products:productsSection(),gifting:gifting(),assurance:assurance(),faq:faq(),checkout:checkout()};
let order;
switch(theme){case 1:order=["story","products","ritual","gifting","assurance","faq","checkout"];break;
case 2:order=["ritual","story","products","gifting","assurance","faq","checkout"];break;
case 3:order=["gifting","products","story","ritual","assurance","faq","checkout"];break;
case 4:order=["products","assurance","gifting","story","ritual","faq","checkout"];break;
default:order=["story","ritual","gifting","products","assurance","faq","checkout"];}
document.getElementById("app").innerHTML=variantRibbon()+header+hero()+introStrip()+order.map(x=>blocks[x]).join("")+footer()+`<a href="#dat-hang" class="mobile-sticky-cta">Đặt hàng AGATEA <span>↗</span></a><div id="toast" role="status" aria-live="polite"></div>`;
document.title=`${cfg.title} | AGATEA – Trà Trầm Hương`;
}
function setup(){
document.querySelectorAll("[data-filter]").forEach(el=>el.addEventListener("click",()=>{
const filter=el.dataset.filter;
document.querySelectorAll("[data-filter]").forEach(b=>{b.classList.toggle("active",b===el);b.setAttribute("aria-pressed",String(b===el))});
document.querySelectorAll(".product-card").forEach(card=>{card.hidden=filter!=="all"&&card.dataset.category!==filter});
}));
const productInput=document.getElementById("order-product"),qty=document.getElementById("order-quantity"),total=document.getElementById("order-total");
const update=()=>{const p=PRODUCTS.find(x=>x.id===productInput.value)||PRODUCTS[0];const q=Math.min(99,Math.max(1,Number(qty.value)||1));total.textContent=money(p.price*q);};
productInput.addEventListener("change",update);qty.addEventListener("input",update);
document.querySelectorAll("[data-buy]").forEach(el=>el.addEventListener("click",()=>{productInput.value=el.dataset.buy;qty.value="1";update();document.getElementById("dat-hang").scrollIntoView({behavior:"smooth",block:"start"});document.getElementById("order-product").focus({preventScroll:true});}));
const toggle=document.querySelector(".mobile-menu-toggle"),nav=document.querySelector(".main-nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("nav-open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("nav-open");toggle.setAttribute("aria-expanded","false");toggle.textContent="☰";}));
document.getElementById("order-form").addEventListener("submit",submitOrder);
const params=new URLSearchParams(location.search);const p=params.get("product");
if(p&&PRODUCTS.some(x=>x.id===p)){productInput.value=p;update();}
}
async function submitOrder(ev){
ev.preventDefault();
const form=ev.currentTarget,status=document.getElementById("order-status"),btn=document.getElementById("order-submit");
status.textContent="";status.classList.remove("form-error");
if(!form.reportValidity())return;
const data=new FormData(form);
if(data.get("bot-field"))return;
const p=PRODUCTS.find(x=>x.id===data.get("product_id"))||PRODUCTS[0];
const q=Number(data.get("quantity"));
if(!Number.isInteger(q)||q<1||q>99){status.textContent="Vui lòng chọn số lượng từ 1 đến 99.";status.classList.add("form-error");return;}
const ref="AG-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
const body=new URLSearchParams();
const fields={ "form-name":"agatea-orders","order_id":ref, "variant":String(theme), "product_id":p.id, "product_name":shortLabel(p), "unit_price":String(p.price), "quantity":String(q), "subtotal":String(p.price*q), "customer_name":String(data.get("customer_name")||"").trim(), "phone":String(data.get("phone")||"").trim(),"address":String(data.get("address")||"").trim(),"message":String(data.get("message")||"").trim(),"consent":"yes","bot-field":""};
Object.entries(fields).forEach(([k,v])=>body.append(k,v));
btn.disabled=true;btn.textContent="Đang gửi yêu cầu…";
const netlifyHost=location.hostname.endsWith(".netlify.app");
const active=netlifyHost||window.AGATEA_CONFIG?.formsEnabled===true;
try{
if(active){
const resp=await fetch("./forms.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:body.toString()});
if(!resp.ok)throw new Error("HTTP "+resp.status);
}
const summary={orderId:ref,product:shortLabel(p),quantity:q,subtotal:p.price*q,mode:active?"live":"demo"};
sessionStorage.setItem("agatea-last-order",JSON.stringify(summary));
const next=new URL("./cam-on.html",location.href);
if(!active)next.searchParams.set("demo","1");
location.assign(next.href);
}catch(e){
status.textContent="Chưa gửi được đơn. Bạn vui lòng thử lại hoặc liên hệ đơn vị bán hàng qua kênh chính thức. Không có đơn hàng nào được xác nhận.";
status.classList.add("form-error");
btn.disabled=false;btn.innerHTML='Gửi yêu cầu đặt hàng <span aria-hidden="true">↗</span>';
}
}
assemble();setup();
})();
