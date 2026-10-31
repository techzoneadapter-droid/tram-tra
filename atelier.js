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
parent:{title:"Một món quà dành cho cha mẹ",text:"Mong những ngày sau này, mỗi lần pha trà đều có một phút thảnh thơi. Gợi ý: Hương Sen 120g – hộp quà tặng.",product:"sen120"},
partner:{title:"Một lời cảm ơn đối tác",text:"Cảm ơn những lần đồng hành và những cuộc trao đổi chân thành. Gợi ý: Trầm trà 120g – hộp quà tặng.",product:"tram120"},
friend:{title:"Một lời hẹn cùng bạn cũ",text:"Lúc nào rảnh, ngồi xuống uống một chén trà nhé. Gợi ý: Hương Sen 100g – hộp hít nam châm.",product:"sen100"},
self:{title:"Dành một chén cho chính mình",text:"Bắt đầu từ hộp giấy nhỏ để khám phá hương trà, không cần vội. Gợi ý: Trầm trà 10g – hộp giấy.",product:"tram10"}
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