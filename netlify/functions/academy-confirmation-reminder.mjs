import {settings, configured, bridge, confirmationEmail} from './academy-subscription.mjs';

export function reminderEmail({firstName,token}) {
 const content=confirmationEmail({firstName,token});
 const intro='Just one more step to receive your Monday academy briefings. You asked to subscribe but haven’t confirmed yet. This is your only reminder.';
 return {
  text:content.text.replace('Please confirm that you would like the Monday Academy Neurodiversity Briefings from the Football Mental Health Alliance. They include research, practical ideas and occasional information about FMHA training and tools.',intro).replace('The link expires in 24 hours.','This fresh link expires in 24 hours.'),
  html:content.html.replace('One click on the page.<br>Your next academy briefing.','Your academy briefings.<br>One step left.').replace('Please confirm you would like our Monday academy neurodiversity briefings, including research, practical ideas and occasional information about FMHA training and tools.',intro).replace('The link expires in 24 hours.','This fresh link expires in 24 hours.')
 };
}

export default async function runReminder() {
 const c=settings();
 if(!configured(c)||!c.enabled)return Response.json({sent:0,disabled:true});
 // One leased candidate per run keeps all work inside the scheduled 30s limit.
 // Retried sends reuse exactly the same token, email and Resend idempotency key.
 const candidate=await bridge(c,{action:'reminderClaim'},8000);
 if(!candidate.send)return Response.json({sent:0});
 const {id,email,firstName,token,tokenHash}=candidate;
 if(!id||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email)||!/^[A-Za-z0-9_-]{43}$/.test(token)||!/^[a-f0-9]{64}$/.test(tokenHash))throw Error('Invalid reminder reservation');
 const result=await fetch('https://api.resend.com/emails',{
  method:'POST',headers:{Authorization:'Bearer '+c.key,'Content-Type':'application/json','Idempotency-Key':'academy-reminder/'+id+'/'+tokenHash},
  body:JSON.stringify({from:'Danny at FMHA <danny@withinu.net>',reply_to:'support@withinu.net',to:[email],subject:'One more step: confirm your academy briefings',...reminderEmail({firstName,token})}),signal:AbortSignal.timeout(8000)
 });
 const sent=await result.json();if(!result.ok||!sent.id)throw Error('Reminder send failed');
 await bridge(c,{action:'reminderSent',id,tokenHash,messageId:sent.id},8000);
 return Response.json({sent:1});
}

// UTC, every ten minutes. Eligible only after the first email is 24 hours old.
export const config={schedule:'*/10 * * * *'};
