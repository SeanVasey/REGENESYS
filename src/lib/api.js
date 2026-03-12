const MAX_RETRIES = 5;
const DELAYS = [1000, 2000, 4000, 8000, 16000];

export function getTokenLimitParam(model, maxTokens) {
  if (model.startsWith("gpt-5")) {
    return { max_completion_tokens: maxTokens };
  }

  return { max_tokens: maxTokens };
}

export async function fetchWithRetry(url, options, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `HTTP Error ${response.status}`,
        );
      }
      return await response.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, DELAYS[i]));
    }
  }
}
