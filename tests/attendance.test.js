import {describe,it,expect} from 'vitest';
import {localDate,seedVisits,loadVisits,checkIn,monthlyVisits,weekDays,saveVisits,STORAGE_KEY,isDate} from '../src/attendance';
const today=new Date(2026,10,10,0,5);
describe('fictional attendance',()=>{
 it('uses local calendar date',()=>expect(localDate(today)).toBe('2026-11-10'));
 it('seeds seven unique past days without today',()=>{const visits=seedVisits(today);expect(visits).toHaveLength(7);expect(visits).not.toContain(localDate(today));expect(new Set(visits).size).toBe(7);});
 it('checks in only once per date',()=>expect(checkIn(checkIn([],localDate(today)),localDate(today))).toEqual(['2026-11-10']));
 it('counts the correct month',()=>expect(monthlyVisits(['2026-10-31','2026-11-01','2026-11-10'],today)).toBe(2));
 it('creates Monday through Sunday across a year boundary',()=>{const days=weekDays(new Date(2027,0,1));expect(days[0].date).toBe('2026-12-28');expect(days[6].date).toBe('2027-01-03');});
 it('recovers from corrupt or blocked storage',()=>{expect(loadVisits({getItem:()=>'{bad'},today)).toEqual(seedVisits(today));expect(loadVisits({getItem:()=>{throw Error();}},today)).toEqual(seedVisits(today));});
 it('deduplicates stored dates',()=>expect(loadVisits({getItem:()=>JSON.stringify(['2026-11-10','2026-11-10'])},today)).toEqual(['2026-11-10']));
 it('rejects impossible dates and polluted storage',()=>{expect(isDate('2026-02-30')).toBe(false);expect(()=>checkIn([],'bad')).toThrow();expect(loadVisits({getItem:()=>JSON.stringify(['oops'])},today)).toEqual(seedVisits(today));});
 it('persists visits and reports a full quota',()=>{const storage={setItem:(key,value)=>{expect(key).toBe(STORAGE_KEY);expect(JSON.parse(value)).toEqual(['2026-11-10']);}};expect(saveVisits(storage,['2026-11-10'])).toBe(true);expect(saveVisits({setItem:()=>{throw Error();}},[])).toBe(false);});
});
