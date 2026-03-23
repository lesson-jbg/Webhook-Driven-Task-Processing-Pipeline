import { askOpenRouter } from './openRouterClient';

type Payload = {
  message?: string;
  [key: string]: unknown;
};

export async function summarizeTextAction(payload: Payload) {
  const message = typeof payload.message === 'string' ? payload.message : '';

  if (!message.trim()) {
    return {
      ...payload,
      summary: '',
      summarySource: 'fallback',
    };
  }

  const summary = await askOpenRouter(
    "Summarize the user's text in one short sentence. Return only the summary.",
    message,
  );

  return {
    ...payload,
    summary,
    summarySource: 'arcee-ai/trinity-large-preview:free',
  };
}
