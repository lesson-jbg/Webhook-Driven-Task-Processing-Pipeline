import { askOpenRouter } from './openRouterClient';

type Payload = {
  message?: string;
  [key: string]: unknown;
};

export async function aiSentimentAction(payload: Payload) {
  const message = typeof payload.message === 'string' ? payload.message : '';

  if (!message.trim()) {
    return {
      ...payload,
      sentiment: 'neutral',
      sentimentSource: 'fallback',
    };
  }

  const result = await askOpenRouter(
    'You are a sentiment classifier. Return only one lowercase word: positive, negative, or neutral.',
    message,
  );

  const lower = result.toLowerCase();

  let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';

  if (lower.includes('positive')) sentiment = 'positive';
  else if (lower.includes('negative')) sentiment = 'negative';
  else if (lower.includes('neutral')) sentiment = 'neutral';

  return {
    ...payload,
    sentiment,
    sentimentSource: 'arcee-ai/trinity-large-preview:free',
  };
}
