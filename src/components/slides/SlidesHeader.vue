<script lang="ts" setup>
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import {useAppStore} from '@/stores/useAppStore'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {
  Code,
  Download,
  FileImage,
  FileText,
  Image,
  ListPlus,
  Maximize2,
  Minimize2,
  Moon,
  Palette,
  PenTool,
  Presentation,
  RefreshCw,
  Settings2,
  Sun,
  Trash2,
  ZoomIn,
  ZoomOut
} from 'lucide-vue-next'
import {useI18n} from '@/composables/useI18n'
import CustomSlideDialog from '@/components/layout/CustomSlideDialog.vue'

const props = defineProps<{
  isFullscreen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggleFullscreen'): void
}>()

const store = useAppStore()
const { t } = useI18n()
</script>

<template>
  <div class="h-14 flex items-center justify-between px-6 bg-card transition-colors duration-300 border-b border-border/50">
    <div class="text-sm font-medium text-muted-foreground">
      {{ store.currentSlide?.title || t('preview').value }}
    </div>
    <div class="flex items-center gap-2">
      <!-- Theme Toggle -->
      <Button
        :title="store.currentTheme === 'default' ? 'Dark Theme' : 'Light Theme'"
        class="h-8 w-8"
        size="icon"
        variant="ghost"
        @click="store.toggleTheme"
      >
        <Moon v-if="store.currentTheme === 'default'" class="h-4 w-4" />
        <Sun v-else class="h-4 w-4" />
      </Button>

      <!-- Sketch Style Toggle -->
      <Button
        :class="store.sketchStyle ? 'text-primary bg-primary/10' : ''"
        :title="store.sketchStyle ? 'Disable Sketch Style' : 'Enable Sketch Style'"
        class="h-8 w-8"
        size="icon"
        variant="ghost"
        @click="store.toggleSketchStyle"
      >
        <PenTool class="h-4 w-4" />
      </Button>

      <!-- Code Editor Toggle -->
      <Button
        :class="store.showCodeEditor ? 'text-primary bg-primary/10' : ''"
        :title="store.showCodeEditor ? t('closeCodeEditor').value : t('openCodeEditor').value"
        class="h-8 w-8"
        size="icon"
        variant="ghost"
        @click="store.toggleCodeEditor"
      >
        <Code class="h-4 w-4" />
      </Button>

      <!-- Palette Selector -->
      <Select :model-value="store.currentPalette" @update:model-value="(v) => store.updatePalette(v as string)">
        <SelectTrigger class="h-8 w-[120px] px-2 gap-2">
          <Palette class="h-3.5 w-3.5 shrink-0" />
          <SelectValue class="text-xs truncate" placeholder="Palette" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="palette in store.palettes" :key="palette.name" :value="palette.name">
            <div class="flex items-center gap-2 flex-1">
              <div class="flex gap-1">
                <div 
                  v-for="(color, idx) in palette.colors.slice(0, 4)" 
                  :key="idx"
                  :style="{ backgroundColor: color }"
                  class="w-3 h-3 rounded-full"
                />
              </div>
              <span class="capitalize">{{ palette.name }}</span>
            </div>
          </SelectItem>
          <SelectItem value="custom">
            <div class="flex items-center gap-2 flex-1">
              <div class="flex gap-1">
                <div 
                  v-for="(color, idx) in store.customPalette.slice(0, 4)" 
                  :key="idx"
                  :style="{ backgroundColor: color }"
                  class="w-3 h-3 rounded-full"
                />
              </div>
              <span>Custom</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <div class="w-px h-4 bg-border/50 mx-1"></div>

      <!-- Zoom Controls -->
      <div class="flex items-center gap-1 bg-muted/30 rounded-lg p-0.5 border border-border/50">
        <Button
          :disabled="store.canvasScale <= 0.5"
          class="h-7 w-7"
          size="icon"
          title="Zoom Out"
          variant="ghost"
          @click="store.zoomOut()"
        >
          <ZoomOut class="h-3.5 w-3.5" />
        </Button>
        <span class="text-[10px] font-medium w-9 text-center tabular-nums">
          {{ Math.round(store.canvasScale * 100) }}%
        </span>
        <Button
          :disabled="store.canvasScale >= 2.5"
          class="h-7 w-7"
          size="icon"
          title="Zoom In"
          variant="ghost"
          @click="store.zoomIn()"
        >
          <ZoomIn class="h-3.5 w-3.5" />
        </Button>
      </div>

      <div class="w-px h-4 bg-border/50 mx-1"></div>

      <!-- Fullscreen Toggle -->
      <Button
        :title="props.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
        class="h-8 w-8"
        size="icon"
        variant="ghost"
        @click="emit('toggleFullscreen')"
      >
        <Minimize2 v-if="props.isFullscreen" class="h-4 w-4" />
        <Maximize2 v-else class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border/50 mx-1"></div>

      <!-- Export Dropdown -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="h-8 gap-2 px-3 hover:bg-muted font-medium" size="sm" variant="ghost">
            <Download class="h-3.5 w-3.5" />
            <span class="text-xs">{{ t('exportFormat').value }}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-40">
          <DropdownMenuItem class="cursor-pointer" @click="store.triggerExport('png')">
            <div class="flex items-center gap-2">
              <FileImage class="h-3.5 w-3.5 text-muted-foreground" />
              <span>{{ t('exportPng').value }}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer" @click="store.triggerExport('svg')">
            <div class="flex items-center gap-2">
              <FileText class="h-3.5 w-3.5 text-muted-foreground" />
              <span>{{ t('exportSvg').value }}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer" @click="store.triggerExport('pdf')">
            <div class="flex items-center gap-2">
              <Image class="h-3.5 w-3.5 text-muted-foreground" />
              <span>{{ t('exportPdf').value }}</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem class="cursor-pointer" @click="store.triggerExport('pptx')">
            <div class="flex items-center gap-2">
              <Presentation class="h-3.5 w-3.5 text-muted-foreground" />
              <span>{{ t('exportPpt').value }}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div class="w-px h-4 bg-border/50 mx-1"></div>

      <!-- More Actions Dropdown -->
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="h-8 w-8 hover:bg-muted" size="icon" variant="ghost">
            <Settings2 class="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" class="w-56">
          <CustomSlideDialog />
          
          <DropdownMenuItem class="cursor-pointer" @click="store.slideRenderMode = store.slideRenderMode === 'replace' ? 'append' : 'replace'">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <RefreshCw v-if="store.slideRenderMode === 'replace'" class="h-3.5 w-3.5 text-muted-foreground" />
                <ListPlus v-else class="h-3.5 w-3.5 text-muted-foreground" />
                <span>{{ store.slideRenderMode === 'replace' ? t('replaceMode').value : t('appendMode').value }}</span>
              </div>
              <span class="text-[10px] text-muted-foreground bg-muted px-1.5 rounded">{{ store.slideRenderMode }}</span>
            </div>
          </DropdownMenuItem>

          <div class="my-1 border-t border-border/50"></div>

          <!-- Dangerous Actions -->
          <DropdownMenuItem class="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10" @click="store.clearSlides">
            <div class="flex items-center gap-2">
              <Trash2 class="h-3.5 w-3.5" />
              <span>{{ t('clearAllSlides').value }}</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
