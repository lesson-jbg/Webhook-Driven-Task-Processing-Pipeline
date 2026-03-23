import { askOpenRouter } from './openRouterClient';

type Payload = {
  message?: string;
  [key: string]: unknown;
};

export async function extractKeywordsAction(payload: Payload) {
  const message = typeof payload.message === 'string' ? payload.message : '';

  if (!message.trim()) {
    return {
      ...payload,
      keywords: [],
      keywordsSource: 'fallback',
    };
  }

  const result = await askOpenRouter(
    'Extract 5 important keywords from the text. Return only a comma-separated list with no explanation.',
    message,
  );

  const keywords = result
    .split(',')
    .map((word: string) => word.trim())
    .filter(Boolean)
    .slice(0, 5);

  return {
    ...payload,
    keywords,
    keywordsSource: 'arcee-ai/trinity-large-preview:free',
  };
}
