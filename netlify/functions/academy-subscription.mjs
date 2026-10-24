import { createHash, createHmac, randomBytes } from 'node:crypto';

export const CONSENT = 'Yes, send me the Monday academy briefings, including occasional information about FMHA training and tools.';
const SITE = 'https://assets.thefmha.com';
const BASE = SITE + '/academy-nd-briefings/';
const message = 'Please check your inbox and confirm your subscription.';
const json = (body, status=200) => Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const env = key => globalThis.Netlify?.env?.get(key) || process.env[key];
const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const hash = s => createHash('sha256').update(s).digest('hex');
export function settings(){return {key:env('ACADEMY_RESEND_API_KEY'),url:env('ACADEMY_SHEETS_WEBAPP_URL'),secret:env('ACADEMY_SHEETS_BRIDGE_SECRET'),enabled:env('ACADEMY_SIGNUP_ENABLED')==='true'}}
export function configured(c){return Boolean(c.key&&c.secret?.length>=32&&/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(c.url||''))}
export async function bridge(c,payload,timeout=20000){
 const body=JSON.stringify({...payload,timestamp:Date.now()});
 const signature=createHmac('sha256',c.secret).update(body).digest('hex');
 const r=await fetch(c.url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({body,signature}),redirect:'follow',signal:AbortSignal.timeout(timeout)});
 if(!r.ok)throw Error('Sheet connection failed');
 const data=await r.json();if(!data.ok)throw Error('Sheet operation failed');return data;
}
export function confirmationEmail({firstName,token}){
 const link=BASE+'confirm/#token='+encodeURIComponent(token);
 const name=firstName?' '+firstName:'';
 const text=`Hi${name},\n\nPlease confirm that you would like the Monday Academy Neurodiversity Briefings from the Football Mental Health Alliance. They include research, practical ideas and occasional information about FMHA training and tools.\n\nConfirm your subscription:\n${link}\n\nThe link expires in 24 hours. On the page, press Confirm subscription to finish. If you did not request this, ignore this email and you will not be added.\n\nCheers\nDanny\n\nFootball Mental Health Alliance\nhttps://dannymatharu.com/\n03330 500 399\nQuestions: support@withinu.net`;
 const html=`<!DOCTYPE html><html lang="en-GB"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>Confirm your academy briefings</title></head><body style="margin:0;background-color:#070b16;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#f4f7fb"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="#070b16" style="padding-top:35px;padding-right:18px;padding-bottom:35px;padding-left:18px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px"><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#ff5757;padding-bottom:20px">FMHA / ACADEMY BRIEFINGS</td></tr><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:1.15;font-weight:bold;color:#f4f7fb;padding-bottom:24px">One click on the page.<br>Your next academy briefing.</td></tr><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;color:#d8e0ec;padding-bottom:25px">Hi${escape(name)},<br><br>Please confirm you would like our Monday academy neurodiversity briefings, including research, practical ideas and occasional information about FMHA training and tools.</td></tr><tr><td style="padding-bottom:25px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td bgcolor="#ff5757" style="background-color:#ff5757;border-radius:25px"><a href="${escape(link)}" style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;font-weight:bold;color:#070b16;text-decoration:none;padding-top:15px;padding-right:25px;padding-bottom:15px;padding-left:25px">Confirm your subscription →</a></td></tr></table></td></tr><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#a8b2c4;padding-bottom:25px">The link expires in 24 hours. On the page, press Confirm subscription to finish. If you did not request this, ignore the email and you will not be added.<br><br>If the button does not work, copy this link:<br><a href="${escape(link)}" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#ffabab;word-break:break-all">${escape(link)}</a></td></tr><tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#d8e0ec">Cheers<br>Danny<br><br>Football Mental Health Alliance<br><a href="https://dannymatharu.com/" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#d8e0ec">dannymatharu.com</a><br>03330 500 399<br><a href="mailto:support@withinu.net" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#d8e0ec">support@withinu.net</a></td></tr></table></td></tr></table></body></html>`;
 return {text,html};
}
export async function handle(request){
 const c=settings();
 if(request.method==='GET'){let healthy=false;if(configured(c)){try{healthy=(await bridge(c,{action:'health'})).ok===true}catch{}}const state={enabled:healthy&&c.enabled,configured:healthy};if(new URL(request.url).searchParams.get('check')==='1')state.checks={sendingKeyPresent:Boolean(c.key),bridgeSecretPresent:Boolean(c.secret&&c.secret.length>=32),bridgeURLValid:/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(c.url||''),activationEnabled:c.enabled,bridgeReachable:healthy};return json(state)}
 if(request.method!=='POST')return json({message:'Method not allowed.'},405);
 const origin=request.headers.get('origin');if(origin&&origin!==SITE)return json({message:'Please use the subscription form on our website.'},403);
 if(!configured(c)||!c.enabled)return json({message:'Subscriptions are not open yet. Please try again later.'},503);
 if(Number(request.headers.get('content-length')||0)>4096)return json({message:'Please shorten your details.'},413);
 let p;try{const raw=await request.text();if(raw.length>4096)return json({message:'Please shorten your details.'},413);p=JSON.parse(raw)}catch{return json({message:'Please check your details and try again.'},400)}
 try{
  if(p.action==='confirm'){
   if(typeof p.token!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(p.token))return json({message:'This confirmation link is invalid.'},400);
   const result=await bridge(c,{action:'confirm',tokenHash:hash(p.token)});
   if(!result.confirmed)return json({message:'This link has expired or is no longer valid. Please subscribe again for a new link.'},400);
   return json({confirmed:true,message:'You are subscribed. Look out for the next Monday academy briefing.'});
  }
  if(p.website)return json({message});
  const email=String(p.email||'').trim().toLowerCase();const firstName=String(p.firstName||'').trim();const academy=String(p.academy||'').trim();
  if(email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||firstName.length>80||academy.length>160||p.consent!=='yes')return json({message:'Please enter a valid email and tick the subscription box.'},400);
  let source=BASE;try{const u=new URL(p.source);if(u.origin===SITE&&u.pathname.startsWith('/academy-nd-briefings/'))source=u.origin+u.pathname}catch{}
  const token=randomBytes(32).toString('base64url');const tokenHash=hash(token);
  const result=await bridge(c,{action:'start',email,firstName,academy,source,consent:CONSENT,tokenHash,expiresAt:new Date(Date.now()+86400000).toISOString()});
  if(!result.send)return json({message});
  const emailContent=confirmationEmail({firstName,token});
  let id;
  try{
   const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':'Bearer '+c.key,'Content-Type':'application/json','Idempotency-Key':'academy-confirm/'+result.id+'/'+tokenHash},body:JSON.stringify({from:'Danny at FMHA <danny@withinu.net>',reply_to:'support@withinu.net',to:[email],subject:'Confirm your academy neurodiversity briefings',...emailContent}),signal:AbortSignal.timeout(15000)});
   const data=await sent.json();if(!sent.ok||!data.id)throw Error('Confirmation send failed');id=data.id;
  }catch{
   // The send may be uncertain: retain the reserved token rather than risk
   // invalidating a message that Resend accepted. A later signup can retry.
   return json({message:'We could not confirm that the email was sent. Please wait a minute and try again.'},502);
  }
  await bridge(c,{action:'sent',id:result.id,tokenHash,messageId:id});
  return json({message});
 }catch{return json({message:'We could not complete your request. Please try again shortly.'},502)}
}
export default handle;
export const config={path:'/api/academy-briefings/subscription',rateLimit:{action:'rate_limit',aggregateBy:'ip',windowSize:60,windowLimit:15}};
