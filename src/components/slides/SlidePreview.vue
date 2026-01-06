<script lang="ts" setup>
import {nextTick, onMounted, onUnmounted, ref, watch} from 'vue'
import {Infographic} from '@antv/infographic'
import {useI18n} from '@/composables/useI18n'
import {useAppStore} from '@/stores/useAppStore'
import jsPDF from 'jspdf'
import PptxGenJS from 'pptxgenjs'

const props = defineProps<{
  syntax: string
  id: string
}>()

const { t } = useI18n()
const store = useAppStore()

const containerId = `slide-container-${props.id}`
let resizeObserver: ResizeObserver | null = null

const wrapperRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const scale = ref(1)
const renderError = ref<string | null>(null)
const isInitializing = ref(false)

// Watch for infographic to update title from rendered options
watch(
  () => store.infographic,
  async (infographic) => {
    if (!infographic || !store.currentSlide || store.currentSlide.id !== props.id) return
    
    // Wait a bit for rendering to complete
    await nextTick()
    
    try {
      const options = infographic.getOptions()
      if (options?.data?.title && store.slides[store.currentSlideIndex]) {
        // Only update if title is different
        if (store.slides[store.currentSlideIndex].title !== options.data.title) {
          store.slides[store.currentSlideIndex].title = options.data.title
          console.log(`SlidePreview: Updated title for slide ${props.id}:`, options.data.title)
        }
      }
    } catch (e) {
      console.warn('Failed to get options for title update:', e)
    }
  },
  { immediate: true, deep: true }
)

// Watch for export requests
watch(() => store.exportRequest, async (request) => {
  // Only process if we have an infographic and the request is active
  if (!request || !store.infographic) return
  
  // We need to verify if this is the ACTIVE slide, but typically SlidePreview is only mounted for the active one (in SlidesCanvas)
  // Or we check if store.currentSlide.id matches props.id
  if (store.currentSlide?.id !== props.id) return

  try {
    const { format } = request
    const filename = `slide-${props.id}.${format}`
    
    if (format === 'svg') {
      const dataUrl = await store.infographic.toDataURL({ type: 'svg', embedResources: true })
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()
    } else if (format === 'png') {
      const dataUrl = await store.infographic.toDataURL({ type: 'png' })
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      link.click()
    } else if (format === 'pdf') {
      const dataUrl = await store.infographic.toDataURL({ type: 'png' })
      const img = new Image()
      img.src = dataUrl
      await new Promise(resolve => img.onload = resolve)
      
      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (img.height * pdfWidth) / img.width
      
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`slide-${props.id}.pdf`)
    } else if (format === 'pptx') {
      const dataUrl = await store.infographic.toDataURL({ type: 'png' })
      const img = new Image()
      img.src = dataUrl
      await new Promise(resolve => img.onload = resolve)
      
      const pptx = new PptxGenJS()
      pptx.layout = 'LAYOUT_16x9'
      
      const slide = pptx.addSlide()
      slide.addImage({
        data: dataUrl,
        x: 0,
        y: 0,
        w: '100%',
        h: '100%'
      })
      
      await pptx.writeFile({ fileName: filename })
    }
  } catch (e) {
    console.error('Export failed:', e)
  } finally {
    // Reset request to allow subsequent exports
    store.exportRequest = null
  }
})

// Standard 16:9 Slide Resolution
const BASE_WIDTH = 1280
const BASE_HEIGHT = 720

function renderInfographic(newSyntax: string) {
  // Clear previous error when attempting to render
  renderError.value = null

  if (!store.infographic) {
    console.warn(`⚠️ SlidePreview: Cannot render - infographic not initialized`)
    renderError.value = 'initError'
    return
  }

  if (!newSyntax || newSyntax.trim().length === 0) {
    console.warn(`⚠️ SlidePreview: Empty syntax`)
    return
  }

  try {
    // Render with original syntax (don't modify it)
    store.infographic.render(newSyntax)
    
    // Apply theme and palette using infographic.update() API
    const updateConfig: any = {}
    
    if (store.currentTheme === 'dark') {
      updateConfig.theme = 'dark'
    }
    
    if (store.sketchStyle) {
      updateConfig.theme = updateConfig.theme ? `${updateConfig.theme} hand-drawn` : 'hand-drawn'
    }
    
    // Apply palette if not default
    if (store.currentPalette !== 'default') {
      if (store.currentPalette === 'custom') {
        updateConfig.palette = store.customPalette
      } else {
        const p = store.palettes.find(p => p.name === store.currentPalette)
        if (p) {
          updateConfig.palette = p.colors
        }
      }
    }
    
    // Only call update if there are changes
    if (Object.keys(updateConfig).length > 0) {
      store.infographic.update(updateConfig)
      console.log('Applied theme config:', updateConfig)
    }

    // Update title in store from rendered options
    const options = store.infographic.getOptions()

    // Only update if we have a valid title and it's different
    if (options?.data?.title && store.currentSlide) {
      store.slides[store.currentSlideIndex]!.title = options.data.title
      console.log('✅ Rendered successfully, title:', options.data.title)
    } else {
      console.log('⚠️ Rendered but no title found in options')
    }
  } catch (e) {
    console.error('❌ Failed to render infographic:', e)
    renderError.value = 'renderError'
  }
}

