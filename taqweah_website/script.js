
const WA1='971582511933', WA2='971508375240';
function wa(n,msg){window.open(`https://wa.me/${n}?text=${encodeURIComponent(msg)}`,'_blank')}
function studentWhatsApp(num){wa(num===1?WA1:WA2,'Hello, I would like to register as a student at Taqweah.')}
function teacherWhatsApp(num){wa(num===1?WA1:WA2,'Hello, I would like to apply as a teacher at Taqweah.')}
function saveLead(type){const form=document.querySelector(`[data-form="${type}"]`);const data=Object.fromEntries(new FormData(form).entries());const leads=JSON.parse(localStorage.getItem('taqweah_leads')||'[]');leads.push({...data,type,createdAt:new Date().toISOString()});localStorage.setItem('taqweah_leads',JSON.stringify(leads));alert('Saved in this prototype. Real version will save to Supabase.')}
function fakeLogin(role){location.href=role+'-dashboard.html'}
function loadAdminLeads(){const el=document.getElementById('leadsTable');if(!el)return;const leads=JSON.parse(localStorage.getItem('taqweah_leads')||'[]');el.innerHTML=leads.length?leads.map(l=>`<tr><td>${l.type||'-'}</td><td>${l.name||'-'}</td><td>${l.phone||'-'}</td><td>${l.subject||l.service||'-'}</td></tr>`).join(''):`<tr><td colspan="4">No leads saved yet.</td></tr>`}loadAdminLeads();
