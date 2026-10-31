(()=>{"use strict";
const P=[
{id:"sen120",name:"Trầm trà Hương Sen",weight:"120g",pack:"Hộp quà tặng",price:1499000},
{id:"tram120",name:"Trầm trà",weight:"120g",pack:"Hộp quà tặng",price:1199000},
{id:"sen100",name:"Trầm trà Hương Sen",weight:"100g",pack:"Hộp hít nam châm",price:650000},
{id:"tram100",name:"Trầm trà",weight:"100g",pack:"Hộp hít nam châm",price:500000},
{id:"sen10",name:"Trầm trà Hương Sen",weight:"10g",pack:"Hộp giấy",price:80000},
{id:"tram10",name:"Trầm trà",weight:"10g",pack:"Hộp giấy",price:60000}
];
const $=(q,ctx=document)=>ctx.querySelector(q);
const $$=(q,ctx=document)=>Array.from(ctx.querySelectorAll(q));
const money=n=>Number(n).toLocaleString("vi-VN")+"đ";
const option=p=>p.name+" — "+p.weight+" · "+p.pack;
const form=$("#agatea-order");
const menu=$(".menu-button"),nav=$("#nav");
if(menu&&nav){menu.addEventListener("click",()=>{let on=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(on));menu.textContent=on?"×":"☰"});$$("a",nav).forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰"}));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.focus()}})}
const select=form?.elements.namedItem("product_id"),qty=form?.elements.namedItem("quantity"),total=$("#order-total");
function recalc(){if(!select||!qty||!total)return;const p=P.find(x=>x.id===select.value)||P[0];const q=Number(qty.value)||1;total.textContent=money(p.price*Math.max(1,Math.min(99,q)))}
select?.addEventListener("change",recalc);qty?.addEventListener("input",recalc);recalc();
function pickProduct(id){if(!form||!P.some(p=>p.id===id))return;select.value=id;qty.value="1";recalc();const order=$("#dat-hang");if(order)order.scrollIntoView({behavior:"smooth",block:"start"});}
document.addEventListener("click",e=>{const b=e.target.closest("[data-buy]");if(b){e.preventDefault();pickProduct(b.dataset.buy)}});
$$("[data-filter]").forEach(button=>button.addEventListener("click",()=>{const value=button.dataset.filter;$$("[data-filter]").forEach(c=>c.setAttribute("aria-pressed",String(c===button)));$$("[data-category]").forEach(card=>{card.hidden=value!=="all"&&card.dataset.category!==value})}));
const messages={
parent:{title:"Mang trà về nhà cuối tuần",text:"Con ghé qua ăn cơm nhé. Con mang chút trà, nhà mình ngồi nói chuyện sau bữa cơm. Gợi ý: Hương Sen 120g.",product:"sen120"},
partner:{title:"Lời cảm ơn người đã đồng hành",text:"Cảm ơn những lần trao đổi thẳng thắn và sự tin tưởng trong công việc. Gợi ý: Trầm trà 120g.",product:"tram120"},
friend:{title:"Hẹn người bạn đã lâu chưa gặp",text:"Lâu rồi không ngồi cùng nhau. Chọn một buổi chiều ít việc, mình pha trà và kể tiếp chuyện cũ. Gợi ý: Hương Sen 100g.",product:"sen100"},
self:{title:"Thử một hộp nhỏ cho mình",text:"Trước khi chọn hộp lớn, thử quy cách 10g xem có hợp khẩu vị. Gợi ý mang tính tham khảo, không phải đánh giá hương vị sản phẩm.",product:"tram10"}
};
$$("[data-recipient]").forEach(b=>b.addEventListener("click",()=>{const key=b.dataset.recipient,m=messages[key],target=$("#gift-match");if(!m||!target)return;$$("[data-recipient]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));target.innerHTML="";const title=document.createElement("strong");title.textContent=m.title;const text=document.createElement("p");text.textContent=m.text;const pick=document.createElement("button");pick.type="button";pick.className="purchase-btn";pick.dataset.buy=m.product;pick.textContent="Chọn sản phẩm gợi ý ↗";target.append(title,text,pick)}));
form?.addEventListener("submit",async e=>{
e.preventDefault();
const status=$("#order-status"),submit=$("#order-submit");status.textContent="";status.classList.remove("error");
if(!form.reportValidity())return;
const d=new FormData(form);if(d.get("bot-field"))return;
const p=P.find(x=>x.id===d.get("product_id"));const q=Number(d.get("quantity"));
if(!p||!Number.isInteger(q)||q<1||q>99){status.textContent="Vui lòng chọn sản phẩm và số lượng từ 1 đến 99.";status.classList.add("error");return;}
const phone=String(d.get("phone")||"").trim().replace(/[\s.\-]/g,"");if(!/^(?:\+84|0)[0-9]{9,10}$/.test(phone)){status.textContent="Vui lòng kiểm tra số điện thoại liên hệ.";status.classList.add("error");return;}
if(!d.get("consent")){status.textContent="Vui lòng đồng ý chính sách xử lý thông tin để gửi yêu cầu.";status.classList.add("error");return;}
const isLive=location.hostname.endsWith(".netlify.app")||window.AGATEA_CONFIG?.formsEnabled===true;
const ref="AG-"+Date.now().toString(36).toUpperCase()+"-"+Math.random().toString(36).slice(2,6).toUpperCase();
const body=new URLSearchParams();
const entry={ "form-name":"agatea-orders","order_id":ref,"variant":String(document.body.dataset.theme||1),"source_page":String(document.body.dataset.page||"home"),"product_id":p.id,"product_name":option(p),"unit_price":String(p.price),"quantity":String(q),"subtotal":String(p.price*q),"customer_name":String(d.get("customer_name")||"").trim(),"phone":phone,"address":String(d.get("address")||"").trim(),"message":String(d.get("message")||"").trim(),"consent":"yes","bot-field":""};
Object.entries(entry).forEach(([k,v])=>body.append(k,v));submit.disabled=true;submit.textContent="Đang kiểm tra yêu cầu…";
try{
if(isLive){const prefix=document.body.dataset.root||"./";const result=await fetch(prefix+"forms.html",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:body.toString()});if(!result.ok)throw Error("Order HTTP "+result.status)}
sessionStorage.setItem("agatea-last-order",JSON.stringify({orderId:ref,product:option(p),quantity:q,subtotal:p.price*q,mode:isLive?"live":"demo"}));
const next=new URL((document.body.dataset.root||"./")+"cam-on.html",location.href);if(!isLive)next.searchParams.set("demo","1");location.assign(next.href)
}catch(err){status.textContent="Hệ thống chưa tiếp nhận được yêu cầu. Không có đơn nào được xác nhận. Bạn vui lòng thử lại sau.";status.classList.add("error");submit.disabled=false;submit.textContent="Gửi yêu cầu đặt hàng ↗"}
});
})();

/* Visual storytelling edition: different scenes for every AGATEA concept. */
(()=>{
"use strict";
const t=Number(document.body.dataset.theme||1);
const page=document.body.dataset.page||"home";
const media={
1:{hero:"photo-1724436494066-d481e94a9754",scene:"photo-1771520331563-bfe4db7a088c",story:"photo-1699273848585-f96162525a99",incense:"photo-1771030667074-285cf47a59c0",name:"Thư phòng với bàn trà gỗ và không gian truyền thống"},
2:{hero:"photo-1735964519674-440909118206",scene:"photo-1674255506074-3bb77cc925e5",story:"photo-1773394472792-a3a2f9a85d2e",incense:"photo-1777361988778-6e918aaa2e26",name:"Góc trà tĩnh tại với ánh sáng tự nhiên"},
3:{hero:"photo-1674255506074-3bb77cc925e5",scene:"photo-1724436494066-d481e94a9754",story:"photo-1674255506074-3bb77cc925e5",incense:"photo-1753016942254-2d60a6b9571f",name:"Bàn trà và khung cảnh gặp gỡ thân tình"},
4:{hero:"photo-1777387921168-c4d9349dabd0",scene:"photo-1674255506074-3bb77cc925e5",story:"photo-1773394472792-a3a2f9a85d2e",incense:"photo-1777361988778-6e918aaa2e26",name:"Bộ ấm chén và bàn trà trong không gian thưởng trà"},
5:{hero:"photo-1699273848585-f96162525a99",scene:"photo-1735964519674-440909118206",story:"photo-1724436494066-d481e94a9754",incense:"photo-1753016941673-b90b7d5937c7",name:"Chén trà, trang sách và ký ức về một cuộc gặp"}
};
const v=media[t];if(!v)return;
const url=(key,w)=>"https://images.unsplash.com/"+key+"?auto=format&fit=crop&w="+w+"&q=78";
function img(key,alt,priority=false){
const el=document.createElement("img");
el.src=url(key,priority?1800:1400);
el.alt=alt;el.width=priority?1800:1400;el.height=priority?1100:950;
el.decoding="async";el.loading=priority?"eager":"lazy";
if(priority)el.setAttribute("fetchpriority","high");
return el;
}
function figure(className,key,alt,caption){
const f=document.createElement("figure");f.className=className;
f.append(img(key,alt));
if(caption){const c=document.createElement("figcaption");c.textContent=caption;f.append(c)}
return f;
}
if(page==="home"){
const old=document.querySelector(".hero .art-block");
if(old){
const f=document.createElement("figure");f.className="lifestyle-hero";
const room=img(v.hero,v.name,true);room.className="lifestyle-room";f.append(room);
const shade=document.createElement("span");shade.className="lifestyle-shade";shade.setAttribute("aria-hidden","true");f.append(shade);
const pack=old.querySelector("img");
if(pack){const copy=pack.cloneNode(true);copy.className="lifestyle-pack";copy.loading="eager";copy.alt="Bao bì minh họa sản phẩm Trà Trầm Hương AGATEA";f.append(copy)}
const text=document.createElement("figcaption");text.textContent=["THƯ PHÒNG / AGATEA","THIỀN TRÀ / AGATEA","NẾP QUÀ / AGATEA","BỘ SƯU TẬP / AGATEA","AGATEA JOURNAL / SỐ 01"][t-1];f.append(text);
old.replaceWith(f);
}
const quote=document.querySelector(".home-scene .scene-quote");
if(quote){
const photo=figure("scene-photo",v.scene,"Không gian trà: "+v.name,quote.textContent.trim());
quote.replaceWith(photo);
}
}else{
const title=document.querySelector("main .page-title");
if(title){
const key=page==="story"?v.story:page==="gift"?v.hero:page==="collection"?v.scene:v.story;
const label={story:"CÂU CHUYỆN / KHÔNG GIAN TRÀ",collection:"GÓC TRÀ / CHỌN SẢN PHẨM",gift:"MỘT MÓN QUÀ / MỘT CUỘC GẶP",faq:"GIẢI ĐÁP / THƯỞNG TRÀ"}[page]||"AGATEA / THƯỞNG TRÀ";
title.after(figure("chapter-banner "+page+"-banner",key,"Không gian minh họa: "+v.name,label));
}
}
const chapter=document.querySelector(".chapter-side .incense-art");
if(chapter)chapter.replaceWith(figure("story-side-photo",v.scene,"Nếp thưởng trà, khung cảnh trang trí","MỘT GÓC PHÒNG TRÀ"));
const incense=document.querySelector(".incense-section .incense-art");
if(incense)incense.replaceWith(figure("incense-lifestyle",v.incense,"Làn hương trong không gian thưởng hương; không phải sản phẩm đang bán","HƯƠNG TRẦM / NÉT VĂN HÓA THƯỞNG HƯƠNG"));
})();
