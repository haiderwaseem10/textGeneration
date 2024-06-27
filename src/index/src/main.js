import { HfInference } from '@huggingface/inference';

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res }) => {
  if (!req.body.prompt || typeof req.body.prompt !== 'string') {
    return res.json({
        ok: false,
        error: 'Missing required field `prompt`'
    }, 400);
  }


  const hf = new HfInference('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');

  try {
      const completion = await hf.textGeneration({
          model: 'mistralai/Mistral-7B-Instruct-v0.2',
          inputs: req.body.prompt,
          max_new_tokens: req.body.max_new_tokens || 200,
      });
      return res.json({ ok: true, completion }, 200);
  } catch (err) {
      return res.json({ ok: false, error: 'Failed to query model.' }, 500);
  }
}

