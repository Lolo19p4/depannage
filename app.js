const h=new Date().getHours(),NUIT=h<7||h>=20;
const S='⚠️ Moteur coupé, frein à main serré, gilet jaune et triangle si vous êtes sur la route. Sur autoroute : derrière la glissière et appelez l\'assistance.';
const G=[
{t:'🛞 Changer une roue',w:S+' Jamais sous la voiture quand elle est sur le cric.',s:['Garez-vous sur un sol plat et dur, hors de la circulation.','Sortez la roue de secours, le cric et la clé.','Desserrez les écrous d\'un demi-tour, roue encore au sol.','Placez le cric au point prévu (voir le manuel), levez la voiture.','Enlevez les écrous puis la roue.','Mettez la roue de secours, vissez les écrous à la main.','Redescendez la voiture, serrez les écrous en étoile, bien fort.','Vérifiez la pression et resserrez après 50 km. Une galette : 80 km/h max.']},
{t:'🔌 Changer un fusible',w:'⚠️ Contact coupé. Toujours le même ampérage (même couleur). Si le fusible regrille tout de suite : court-circuit, appelez un pro.',s:['Trouvez la boîte à fusibles (sous le volant, boîte à gants ou capot).','Regardez le schéma sur le couvercle ou dans le manuel.','Retirez le fusible avec la pince fournie.','Un fusible grillé a son fil coupé.','Mettez un fusible neuf de même valeur.','Rallumez et testez.']},
{t:'🔋 Batterie à plat',w:'⚠️ Pas d\'étincelle ni de flamme près de la batterie. Batterie gonflée ou qui fuit : ne pas brancher.',s:['Câbles : rouge sur + de la batterie à plat.','Rouge sur + de la batterie qui aide.','Noir sur − de la batterie qui aide.','Noir sur une partie métallique du moteur en panne (pas sur la batterie).','Démarrez la voiture qui aide, attendez 2 min, puis démarrez la vôtre.','Débranchez dans l\'ordre inverse. Roulez 30 min.','Booster : pince rouge sur +, noire sur −, allumez le booster, démarrez.']},
{t:'🚨 Voyants du tableau de bord',w:'🔴 Voyant ROUGE = arrêtez-vous dès que possible. 🟠 Orange = allez au garage vite.',s:['🔴 Huile (burette) : arrêtez le moteur tout de suite.','🔴 Température (thermomètre) : surchauffe, arrêt immédiat.','🔴 Batterie : la charge ne se fait plus, garage rapidement.','🔴 Frein (!) : niveau de liquide ou frein à main. Danger.','🟠 Moteur : défaut moteur ou pollution. Clignotant = arrêtez-vous.','🟠 Pression pneus (!) dans un fer à cheval : vérifiez les pneus.','🟠 ABS : les freins marchent mais sans ABS.','🟠 Préchauffage (spirale) clignotant : défaut diesel.']},
{t:'🛢️ Niveau d\'huile',w:'⚠️ Moteur froid ou arrêté depuis 10 min, voiture à plat. Attention aux parties chaudes.',s:['Ouvrez le capot, tirez la jauge (poignée jaune ou orange).','Essuyez-la, remettez-la à fond, ressortez-la.','L\'huile doit être entre MIN et MAX.','Si besoin, ajoutez un peu d\'huile (bon type, voir manuel) par le bouchon marqué d\'une burette.','Ne dépassez jamais MAX.']},
{t:'🎈 Pression des pneus',w:'⚠️ Mesurez pneus froids (moins de 3 km roulés).',s:['Lisez la bonne pression : étiquette porte conducteur ou trappe à carburant.','Allez à une station avec gonfleur.','Dévissez le bouchon de valve, branchez l\'embout.','Gonflez jusqu\'à la bonne valeur (en bar).','N\'oubliez pas la roue de secours.']},
{t:'💡 Ampoule de phare',w:'⚠️ Phares éteints et froids. Ne touchez pas le verre d\'une ampoule halogène avec les doigts.',s:['Notez le type d\'ampoule (H4, H7…) dans le manuel.','Ouvrez le capot, accédez à l\'arrière du phare.','Retirez le cache et débranchez la prise.','Défaites le ressort ou tournez l\'ampoule.','Mettez la neuve, rebranchez, testez.','Phares xénon/LED : garage (haute tension).']},
{t:'🌧️ Essuie-glaces',w:'⚠️ Tenez le bras : s\'il claque, il peut casser le pare-brise.',s:['Relevez le bras d\'essuie-glace.','Appuyez sur la petite languette et faites glisser le balai.','Clipsez le balai neuf de même longueur.','Reposez doucement le bras.']},
{t:'🩹 Pneu crevé (kit anti-crevaison)',w:'⚠️ Ne marche pas si le flanc est déchiré ou le trou trop gros. 80 km/h max ensuite.',s:['Laissez l\'objet planté dans le pneu.','Vissez le flacon sur la valve, branchez le compresseur à l\'allume-cigare.','Gonflez jusqu\'à la pression indiquée (moins de 10 min).','Roulez tout de suite 5 km pour répartir le produit.','Revérifiez la pression, puis allez chez un garagiste.']},
{t:'🔥 Surchauffe moteur',w:'⚠️ N\'ouvrez JAMAIS le bouchon du radiateur moteur chaud : brûlure grave.',s:['Mettez le chauffage à fond (ça refroidit le moteur).','Arrêtez-vous en sécurité, coupez le moteur.','Attendez au moins 30 minutes.','Moteur froid : vérifiez le liquide de refroidissement (bocal MIN/MAX).','Complétez si besoin. Si ça recommence : garage, ne roulez pas.']}];
const m=document.getElementById('m');
const PROMPT="Tu es Meca Pocket Chat, l'assistant mécanicien automobile de Station Technique (Brest, Loïc Martin). Slogan : « Chat à toute heure pour vous aider en cas de panne ! ». Présente-toi comme Meca Pocket Chat. Tu aides une personne qui n'est pas mécanicienne, au bord de la route ou chez elle.\nRègles :\n1. Sécurité d'abord : commence toujours par vérifier que la personne est en sécurité (moteur coupé, frein à main, gilet jaune, triangle, derrière la glissière sur autoroute). En cas de danger immédiat (fumée, feu, fuite d'essence, accident, blessé) : dis d'appeler le 112.\n2. Réponds TOUT DE SUITE avec l'étape 1 à faire, puis pose UNE seule question à la fois. Pas de longue introduction. Questions utiles (marque, modèle, année, voyants allumés, bruits, odeurs, ce qui s'est passé) avant de conclure. Demande une photo si ça aide.\n3. Guide pas à pas, une étape à la fois. Phrases très courtes (10 mots max), mots simples, en français. Maximum 4 lignes par réponse. Attends la réponse avant l'étape suivante.\n4. Donne les causes possibles de la plus probable à la moins probable, et ce qu'on peut faire soi-même sans outil spécial.\n5. Si c'est trop dangereux ou trop complexe (freins, direction, airbag, haute tension, levage sans cric adapté, voyant rouge huile/température), dis clairement de ne pas rouler et de contacter l'assistance de son assurance (numéro sur la carte verte) ou Station Technique : loicm7059@gmail.com.\n6. N'invente jamais : si tu n'es pas sûr, dis-le.\n\nVoici ma panne :\n";
const GEM_LINK='';// lien du Gem à mettre ici
function fullPrompt(){const d=(document.getElementById('d')||{}).value;return PROMPT+(d||'(pas encore décrite : demande-moi quel est mon problème)')}
async function copy(){try{await navigator.clipboard.writeText(fullPrompt());return true}catch(e){return false}}
let SENT=false,SIL=null,STARTED=false,LS=null,REC=null,TRK=null,ON=true,DIC='';
function say(t){try{const u=new SpeechSynthesisUtterance(t);u.lang='fr-FR';speechSynthesis.cancel();speechSynthesis.speak(u)}catch(e){}}
function ind(t){const i=document.getElementById('mic');if(i)i.textContent=t}
async function lamp(on){try{await TRK.applyConstraints({advanced:[{torch:on}]})}catch(e){if(on){const b=document.getElementById('blanc');b.style.display='flex'}else document.getElementById('blanc').style.display='none'}}
async function connect(){document.getElementById('tap').style.display='none';if(STARTED)return;STARTED=true;try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}catch(e){}
try{LS=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'},audio:true});const p=document.getElementById('prev');p.srcObject=LS;p.style.display='block';TRK=LS.getVideoTracks()[0];
let dark=NUIT;if(!dark){await new Promise(r=>setTimeout(r,800));const c=document.createElement('canvas');c.width=32;c.height=32;const x=c.getContext('2d');x.drawImage(p,0,0,32,32);const d=x.getImageData(0,0,32,32).data;let s=0;for(let i=0;i<d.length;i+=4)s+=d[i]+d[i+1]+d[i+2];dark=s/(d.length/4*3)<50}
if(dark)lamp(true);listen();say('Bonjour, je suis Meca Pocket Chat. Quel est votre problème ?');const q=document.getElementById('qq');if(q)q.style.display='block'}
catch(e){STARTED=false;document.getElementById('tap').style.display='flex'}}
function cmd(t){t=t.toLowerCase();
if(/éteins|eteins|éteindre/.test(t)){lamp(false);say('Lampe éteinte');return 1}
if(/lumière|lumiere|allume|lampe/.test(t)){lamp(true);say('Lampe allumée');return 1}
if(/(envoie|envoyer|demande).*(ia|i\.a|intelligence)|gemini/.test(t)){say('J\'envoie à Gemini');setTimeout(video,1200);return 1}
if(/chat ?gpt/.test(t)){say('J\'ouvre ChatGPT');setTimeout(gpt,1200);return 1}
if(/ferme/.test(t)){bye();return 1}
if(/aide|appelle/.test(t)){aide();say('Voici comment obtenir de l\'aide');return 1}return 0}
function listen(){if(REC)return;const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R){ind('🎤 micro indisponible');return}
REC=new R();REC.lang='fr-FR';REC.continuous=true;REC.interimResults=true;
REC.onresult=ev=>{clearTimeout(SIL);const r=ev.results[ev.results.length-1];if(!r.isFinal){SIL=setTimeout(auto,4000);return}
const t=r[0].transcript.trim();if(!t)return;if(!cmd(t)){DIC+=(DIC?' ':'')+t;const d=document.getElementById('d');if(d){d.style.display='block';d.value=DIC}SIL=setTimeout(auto,2500)}};
REC.onstart=()=>ind('🟢 🎤 J\'écoute');REC.onend=()=>{ind('⚪ 🎤');if(ON)setTimeout(()=>{try{REC.start()}catch(e){}},300)};try{REC.start()}catch(e){}}
function auto(){if(SENT||!DIC.trim())return;SENT=true;say('Je transmets à l\'IA');setTimeout(gpt,1500)}
function stopAll(){ON=false;try{REC&&REC.stop()}catch(e){}try{lamp(false)}catch(e){}LS&&LS.getTracks().forEach(t=>t.stop());LS=null}
function bye(){say('Au revoir, bonne route !');stopAll();m.innerHTML='<h2 style="text-align:center">👋 Au revoir, bonne route !</h2>';setTimeout(()=>{try{window.close()}catch(e){}},1500)}
function fullPrompt(){return PROMPT+(DIC||'(pas encore décrite : demande-moi quel est mon problème)')}
async function video(){await copy();stopAll();document.getElementById('st').style.display='block';setTimeout(()=>{location.href=GEM_LINK||'https://gemini.google.com/app'},1200)}
async function gpt(){await copy();stopAll();location.href='https://chatgpt.com/?q='+encodeURIComponent(fullPrompt())}
function home(){m.innerHTML=`<div id="mic" class="help" style="text-align:center">⚪ 🎤</div><h1 id="qq" style="display:none;text-align:center;font-size:40px;line-height:1.2;color:var(--g);text-shadow:0 0 14px rgba(57,255,20,.5);margin:10px 0">Quel est votre problème ?</h1>
<video id="prev" playsinline autoplay muted></video>
<textarea id="d" rows="3" style="display:none;margin-top:10px" oninput="DIC=this.value"></textarea>
<div id="st" class="help" style="display:none;color:var(--g)">✅ Message copié ! Gemini s'ouvre…</div>
<p class="help" style="text-align:center">Parlez, j'envoie tout seul à l'IA. Dites aussi : « lumière » · « éteins la lampe » · « Gemini » · « aide » · « ferme l'appli »</p>

<div class="links"><button onclick="video()">🤖 Envoyer à l'IA</button><button onclick="aide()">🆘</button><button onclick="guides()">📘</button></div>
<div id="tap" onclick="connect()" style="position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(13,15,13,.85);color:var(--g);font-size:28px;font-weight:700;text-align:center;z-index:8;text-shadow:0 0 12px #39ff14">👆 Touche l'écran une fois<br>pour tout démarrer</div>`;
if(STARTED){const p=document.getElementById('prev');if(LS){p.srcObject=LS;p.style.display='block'}const d=document.getElementById('d');if(DIC){d.style.display='block';d.value=DIC}ind(REC?'🟢 🎤 J\'écoute':'⚪ 🎤');return}
setTimeout(async()=>{let ok=false;try{const q=await Promise.all(['camera','microphone'].map(n=>navigator.permissions.query({name:n})));ok=q.every(x=>x.state==='granted')}catch(e){}
if(ok)connect();else document.getElementById('tap').style.display='flex'},300)}
function guides(){m.innerHTML=`<button class="big" onclick="home()">⬅ Retour</button><h2>Guides</h2><input id="q" placeholder="🔍 Chercher (roue, batterie…)" oninput="list(this.value)"><div id="l"></div>`;list('')}
function list(q){q=q.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');document.getElementById('l').innerHTML=G.map((g,i)=>[g,i]).filter(([g])=>(g.t+g.s.join(' ')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(q)).map(([g,i])=>`<button class="big" onclick="guide(${i})">${g.t}</button>`).join('')||'<p>Rien trouvé.</p>'}
function guide(i){const g=G[i];m.innerHTML=`<button class="big g" onclick="home()">⬅ Retour</button><h2>${g.t}</h2><div class="warn">${g.w}</div><ol>${g.s.map(x=>`<li>${x}</li>`).join('')}</ol><button class="big" onclick="aide()">🆘 Besoin d'aide ?</button>`;scrollTo(0,0)}
function aide(){const sub=encodeURIComponent('Meca Pocket Chat – demande d\'aide'),body=encodeURIComponent('Bonjour Station Technique,\n\nMa voiture (marque, modèle, année) :\nLe problème :\nOù je suis :\nMon téléphone :\n\n(Je joins une photo)');
m.innerHTML=`<button class="big g" onclick="home()">⬅ Retour</button><h2>🆘 Appelez un pro si :</h2><ul><li>Vous êtes sur l'autoroute ou en danger</li><li>Fumée, odeur de brûlé, fuite d'essence</li><li>Voyant rouge allumé</li><li>Freins ou direction qui ne répondent plus</li><li>Vous n'avez pas les outils ou vous doutez</li></ul>
<a class="big" style="border-color:#dc2626;color:#ff8080" href="tel:112">📞 Urgence : 112</a>
<p><b>Assistance de votre assurance :</b> le numéro est sur votre carte verte ou votre contrat. Sur autoroute, utilisez les bornes orange (tous les 2 km).</p>
<a class="big" href="mailto:loicm7059@gmail.com?subject=${sub}&body=${body}">✉️ Demander l'aide de Station Technique</a>
<p>📸 Prenez d'abord une photo du problème (bouton Caméra), puis ajoutez-la au mail avec le trombone 📎.</p><p style="font-size:16px">Meca Pocket Chat par Station Technique – Loïc Martin – RCS Brest 525 036 570</p>`;scrollTo(0,0)}
let st,on=false;const C=document.getElementById('cam'),V=document.getElementById('v');
async function cam(){try{st=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});V.srcObject=st;C.style.display='flex'}catch(e){alert('Caméra non disponible. Autorisez la caméra dans le navigateur.')}}
function stop(){st&&st.getTracks().forEach(t=>t.stop());st=null;on=false;C.style.display='none'}
document.getElementById('cc').onclick=stop;
document.getElementById('lt').onclick=async()=>{try{on=!on;await st.getVideoTracks()[0].applyConstraints({advanced:[{torch:on}]})}catch(e){document.getElementById('blanc').style.display='flex'}};
document.getElementById('snap').onclick=()=>{const c=document.createElement('canvas');c.width=V.videoWidth;c.height=V.videoHeight;c.getContext('2d').drawImage(V,0,0);const u=c.toDataURL('image/jpeg',.9);stop();
m.innerHTML=`<button class="big g" onclick="home()">⬅ Retour</button><img id="photo" src="${u}"><a class="big" download="panne.jpg" href="${u}">💾 Enregistrer la photo</a><button class="big" onclick="aide()">🆘 Envoyer à Station Technique</button>`};
async function torch(){try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});const t=s.getVideoTracks()[0];
if(!(t.getCapabilities&&t.getCapabilities().torch))throw 0;await t.applyConstraints({advanced:[{torch:true}]});
const b=document.getElementById('blanc');b.style.background='#000';b.style.color='#fff';b.textContent='🔦 Lampe allumée – touchez pour éteindre';b.style.display='flex';
b.onclick=()=>{t.stop();b.style.display='none';b.style.background='#fff';b.style.color='#000';b.onclick=()=>b.style.display='none'}}
catch(e){const b=document.getElementById('blanc');b.textContent='Touchez l\'écran pour éteindre';b.style.display='flex'}}
home();if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
