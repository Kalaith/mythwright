import { apiClient, ApiResponse } from "./client";
import type { Book, PlotThread, CharacterArc } from "../types/series";

export const booksApi = {
  // Book Management
  getBySeriesId: (seriesId: string): Promise<ApiResponse<Book[]>> =>
    apiClient.get(`/series/${seriesId}/books`),

  getById: (id: string): Promise<ApiResponse<Book>> =>
    apiClient.get(`/books/${id}`),

  create: (
    seriesId: string,
    bookData: Omit<Book, "id" | "seriesId" | "createdAt" | "updatedAt">,
  ): Promise<ApiResponse<Book>> =>
    apiClient.post(`/series/${seriesId}/books`, toApiPayload(bookData)),

  update: (id: string, updates: Partial<Book>): Promise<ApiResponse<Book>> =>
    apiClient.put(`/books/${id}`, toApiPayload(updates)),

  delete: (id: string): Promise<ApiResponse<void>> =>
    apiClient.delete(`/books/${id}`),

  reorder: (
    seriesId: string,
    bookIds: string[],
  ): Promise<ApiResponse<Book[]>> =>
    apiClient.put(`/series/${seriesId}/books/reorder`, { bookIds }),

  // Plot Threads
  getPlotThreads: (bookId: string): Promise<ApiResponse<PlotThread[]>> =>
    apiClient.get(`/books/${bookId}/plot-threads`),

  addPlotThread: (
    bookId: string,
    thread: Omit<PlotThread, "id">,
  ): Promise<ApiResponse<Book>> =>
    apiClient.post(`/books/${bookId}/plot-threads`, thread),

  updatePlotThread: (
    threadId: string,
    updates: Partial<PlotThread>,
  ): Promise<ApiResponse<Book>> =>
    apiClient.put(`/plot-threads/${threadId}`, updates),

  deletePlotThread: (threadId: string): Promise<ApiResponse<Book>> =>
    apiClient.delete(`/plot-threads/${threadId}`),

  // Character Arcs
  getCharacterArcs: (bookId: string): Promise<ApiResponse<CharacterArc[]>> =>
    apiClient.get(`/books/${bookId}/character-arcs`),

  addCharacterArc: (
    bookId: string,
    arc: Omit<CharacterArc, "id">,
  ): Promise<ApiResponse<Book>> =>
    apiClient.post(`/books/${bookId}/character-arcs`, arc),

  updateCharacterArc: (
    arcId: string,
    updates: Partial<CharacterArc>,
  ): Promise<ApiResponse<Book>> =>
    apiClient.put(`/character-arcs/${arcId}`, updates),

  deleteCharacterArc: (arcId: string): Promise<ApiResponse<Book>> =>
    apiClient.delete(`/character-arcs/${arcId}`),
};

function toApiPayload(book: Partial<Book>): Record<string, unknown> {
  const payload: Record<string, unknown> = {};

  if (book.title !== undefined) payload.title = book.title;
  if (book.bookNumber !== undefined) payload.book_number = book.bookNumber;
  if (book.status !== undefined) payload.status = book.status;
  if (book.targetWordCount !== undefined) payload.target_word_count = book.targetWordCount;
  if (book.currentWordCount !== undefined) payload.current_word_count = book.currentWordCount;
  if (book.characterArcs !== undefined) payload.character_arcs = book.characterArcs;
  if (book.plotThreads !== undefined) payload.plot_threads = book.plotThreads;
  if (book.timelineEvents !== undefined) payload.timeline_events = book.timelineEvents;

  return payload;
}
