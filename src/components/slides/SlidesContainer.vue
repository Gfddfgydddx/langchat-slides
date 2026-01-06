<script lang="ts" setup>
import {useAppStore} from '@/stores/useAppStore'
import SlideThumbnail from './SlideThumbnail.vue'
import SlidesHeader from './SlidesHeader.vue'
import SlidesCanvas from './SlidesCanvas.vue'
import {LayoutTemplate, Plus, PlusCircle} from 'lucide-vue-next'
import {useI18n} from '@/composables/useI18n'
import {useFullscreen} from '@vueuse/core'
import {ref} from 'vue'
import {Button} from '@/components/ui/button'

const store = useAppStore()
const { t } = useI18n()

const containerRef = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(containerRef)

function handleAddSlide() {
  store.addEmptySlide()
}
</script>

<template>
  <div class="flex h-full bg-card overflow-hidden transition-colors duration-300">
    <!-- Left Sidebar: Thumbnails -->
    <div class="w-56 bg-muted/20 flex flex-col border-r border-border/50">
      <div class="p-4 flex items-center justify-between shrink-0">
        <span class="text-sm font-semibold flex items-center gap-2">
          <LayoutTemplate class="h-4 w-4" />
          {{ t('slides').value }}
        </span>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{{ store.slides.length }}</span>
          <Button
            :title="t('addSlide').value"
            class="h-6 w-6 p-0 hover:bg-primary/10"
            size="icon"
            variant="ghost"
            @click="handleAddSlide"
          >
            <Plus class="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
        <div class="flex flex-col gap-3 py-2">
          <SlideThumbnail 
            v-for="(slide, index) in store.slides" 
            :key="slide.id" 
            :index="index"
            :isActive="index === store.currentSlideIndex"
            :slide="slide"
            @click="store.currentSlideIndex = index"
          />
          <div v-if="store.slides.length === 0" class="flex flex-col items-center justify-center py-8 text-center text-muted-foreground gap-2">
            <PlusCircle class="h-8 w-8 text-muted-foreground/30" />
            <span class="text-xs text-muted-foreground/50">{{ t('noSlides').value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Area -->
    <div ref="containerRef" class="flex-1 flex flex-col h-full overflow-hidden relative bg-card">
      <!-- Toolbar -->
      <SlidesHeader 
        :isFullscreen="isFullscreen" 
        @toggleFullscreen="toggle" 
      />

      <!-- Preview -->
      <SlidesCanvas />
    </div>
  </div>
</template>
