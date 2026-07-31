(function(){
var K='You are the Frutex Bot, a helpful assistant for Frutex beverages (Est. 1994). Answer using ONLY the info below. Be concise.\n\nPRODUCTS:\n- Golden Eagle: Flagship energy drink. Flavours page (golden-eagle.html) has 6 variants: Classic (160mg caffeine, citrus & honey), Red Edition (150mg, cherry & pomegranate), Zero Sugar Edition (160mg, 5 cal), Tropical Edition (140mg, mango & pineapple), Zero Caffeine Edition (0mg, blue raspberry & mint), Coffee Edition (200mg, cold brew & vanilla). Golden Eagle is the most famous.\n- Relax: Caffeine-free herbal drinks. 6 flavours: Mango, Apple, Blueberry, Ice Tea, Lemonade, Multi Red. Page: relax.html\n- Natural: Pure fruit juice with spring water. 6 flavours: Blueberry, Apple, Carrot, Sour Cherry, Strawberry, Pear. Page: natural.html\n- Zeros: Zero sugar, zero caffeine. 1 flavour: Original. Page: zeros.html\n\nGAME:\n- Frutex Game (rush.html): Parkour runner. Pick a drink to collect. 3 levels (50/100/200 score). Space=Jump(x2), Down=Crouch. Collect cans for money. Enemy eagle avoids you on level 1, attacks on higher levels. When level completes, shows redemption code and cash earned ($100-$500 per can). Game finishes after Level 3.\n\nWEBSITE PAGES:\n- index.html: Homepage with hero, about, products, world map (20 countries), values, footer\n- golden-eagle.html: Golden Eagle flavours\n- natural.html: Natural flavours\n- relax.html: Relax flavours\n- zeros.html: Zeros flavour\n- login.html: Supabase login/signup\n- rush.html: Frutex Game\n\nCOMPANY:\nFounded 1994. Est. 1994. Light theme (#f7f5f0 background, gold #c8963e accents). World map shows 20 countries where Golden Eagle is sold.';

var s=document.createElement('style');
s.textContent='.fx-btn{position:fixed;bottom:24px;right:24px;z-index:9999;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#c8963e,#a07828);border:none;cursor:pointer;box-shadow:0 4px 16px rgba(200,150,62,.4);font-size:22px;transition:.3s;display:flex;align-items:center;justify-content:center}.fx-btn:hover{transform:scale(1.1)}.fx-bx{position:fixed;bottom:88px;right:24px;z-index:9999;width:350px;max-height:460px;background:#fff;border-radius:16px;box-shadow:0 8px 40px rgba(0,0,0,.15);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui}.fx-bx.opn{display:flex}.fx-hd{background:linear-gradient(135deg,#c8963e,#a07828);color:#fff;padding:12px 16px;font-weight:700;font-size:.85rem}.fx-bd{flex:1;overflow-y:auto;padding:12px;max-height:340px;display:flex;flex-direction:column;gap:8px}.fx-bd .m{max-width:88%;padding:9px 13px;border-radius:14px;font-size:.8rem;line-height:1.5;word-wrap:break-word}.fx-bd .m.b{background:#f5f3ee;color:#1a1a1a;align-self:flex-start;border-bottom-left-radius:4px}.fx-bd .m.u{background:#c8963e;color:#fff;align-self:flex-end;border-bottom-right-radius:4px}.fx-bd .m .ld{display:inline-block;width:6px;height:6px;border-radius:50%;background:#999;margin:0 2px;animation:fx-b .7s infinite ease-in-out both}.fx-bd .m .ld:nth-child(1){animation-delay:-0.16s}.fx-bd .m .ld:nth-child(2){animation-delay:-0.08s}@keyframes fx-b{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}.fx-in{display:flex;border-top:1px solid #eee;padding:8px;gap:6px}.fx-in input{flex:1;border:none;outline:none;padding:8px;font-size:.8rem;font-family:Inter;min-width:0}.fx-in button{background:#c8963e;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600;font-size:.78rem}.fx-in button:disabled{opacity:.5}';
document.head.appendChild(s);

var h='<button class="fx-btn" id="fxBtn">💬</button>';
h+='<div class="fx-bx" id="fxBx"><div class="fx-hd">🥤 Frutex AI</div><div class="fx-bd" id="fxBd"></div><div class="fx-in"><input id="fxInp" placeholder="Ask about Frutex..." onkeypress="if(event.key===\'Enter\')window.fxSend()"><button id="fxSB" onclick="window.fxSend()">Send</button></div></div>';
var d=document.createElement('div');d.innerHTML=h;document.body.appendChild(d);

var AK='';var C=[{role:'system',content:K}];var W=false;var ready=false;

// Load API key before allowing chat
fetch('apikey.txt').then(function(r){return r.text()}).then(function(k){
  AK=k.trim();ready=true;
  console.log('Frutex Bot: API key loaded');
}).catch(function(){
  fxM('b','⚠️ Could not load API key. Make sure apikey.txt exists.');
});

document.getElementById('fxBtn').onclick=function(){
  var b=document.getElementById('fxBx');b.classList.toggle('opn');
  if(b.classList.contains('opn')&&C.length===1)fxM('b','Hi! Ask me anything about Frutex — our drinks, flavours, game, or history! 🥤');
};

function fxM(r,t){
  var bd=document.getElementById('fxBd'),dv=document.createElement('div');
  dv.className='m '+r;dv.innerHTML=t;bd.appendChild(dv);bd.scrollTop=bd.scrollHeight;return dv;
}

window.fxSend=function(){
  var inp=document.getElementById('fxInp'),t=inp.value.trim();
  if(!t||W)return;
  if(!ready){fxM('b','⏳ Loading... please wait a moment and try again.');return}
  inp.value='';inp.disabled=true;document.getElementById('fxSB').disabled=true;
  var ld=fxM('u','<span class="ld"></span><span class="ld"></span><span class="ld"></span>');W=true;
  C.push({role:'user',content:t});
  fetch('https://openrouter.ai/api/v1/chat/completions',{
    method:'POST',
    headers:{'Authorization':'Bearer '+AK,'Content-Type':'application/json','HTTP-Referer':'https://frutex.com','X-Title':'Frutex Bot'},
    body:JSON.stringify({model:'openai/gpt-3.5-turbo',messages:C.slice(-8)})
  }).then(function(r){return r.json()}).then(function(j){
    var rep=j.choices?j.choices[0].message.content:('API error: '+(j.error?j.error.message:'unknown'));
    C.push({role:'assistant',content:rep});
    var bd=document.getElementById('fxBd');if(ld.parentNode)bd.removeChild(ld);
    fxM('b',rep.replace(/\n/g,'<br>'));
    W=false;inp.disabled=false;document.getElementById('fxSB').disabled=false;inp.focus();
  }).catch(function(e){
    var bd=document.getElementById('fxBd');if(ld.parentNode)bd.removeChild(ld);
    fxM('b','⚠️ Network error. Check your connection.<br><small>'+e.message+'</small>');
    W=false;inp.disabled=false;document.getElementById('fxSB').disabled=false;
  });
};
})();