// Remove debounce and render immediately for smooth streaming
watch(() => props.syntax, (newSyntax) => {
  renderInfographic(newSyntax)
}, { immediate: true })

function updateScale() {
  if (!wrapperRef.value) return
  
  const { clientWidth: parentW, clientHeight: parentH } = wrapperRef.value
  // Add some padding (e.g. 60px total for safety)
  const availableW = Math.max(0, parentW - 60)
  const availableH = Math.max(0, parentH - 60)
  
  const scaleW = availableW / BASE_WIDTH
  const scaleH = availableH / BASE_HEIGHT
  
  // Fit contain
  scale.value = Math.min(scaleW, scaleH)
}

onMounted(() => {
  initInfographic()

  // Initial scale
  updateScale()

  if (wrapperRef.value) {
    resizeObserver = new ResizeObserver(() => {
      updateScale()
    })
    resizeObserver.observe(wrapperRef.value)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (store.infographic) {
    store.infographic.destroy()
    store.infographic = null
  }
})

function initInfographic() {
  isInitializing.value = true
  renderError.value = null

  const container = document.getElementById(containerId)
  if (!container) {
    console.warn(`⚠️ SlidePreview: Container not found - ${containerId}`)
    renderError.value = 'containerError'
    isInitializing.value = false
    return
  }

  // Destroy existing infographic instance
  if (store.infographic) {
    try {
      store.infographic.destroy()
    } catch (e) {
      console.warn('Failed to destroy previous infographic:', e)
    }
    store.infographic = null
  }

  container.innerHTML = ''

  try {
    store.infographic = new Infographic({
      container: `#${containerId}`,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      editable: true,
    })

    if (props.syntax) {
      renderInfographic(props.syntax)
    }
    
    console.log(`✅ SlidePreview: Initialization completed - ${containerId}`)
  } catch (e) {
    console.error('Failed to initialize infographic:', e)
    renderError.value = 'initError'
  } finally {
    isInitializing.value = false
  }
}


// Watch for theme/style changes and re-render
watch(
  () => [store.currentTheme, store.currentPalette, store.sketchStyle, store.customPalette],
  () => {
    if (store.infographic && props.syntax) {
      renderInfographic(props.syntax)
    }
  },
  { deep: true }
)
</script>

<template>
  <div ref="wrapperRef" class="w-full h-full flex items-center justify-center overflow-hidden relative">
    <!-- Error Display -->
    <Transition name="fade">
      <div 
        v-if="renderError && !isInitializing" 
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center"
      >
        <div class="bg-destructive/10 p-4 rounded-full">
          <svg class="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-foreground mb-1">{{ t('renderError').value }}</h3>
          <p class="text-sm text-muted-foreground mb-2">{{ t('renderErrorDesc').value }}</p>
          <p class="text-xs text-muted-foreground/70">{{ t('checkSyntax').value }}</p>
        </div>
      </div>
    </Transition>

    <!-- Scaled Container for AntV Infographic -->
    <Transition name="fade">
      <div
        v-show="!renderError"
        :id="containerId"
        ref="contentRef"
        :style="{
          width: `${BASE_WIDTH}px`,
          height: `${BASE_HEIGHT}px`,
          transform: `scale(${scale * store.canvasScale})`
        }"
        class="origin-center transition-transform duration-200"
      ></div>
    </Transition>

    <!-- Loading State -->
    <Transition name="fade">
      <div 
        v-if="isInitializing" 
        class="absolute inset-0 flex items-center justify-center bg-background/50"
      >
        <div class="flex items-center gap-2 text-muted-foreground">
          <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor"></path>
          </svg>
          <span class="text-sm">{{ t('rendering').value }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
