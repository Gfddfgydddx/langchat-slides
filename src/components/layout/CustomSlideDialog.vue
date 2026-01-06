<script lang="ts" setup>
import {ref} from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {useAppStore} from '@/stores/useAppStore'
import {PlusCircle} from 'lucide-vue-next'
import {useI18n} from '@/composables/useI18n'

const store = useAppStore()
const { t } = useI18n()

const isOpen = ref(false)
const customSyntax = ref('')
const renderMode = ref<'replace' | 'append'>('replace')

function handleRender() {
  if (!customSyntax.value.trim()) return
  
  // 将幻灯片语法填充到输入框中
  store.inputPrompt = `请基于以下幻灯片语法生成幻灯片：\n\n${customSyntax.value}`
  
  // 更新渲染模式
  store.slideRenderMode = renderMode.value
  
  // Close dialog and clear input
  isOpen.value = false
  customSyntax.value = ''
}

function handleCancel() {
  isOpen.value = false
  customSyntax.value = ''
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="h-8 cursor-pointer gap-2 w-full justify-start" size="sm" variant="ghost">
        <PlusCircle class="h-4 w-4" />
        <span class="text-xs">{{ t('customSlide').value }}</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>{{ t('customSlide').value }}</DialogTitle>
        <DialogDescription>
          {{ t('customSlideDesc').value }}
        </DialogDescription>
      </DialogHeader>
      
      <div class="max-h-[70vh] flex flex-col space-y-4 py-4">
        <!-- Mode Selection -->
        <div class="flex items-center gap-4 shrink-0">
          <span class="text-sm font-medium">{{ t('mode').value }}:</span>
          <div class="flex gap-2">
            <Button
              :variant="renderMode === 'replace' ? 'default' : 'outline'"
              size="sm"
              @click="renderMode = 'replace'"
            >
              {{ t('replace').value }}
            </Button>
            <Button
              :variant="renderMode === 'append' ? 'default' : 'outline'"
              size="sm"
              @click="renderMode = 'append'"
            >
              {{ t('append').value }}
            </Button>
          </div>
        </div>
        
        <!-- Textarea for syntax input -->
        <div class="space-y-2 flex-1 flex flex-col min-h-0">
          <label class="text-sm font-medium shrink-0">{{ t('slideSyntax').value }}:</label>
          <Textarea
            v-model="customSyntax"
            :placeholder="t('slideSyntaxPlaceholder').value"
            class="flex-1 font-mono text-xs resize-none"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" @click="handleCancel">
          {{ t('cancel').value }}
        </Button>
        <Button @click="handleRender">
          {{ t('render').value }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
