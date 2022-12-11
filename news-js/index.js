(()=>{"use strict";class e{constructor(){this.news=new class{draw(e){const t=e.length>=10?e.filter(((e,t)=>t<10)):e,s=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");if(r){t.forEach(((e,t)=>{var o;const n=r.content.cloneNode(!0);t%2&&(null===(o=n.querySelector(".news__item"))||void 0===o||o.classList.add("alt"));const c=n.querySelector(".news__meta-photo");c&&(c.style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`);const i=n.querySelector(".news__meta-author");i&&(i.textContent=e.author||e.source.name);const u=n.querySelector(".news__meta-date");u&&(u.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"));const l=n.querySelector(".news__description-title");l&&(l.textContent=e.title);const a=n.querySelector(".news__description-source");a&&(a.textContent=e.source.name);const d=n.querySelector(".news__description-content");d&&(d.textContent=e.description);const h=n.querySelector(".news__read-more a");h&&h.setAttribute("href",e.url),s.append(n)}));const e=document.querySelector(".news");e&&(e.innerHTML=""),null==e||e.appendChild(s)}}},this.sources=new class{draw(e){var t;const s=document.createDocumentFragment(),r=document.querySelector("#sourceItemTemp");r&&(e.forEach((e=>{var t;const o=null==r?void 0:r.content.cloneNode(!0),n=o.querySelector(".source__item-name");n&&(n.textContent=e.name),null===(t=o.querySelector(".source__item"))||void 0===t||t.setAttribute("data-source-id",e.id),s.append(o)})),null===(t=document.querySelector(".sources"))||void 0===t||t.append(s))}}}drawNews(e){const t=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(t)}drawSources(e){const t=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];this.sources.draw(t)}}(new class{constructor(){this.controller=new class extends class extends class{constructor(e,t){this.baseLink=e,this.options=t}getResp({endpoint:e,options:t={}},s){this.load("GET",e,s,t)}errorHandler(e){if(!e.ok)throw 401!==e.status&&404!==e.status||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return console.log("res:",e),e}makeUrl(e,t){const s=Object.assign(Object.assign({},this.options),e);let r=`${this.baseLink}${t}?`;return Object.keys(s).forEach((e=>{r+=`${e}=${s[e]}&`})),r.slice(0,-1)}load(e,t,s,r={}){fetch(this.makeUrl(r,t),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>s(e))).catch((e=>console.error(e)))}}{constructor(){super("https://newsapi.org/v2/",{apiKey:"55cb6be843b74ce18532008211767630"})}}{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){let s=e.target;const r=e.currentTarget;for(;s!==r;){if(null==s?void 0:s.classList.contains("source__item")){const e=s.getAttribute("data-source-id");return void((null==r?void 0:r.getAttribute("data-source"))!==e&&(e&&r.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}s=s.parentNode}}},this.view=new e}start(){let e=document.querySelector(".sources");e&&(e.addEventListener("click",(e=>this.controller.getNews(e,(e=>this.view.drawNews(e))))),this.controller.getSources((e=>this.view.drawSources(e))))}}).start()})();