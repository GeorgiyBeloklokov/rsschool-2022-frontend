(()=>{"use strict";class e{constructor(){this.news=new class{draw(e){const t=e.length>=10?e.filter(((e,t)=>t<10)):e,s=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");if(o){t.forEach(((e,t)=>{var r;const n=o.content.cloneNode(!0);t%2&&(null===(r=n.querySelector(".news__item"))||void 0===r||r.classList.add("alt"));const c=n.querySelector(".news__meta-photo");c&&(c.style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`);const u=n.querySelector(".news__meta-author");u&&(u.textContent=e.author||e.source.name);const i=n.querySelector(".news__meta-date");i&&(i.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"));const l=n.querySelector(".news__description-title");l&&(l.textContent=e.title);const a=n.querySelector(".news__description-source");a&&(a.textContent=e.source.name);const d=n.querySelector(".news__description-content");d&&(d.textContent=e.description);const h=n.querySelector(".news__read-more a");h&&h.setAttribute("href",e.url),s.append(n)}));const e=document.querySelector(".news");e&&(e.innerHTML=""),null==e||e.appendChild(s)}}},this.sources=new class{draw(e){var t;const s=document.createDocumentFragment(),o=document.querySelector("#sourceItemTemp");o&&(e.forEach((e=>{var t;const r=null==o?void 0:o.content.cloneNode(!0),n=r.querySelector(".source__item-name");n&&(n.textContent=e.name),null===(t=r.querySelector(".source__item"))||void 0===t||t.setAttribute("data-source-id",e.id),s.append(r)})),null===(t=document.querySelector(".sources"))||void 0===t||t.append(s))}}}drawNews(e){const t=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(t)}drawSources(e){const t=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];this.sources.draw(t)}}(new class{constructor(){this.controller=new class extends class extends class{constructor(e,t){this.baseLink=e,this.options=t}getResp({endpoint:e,options:t={}},s){this.load("GET",e,s,t)}errorHandler(e){if(!e.ok)throw 401!==e.status&&404!==e.status||console.log(`Sorry, but there is ${e.status} error: ${e.statusText}`),Error(e.statusText);return console.log("res:",e),e}makeUrl(e,t){const s=Object.assign(Object.assign({},this.options),e);let o=`${this.baseLink}${t}?`;return Object.keys(s).forEach((e=>{o+=`${e}=${s[e]}&`})),o.slice(0,-1)}load(e,t,s,o={}){fetch(this.makeUrl(o,t),{method:e}).then(this.errorHandler).then((e=>e.json())).then((e=>s(e))).catch((e=>console.error(e)))}}{constructor(){super("https://nodenews.herokuapp.com/",{apiKey:"55cb6be843b74ce18532008211767630"})}}{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){let s=e.target;const o=e.currentTarget;for(;s!==o;){if(null==s?void 0:s.classList.contains("source__item")){const e=s.getAttribute("data-source-id");return void((null==o?void 0:o.getAttribute("data-source"))!==e&&(e&&o.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}s=s.parentNode}}},this.view=new e}start(){let e=document.querySelector(".sources");e&&(e.addEventListener("click",(e=>this.controller.getNews(e,(e=>this.view.drawNews(e))))),this.controller.getSources((e=>this.view.drawSources(e))))}}).start()})();