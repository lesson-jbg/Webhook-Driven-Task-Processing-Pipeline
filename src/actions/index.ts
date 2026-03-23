import { aiSentimentAction } from "./aiSentimentAction";
import { summarizeTextAction } from "./summarizeTextAction";
import { extractKeywordsAction } from "./extractKeywordsAction";

type Payload = {
  message?: string;
  [key: string]: unknown;
};

export async function runAction(actionType: string, payload: Payload) {
  switch (actionType) {
    case "ai_sentiment":
      return aiSentimentAction(payload);
    case "summarize_text":
      return summarizeTextAction(payload);
    case "extract_keywords":
      return extractKeywordsAction(payload);
    default:
      throw new Error(`Unsupported action type: ${actionType}`);
  }
}