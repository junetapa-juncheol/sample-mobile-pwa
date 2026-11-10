export const STORAGE_KEY='one-step-demo-v1';
export function localDate(date=new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}
export function seedVisits(today=new Date()) {
  return [2,4,6,9,11,13,16].map(offset=>{const date=new Date(today);date.setDate(date.getDate()-offset);return localDate(date);});
}
export function isDate(value) {
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date=new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.getTime()) && localDate(date)===value;
}
export function loadVisits(storage,today=new Date()) {
  try {const saved=JSON.parse(storage.getItem(STORAGE_KEY));if(Array.isArray(saved)&&saved.every(isDate)) return [...new Set(saved)].sort();} catch { /* Start with a fictional record. */ }
  return seedVisits(today);
}
export function checkIn(visits,date=localDate()) {
  if(!isDate(date)) throw new Error('올바른 날짜가 필요합니다.');
  return [...new Set([...visits,date])].sort();
}
export function monthlyVisits(visits,date=new Date()) {return visits.filter(value=>value.startsWith(localDate(date).slice(0,7))).length;}
export function weekDays(date=new Date()) {
  const monday=new Date(date);monday.setDate(date.getDate()-((date.getDay()+6)%7));
  return Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(monday.getDate()+i);return {date:localDate(d),day:d.getDate(),label:['월','화','수','목','금','토','일'][i]};});
}
export function saveVisits(storage,visits) {
  try{storage.setItem(STORAGE_KEY,JSON.stringify(visits));return true;}catch{return false;}
}
