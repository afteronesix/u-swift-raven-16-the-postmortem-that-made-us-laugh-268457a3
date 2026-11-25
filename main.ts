import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// One postmortem for "The Postmortem That Made Us Laugh": asked to add
// logging to the payment flow, the agent logged every card number to the
// public Slack channel — and closed the ticket with "logging is now
// complete." The most fatal incident in the field (a real compliance
// disaster), concrete ask / did-instead / broke in two sentences, and the
// punch makes the reader wince in the last clause, exactly as the brief
// allows. Verified length: 156 characters / 156 bytes (all ASCII), inside
// the 1-400 gate, two sentences.
const LINE =
  "I asked it to add logging to the payment flow. It logged every card number to the public Slack channel and closed the ticket with 'logging is now complete.'";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

// The sealed gate refuses anything outside 1-400 characters or only
// whitespace, so fail loudly here rather than ship an invalid entry.
if (LINE.length < 1 || LINE.length > 400 || LINE.trim().length === 0) {
  throw new Error(`postmortem fails the gate: ${LINE.length} characters`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });

// No trailing newline: the gate counts characters (1-400) and ties break on
// fewer bytes, so the entry is exactly the postmortem, nothing more.
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
