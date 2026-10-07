const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const key='bsNutritionProfileV2';
let profile=JSON.parse(localStorage.getItem(key)||'null');
let active='route';

function read(){return{
 firstName:$('#firstName').value,age:+$('#age').value,height:+$('#height').value,weight:+$('#weight').value,
 waist:+$('#waist').value||null,goal:$('input[name=goal]:checked').value,activity:$('#activity').value,
 training:+$('#training').value,meals:+$('#meals').value,weeks:+$('#weeks').value,budget:$('#budget').value,
 prep:$('#prep').value,style:$('#style').value,freeMeal:+$('#freeMeal').value,likes:$('#likes').value,
 avoid:$('#avoid').value,medical:$('#medical').value
}}
function save(){localStorage.setItem(key,JSON.stringify(profile))}
function goalText(){return{cut:'Réduction de masse grasse',recomp:'Recomposition corporelle',muscle:'Développement musculaire',maintain:'Maintien'}[profile.goal]}
function render(){
 $('#welcome').textContent=`Bonjour ${profile.firstName} 👋`;
 $('#stats').innerHTML=`<div class="stat"><b>${profile.weeks}</b><span>semaines de suivi</span></div><div class="stat"><b>${profile.training}</b><span>entraînements / semaine</span></div><div class="stat"><b>${profile.meals}</b><span>prises alimentaires prévues</span></div><div class="stat"><b>${profile.weight} kg</b><span>poids de départ</span></div>`;
 tabs();content()
}
function tabs(){$$('.tab').forEach(b=>{b.classList.toggle('active',b.dataset.tab===active);b.onclick=()=>{active=b.dataset.tab;tabs();content()}})}
function content(){
 let html='';
 if(active==='route') html=`<div class="contentGrid">
 <div class="panel"><h2>Ta feuille de route</h2><div class="muted">Programme de ${profile.weeks} semaines • objectif : ${goalText()}</div>
 <div class="legalBadge">COACHING & ÉDUCATION ALIMENTAIRE</div>
 <div class="weekbar">${Array.from({length:Math.min(profile.weeks,12)},(_,i)=>`<div class="day ${i===0?'on':''}">S${i+1}</div>`).join('')}</div>
 <div class="routeItem"><div class="num">1</div><div><b>Construire de bonnes habitudes</b><span class="muted">Repas structurés, alimentation variée, hydratation régulière et place adaptée aux entraînements.</span></div></div>
 <div class="routeItem"><div class="num">2</div><div><b>Prioriser la qualité alimentaire</b><span class="muted">Fruits et légumes, sources de protéines, féculents, matières grasses et aliments plaisir dans une organisation réaliste.</span></div></div>
 <div class="routeItem"><div class="num">3</div><div><b>Suivre tes sensations</b><span class="muted">Observe énergie, faim, sommeil, récupération et performances plutôt qu'une seule donnée isolée.</span></div></div>
 <div class="routeItem"><div class="num">4</div><div><b>Faire le point avec ton coach</b><span class="muted">Les adaptations de ton accompagnement sont décidées avec ton coach. En cas de problème médical ou besoin diététique spécifique, consulte un professionnel qualifié.</span></div></div>
 </div>
 <div class="panel"><h2>Repères personnalisables</h2><div class="macro"><div><strong>${profile.meals}</strong><span class="muted">prises / jour</span></div><div><strong>${profile.training}</strong><span class="muted">séances / semaine</span></div><div><strong>${profile.freeMeal}</strong><span class="muted">repas libre / semaine</span></div></div><hr style="border:0;border-top:1px solid #262626;margin:18px 0"><span class="muted">Ces repères servent à organiser ton coaching. L'application ne réalise pas de bilan diététique et ne prescrit pas de quantités nutritionnelles personnalisées.</span></div></div>`;
 else if(active==='mealsPlan') html=`<div class="panel"><h2>Planning repas du coach</h2><p class="muted">Exemple de structure alimentaire et idées de repas. Les portions, adaptations et éventuelles exclusions sont à définir dans ton accompagnement avec ton coach ou un professionnel qualifié.</p><div class="legalBadge">IDÉES DE REPAS • PAS UNE PRESCRIPTION DIÉTÉTIQUE</div>${mealPlan()}</div>`;
 else if(active==='checkin') html=`<div class="contentGrid"><div class="panel"><h2>Check-in hebdomadaire</h2><div class="check"><label>Poids<input id="ciWeight" type="number" step="0.1" value="${profile.weight}"></label><label>Tour de taille<input id="ciWaist" type="number" step="0.1" value="${profile.waist||''}"></label><label>Énergie /10<input id="energy" type="number" min="1" max="10"></label><label>Faim /10<input id="hunger" type="number" min="1" max="10"></label><label>Sommeil /10<input id="sleep" type="number" min="1" max="10"></label><label>Adhérence /10<input id="adherence" type="number" min="1" max="10"></label></div><label style="margin-top:12px">Comment tu te sens ?<textarea id="note"></textarea></label><button class="primary" id="saveCheck">ENREGISTRER LE CHECK-IN</button><p class="notice">Le check-in sert au suivi du coaching. Il ne constitue pas un diagnostic médical ou un bilan diététique.</p></div><div class="panel"><h2>Quand demander un avis professionnel ?</h2><p class="muted">Si tu as une maladie, un traitement, une grossesse, des allergies importantes, un trouble du comportement alimentaire ou toute situation nécessitant une prise en charge nutritionnelle, demande l'avis d'un médecin ou d'un diététicien.</p></div></div>`;
 else html=`<div class="panel"><h2>Mon profil</h2><div class="grid"><div class="muted"><b>Nom</b><br>${profile.firstName}</div><div class="muted"><b>Objectif</b><br>${goalText()}</div><div class="muted"><b>Taille / poids</b><br>${profile.height} cm • ${profile.weight} kg</div><div class="muted"><b>Style</b><br>${profile.style}</div><div class="muted"><b>Préférences</b><br>${profile.likes||'—'}</div><div class="muted"><b>À éviter</b><br>${profile.avoid||'—'}</div></div><hr style="border:0;border-top:1px solid #262626;margin:18px 0"><span class="muted">Les données sont stockées uniquement sur cet appareil dans cette version. Évite d'y saisir des informations médicales détaillées si elles ne sont pas nécessaires.</span></div>`;
 $('#tabContent').innerHTML=html;
 if($('#saveCheck'))$('#saveCheck').onclick=()=>{profile.weight=+$('#ciWeight').value||profile.weight;profile.waist=+$('#ciWaist').value||profile.waist;save();alert('Check-in enregistré sur cet appareil.');render()}
}
function mealPlan(){const days=['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];const base=[['Petit-déjeuner','Œufs + pain complet + fruit'],['Déjeuner','Poulet + riz + légumes + huile d’olive'],['Collation','Fromage blanc ou alternative + fruit'],['Dîner','Poisson + pommes de terre ou riz + légumes']];return days.map((d,i)=>`<div class="meal"><div class="mealHead"><b>${d}</b><span class="tag">Semaine type</span></div>${base.slice(0,profile.meals).map((m,j)=>`<div class="food"><b>${m[0]} :</b> ${variant(m[1],i+j)}</div>`).join('')}</div>`).join('')}
function variant(x,n){const v=[['Poulet + riz + légumes + huile d’olive','Saumon + pommes de terre + légumes','Bœuf maigre + semoule + légumes'],['Œufs + pain complet + fruit','Yaourt nature + flocons d’avoine + banane','Omelette + pain complet + kiwi']];if(x.startsWith('Œufs'))return v[1][n%3];if(x.startsWith('Poulet'))return v[0][n%3];return x}
$('#profileForm').onsubmit=e=>{e.preventDefault();profile=read();save();$('#onboarding').classList.remove('active');$('#dashboard').classList.add('active');render();scrollTo(0,0)};
$('#edit').onclick=()=>{$('#dashboard').classList.remove('active');$('#onboarding').classList.add('active');Object.entries(profile).forEach(([k,v])=>{const el=$('#'+k);if(el)el.value=v});const r=$(`input[name=goal][value="${profile.goal}"]`);if(r)r.checked=true;scrollTo(0,0)};
$('#reset').onclick=()=>{if(confirm('Effacer le profil et recommencer ?')){localStorage.removeItem(key);localStorage.removeItem('bsNutritionProfile');location.reload()}};
if(profile){$('#onboarding').classList.remove('active');$('#dashboard').classList.add('active');render()}
