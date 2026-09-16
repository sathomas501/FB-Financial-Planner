const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');
const id='cs_live_abcdefghijklmnop';
const payload={transaction_id:id,value:99,currency:'USD',items:[{item_id:'prod_pro',price:99,quantity:1}]};
async function page(search,response={verified:true,purchase:payload},ok=true){
 let load,calls=[],fetches=0;
 const window={location:{search},addEventListener:(_,fn)=>load=fn,FatboyAnalytics:{trackPurchaseComplete:p=>calls.push(p)}};
 vm.runInNewContext(fs.readFileSync('assets/js/verified-purchase.js','utf8'),{window,URLSearchParams,console,fetch:async()=>{fetches++;return {ok,json:async()=>response};}});
 await load();return {calls,fetches};
}
test('no session, fake ID and test IDs cannot create purchases',async()=>{for(const search of ['', '?session_id=made-up','?session_id=cs_test_abcdefghijklmnop']){const r=await page(search);assert.equal(r.calls.length,0);assert.equal(r.fetches,0);}});
test('unverified, mismatched and failed responses do not record purchases',async()=>{for(const result of [{verified:false},{verified:true,purchase:{...payload,transaction_id:'other'}}])assert.equal((await page('?session_id='+id,result)).calls.length,0);assert.equal((await page('?session_id='+id,{},false)).calls.length,0);});
test('verified response preserves actual amount',async()=>assert.equal((await page('?session_id='+id)).calls[0].value,99));
function tracker(storage,ready=true){
 const source=fs.readFileSync('assets/js/ga4-events.js','utf8');const a=source.indexOf('    const pendingPurchases');const b=source.indexOf('    function trackScrollDepth',a);const calls=[];
 const context={window:{localStorage:storage,gtag:(...args)=>calls.push(args)},Set,Number,Date,sanitizeObject:x=>x,safeJsonParse:x=>x?JSON.parse(x):null,PURCHASE_DEDUPE_KEY:'test',ensureGA4Ready:async()=>ready,buildEventParams:x=>x,setUserProperties:()=>{}};
 vm.runInNewContext(source.slice(a,b)+';this.track=trackPurchaseComplete;',context);return {track:context.track,calls};
}
test('concurrent calls and later page visits record one purchase',async()=>{const data={};const storage={getItem:k=>data[k],setItem:(k,v)=>data[k]=v};const t=tracker(storage);await Promise.all([t.track(payload),t.track(payload)]);assert.equal(t.calls.length,1);assert.equal(t.calls[0][1],'purchase');const next=tracker(storage);await next.track(payload);assert.equal(next.calls.length,0);});
test('blocked storage still sends stable ID and missing analytics does not mark sent',async()=>{const storage={getItem(){throw Error();},setItem(){throw Error();}};const t=tracker(storage);await t.track(payload);assert.equal(t.calls[0][2].transaction_id,id);const notReady=tracker(storage,false);assert.equal(await notReady.track(payload),false);assert.equal(notReady.calls.length,0);});
