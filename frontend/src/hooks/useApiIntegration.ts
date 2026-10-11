import { useSeriesStore } from "../stores/seriesStore";
import { useCharacterStore } from "../stores/characterStore";
import { useStoryStore } from "../stores/storyStore";
import { seriesApi } from "../api/series";
import { charactersApi } from "../api/characters";
import type { Series } from "../types/series";
import type { Character } from "../types/character";

let initialDataSyncInFlight: Promise<void> | null = null;
let hasSyncedInitialData = false;

export function resetInitialDataSync(): void {
  hasSyncedInitialData = false;
  initialDataSyncInFlight = null;
}

// Hook to manage API integration and sync with stores
export function useApiIntegration() {
  // Load initial data
  const loadInitialData = async () => {
    if (hasSyncedInitialData) {
      return;
    }

    if (initialDataSyncInFlight) {
      return initialDataSyncInFlight;
    }

    initialDataSyncInFlight = (async () => {
      try {
        // Load series data — use the store's own action so set() fires reactively
        await useSeriesStore.getState().fetchSeries();

        // Load characters data
        const charactersResponse = await charactersApi.getAll();
        if (charactersResponse.success && charactersResponse.data) {
          useCharacterStore.setState({
            characters: charactersResponse.data as unknown as Character[],
          });
        }

        // Load stories data — use the store's own action so set() fires reactively
        await useStoryStore.getState().fetchStories();

        hasSyncedInitialData = true;
      } catch (error) {
        console.warn("Failed to sync with backend:", error);
      } finally {
        initialDataSyncInFlight = null;
      }
    })();

    return initialDataSyncInFlight;
  };

  // Sync series to backend
  const syncSeriesToBackend = async (
    series: Partial<Series> & { id?: string },
  ) => {
    try {
      if (series.id && !series.id.includes("local-")) {
        // Update existing
        await seriesApi.update(series.id, series);
      } else {
        // Create new
        const response = await seriesApi.create(
          series as Omit<Series, "id" | "createdAt" | "updatedAt">,
        );
        if (response.success && response.data) {
          return response.data;
        }
      }
    } catch (error) {
      console.warn("Failed to sync series to backend:", error);
    }
    return null;
  };

  // Sync character to backend
  const syncCharacterToBackend = async (
    character: Partial<Character> & { id?: string },
  ) => {
    try {
      if (character.id && !character.id.includes("local-")) {
        // Update existing
        await charactersApi.update(character.id, character);
      } else {
        // Create new
        const response = await charactersApi.create(
          character as Omit<Character, "id" | "createdAt" | "updatedAt">,
        );
        if (response.success && response.data) {
          return response.data;
        }
      }
    } catch (error) {
      console.warn("Failed to sync character to backend:", error);
    }
    return null;
  };

  return {
    loadInitialData,
    syncSeriesToBackend,
    syncCharacterToBackend,
    isOnline: true, // Could be enhanced with actual network detection
  };
}

// Hook specifically for series operations with API integration
export function useSeriesWithApi() {
  const store = useSeriesStore();

  const createSeries = async (
    seriesData: Omit<Series, "id" | "createdAt" | "updatedAt">,
  ) => {
    return store.createSeries(seriesData);
  };

  const updateSeries = async (seriesId: string, updates: Partial<Series>) => {
    await store.updateSeries(seriesId, updates);
  };

  const deleteSeries = async (seriesId: string) => {
    await store.deleteSeries(seriesId);
  };

  return {
    ...store,
    createSeries,
    updateSeries,
    deleteSeries,
  };
}

// Hook specifically for character operations with API integration
export function useCharactersWithApi() {
  const store = useCharacterStore();

  const createCharacter = async (
    characterData: Omit<Character, "id" | "createdAt" | "updatedAt">,
  ) => {
    const response = await charactersApi.create(characterData);
    if (response.success && response.data) {
      store.createCharacter(response.data);
      return response.data;
    }
    throw new Error(response.error || "Failed to create character");
  };

  const updateCharacter = async (
    characterId: string,
    updates: Partial<Character>,
  ) => {
    const response = await charactersApi.update(characterId, updates);
    if (response.success && response.data) {
      store.updateCharacter(characterId, response.data);
      return;
    }
    throw new Error(response.error || "Failed to update character");
  };

  const levelUpCharacter = async (characterId: string) => {
    const response = await charactersApi.levelUp(characterId);
    if (response.success && response.data) {
      store.updateCharacter(characterId, response.data);
      return;
    }
    throw new Error(response.error || "Failed to level up character");
  };

  return {
    ...store,
    createCharacter,
    updateCharacter,
    levelUpCharacter,
  };
}
