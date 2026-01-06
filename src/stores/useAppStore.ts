import {defineStore} from 'pinia'
import {computed, ref, shallowRef} from 'vue'
import {useDark, useStorage, useToggle} from '@vueuse/core'
import {type Slide} from '@/types'
import {Infographic} from '@antv/infographic'

export const useAppStore = defineStore('app-store', () => {
  // --- UI State ---
  // Load default locale from environment variable
  const defaultLocale = (import.meta.env.VITE_DEFAULT_LOCALE || 'zh') as 'zh' | 'en'
  const locale = useStorage<'zh' | 'en'>('langchat-slides-locale', defaultLocale)

  // Defaults to Dark Mode
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    initialValue: 'light',
  })
  const toggleDark = useToggle(isDark)

  // --- API State ---
  // Load defaults from environment variables
  const defaultApiKey = import.meta.env.VITE_OPENAI_API_KEY
  const defaultBaseUrl = import.meta.env.VITE_OPENAI_BASE_URL
  const defaultModel = import.meta.env.VITE_OPENAI_MODEL

  const apiKey = useStorage('langchat-slides-apikey-v1', defaultApiKey)
  const baseUrl = useStorage('langchat-slides-baseurl-v1', defaultBaseUrl)
  const model = useStorage('langchat-slides-model-v1', defaultModel)

  // --- Functional State ---
  const slides = ref<Slide[]>([])
  const currentSlideIndex = ref(0)
  const isStreaming = ref(false)
  const slideRenderMode = ref<'replace' | 'append'>('replace')
  const inputPrompt = ref('')
  const exportRequest = ref<{ format: 'png' | 'svg' | 'pdf' } | null>(null)

  // Canvas State
  const canvasScale = ref(1.0)

  // Store the Infographic instance
  const infographic = shallowRef<Infographic | null>(null)

  // --- Theme/Style State ---
  const currentTheme = useStorage<'default' | 'dark'>('langchat-slides-theme-v2', 'default')
  const currentPalette = useStorage<string>('langchat-slides-palette-v2', 'default')
  const sketchStyle = useStorage<boolean>('langchat-slides-sketch-v2', false)
  const customPalette = useStorage<string[]>('langchat-slides-custom-palette-v2', ['#3b82f6', '#8b5cf6', '#f97316'])

  // Predefined palettes
  const palettes = [
    { name: 'default', colors: ['#5B8FF9', '#5AD8A6', '#5D7092', '#F6BD16', '#E8684A', '#6DC8EC'] },
    { name: 'warm', colors: ['#FF6B6B', '#FFA06B', '#FFD93D', '#FF8E72', '#FF6B9D', '#FFB6C1'] },
    { name: 'cool', colors: ['#4ECDC4', '#44A08D', '#093637', '#11998e', '#38ef7d', '#0F3443'] },
    { name: 'pastel', colors: ['#FFB5BA', '#B5DEFF', '#97F9F9', '#D9F99D', '#FEC8D8', '#E2F0CB'] },
    { name: 'neon', colors: ['#FF00FF', '#00FFFF', '#FF1493', '#7FFF00', '#FF4500', '#9400D3'] },
    { name: 'business', colors: ['#1E40AF', '#7C3AED', '#059669', '#D97706', '#DC2626', '#4B5563'] },
    { name: 'nature', colors: ['#166534', '#15803D', '#22C55E', '#84CC16', '#65A30D', '#4D7C0F'] },
    { name: 'sunset', colors: ['#C2410C', '#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FFEDD5'] },
  ]

  const currentSlide = computed(() => slides.value[currentSlideIndex.value] || null)

  const isConfigured = () => {
    return !!apiKey.value && apiKey.value.trim().length > 0
  }

  function setSlides(newSlides: Slide[]) {
    slides.value = newSlides
  }

  function appendSlides(newSlides: Slide[]) {
    slides.value = [...slides.value, ...newSlides]
  }

  function clearSlides() {
    slides.value = []
    currentSlideIndex.value = 0
  }

  function toggleLocale() {
    locale.value = locale.value === 'zh' ? 'en' : 'zh'
  }

  function toggleTheme() {
    console.log('🔄 Toggling theme from', currentTheme.value)
    currentTheme.value = currentTheme.value === 'default' ? 'dark' : 'default'
    console.log('✅ Theme toggled to', currentTheme.value)
  }

  function toggleSketchStyle() {
    console.log('🔄 Toggling sketch style from', sketchStyle.value)
    sketchStyle.value = !sketchStyle.value
    console.log('✅ Sketch style toggled to', sketchStyle.value)
  }

  function updatePalette(palette: string) {
    console.log('🔄 Updating palette from', currentPalette.value, 'to', palette)
    currentPalette.value = palette
    console.log('✅ Palette updated to', currentPalette.value)
  }

  function updateCustomPalette(colors: string[]) {
    customPalette.value = colors
  }

  function toggleSlideRenderMode() {
    slideRenderMode.value = slideRenderMode.value === 'replace' ? 'append' : 'replace'
  }

  function updateSlideSyntax(slideIndex: number, syntax: string) {
    const slide = slides.value[slideIndex]
    if (slide) {
      slide.syntax = syntax
      slide.content = syntax
    }
  }

  function addEmptySlide() {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      content: 'infographic list-row-simple-horizontal-arrow\ndata\n  title 新幻灯片\n  desc 幻灯片描述\n  items\n    - label 项目 1\n      desc 描述 1\n      icon mdi/web',
      syntax: 'infographic list-row-simple-horizontal-arrow\ndata\n  title 新幻灯片\n  desc 幻灯片描述\n  items\n    - label 项目 1\n      desc 描述 1\n      icon mdi/web'
    }
    
    // 追加模式
    slides.value = [...slides.value, newSlide]
    
    // 激活新添加的幻灯片
    currentSlideIndex.value = slides.value.length - 1
  }

  function triggerExport(format: 'png' | 'svg' | 'pdf') {
    exportRequest.value = { format }
  }

  function zoomIn() {
    if (canvasScale.value < 2.5) {
      canvasScale.value = Number((canvasScale.value + 0.1).toFixed(1))
    }
  }

  function zoomOut() {
    if (canvasScale.value > 0.5) {
      canvasScale.value = Number((canvasScale.value - 0.1).toFixed(1))
    }
  }

  function resetZoom() {
    canvasScale.value = 1.0
  }

  return {
    locale,
    isDark,
    toggleDark,
    toggleLocale,
    currentTheme,
    currentPalette,
    sketchStyle,
    customPalette,
    toggleTheme,
    toggleSketchStyle,
    updatePalette,
    updateCustomPalette,
    apiKey,
    baseUrl,
    model,
    isConfigured,
    slides,
    currentSlideIndex,
    isStreaming,
    inputPrompt,
    exportRequest,
    triggerExport,
    currentSlide,
    infographic,
    setSlides,
    appendSlides,
    clearSlides,
    addEmptySlide,
    slideRenderMode,
    toggleSlideRenderMode,
    updateSlideSyntax,
    palettes,
    canvasScale,
    zoomIn,
    zoomOut,
    resetZoom
  }
})
