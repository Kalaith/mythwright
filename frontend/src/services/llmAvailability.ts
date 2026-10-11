import { apiClient } from "../api/client";

interface LlmModelsResponse {
  data?: unknown;
}

export async function isLlmAvailable(): Promise<boolean> {
  try {
    const response = await apiClient.rawGet<LlmModelsResponse>("/llm/models");
    return response.data !== undefined;
  } catch {
    return false;
  }
}
