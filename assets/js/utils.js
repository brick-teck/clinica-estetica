window.Lumiere = window.Lumiere || {};
window.Lumiere.utils = (() => {
const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const filterItems = (items,{category=''}={}) => items.filter(item => !category || item.category===category);
function whatsappURL(phone,message) {
 const number=String(phone || '').replace(/\D/g,'');
 if(!/^55[1-9]\d\d{8,9}$/.test(number)) return null;
 return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
const safeURL = value => { try { const u = new URL(value); return /^https?:$/.test(u.protocol) ? u.href : null; } catch { return null; } };
function mapEmbedURL(value) {
 const url=safeURL(value); if(!url)return null;
 const parsed=new URL(url);
 return parsed.protocol==='https:' && ['www.google.com','maps.google.com','www.google.com.br'].includes(parsed.hostname) && parsed.pathname.startsWith('/maps/embed') ? parsed.href : null;
}
return { normalize,escapeHTML,filterItems,whatsappURL,safeURL,mapEmbedURL };
})();
