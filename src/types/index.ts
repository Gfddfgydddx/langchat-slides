// src/types/index.ts

export interface Slide {
  id: string
  title?: string
  content: string
  syntax: string
}

export interface GenerationRequest {
  prompt: string
  theme: string
  pageCount: number
}
