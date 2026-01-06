<script lang="ts" setup>
import {ref} from 'vue'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useAppStore} from '@/stores/useAppStore'
import {Check, PlayCircle, Sparkles} from 'lucide-vue-next'
import type {Example} from '@/examples/examples'
import {examples} from '@/examples/examples'

const store = useAppStore()

// Track currently selected example
const selectedExample = ref<Example | null>(null)
// 保存当前slide的ID，避免频繁创建新ID导致组件重新挂载
const currentSlideId = ref<string | null>(null)

// Simulate streaming output
async function simulateStreamResponse(example: Example) {
  // Set selected example
  selectedExample.value = example

  store.isStreaming = true
  let fullContent = ''

  try {
    // 创建初始slide ID（只在开始时创建一次）
    currentSlideId.value = `slide-${Date.now()}`
    
    // 模拟流式输出
    const chunkSize = 10 // Process 10 characters at a time
    const delay = 100 // 100ms delay between chunks

    for (let i = 0; i < example.slides.length; i += chunkSize) {
      const chunk = example.slides.slice(i, i + chunkSize)
      fullContent += chunk
      
      // Parse and update slides incrementally
      parseSlides(fullContent, currentSlideId.value!)
      
      // Wait before next chunk
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  } catch (error: any) {
    console.error('Stream error:', error)
    throw error
  } finally {
    store.isStreaming = false
  }
}

function parseSlides(content: string, slideId: string) {
  // 直接使用整个内容作为幻灯片语法（不再使用[slide]标签）
  const body = content.trim()
  
  if (body.length > 5) {
    const slide = {
      id: slideId,
      title: '',
      content: body,
      syntax: body
    }
    
    store.setSlides([slide])
    store.currentSlideIndex = 0
  }
}

function handleSelectExample(example: Example) {
  // 将示例的描述填充到输入框
  store.inputPrompt = example.description
  selectedExample.value = example
  
  // 同时触发模拟流式响应，生成幻灯片代码
  simulateStreamResponse(example)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="gap-2 justify-start" size="sm" variant="outline">
        <PlayCircle class="h-4 w-4" />
        <span class="truncate">{{ selectedExample ? selectedExample.name : 'Example' }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-72">
      <DropdownMenuLabel class="flex items-center gap-2">
        <Sparkles class="h-4 w-4" />
        选择示例
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="example in examples"
        :key="example.id"
        :class="selectedExample?.id === example.id ? 'bg-accent' : ''"
        class="cursor-pointer gap-2"
        @click="handleSelectExample(example)"
      >
        <div class="flex flex-col gap-0.5 flex-1">
          <span class="font-medium">{{ example.name }}</span>
          <span class="text-xs text-muted-foreground">{{ example.description }}</span>
        </div>
        <Check 
          v-if="selectedExample?.id === example.id"
          class="h-4 w-4 text-primary flex-shrink-0"
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
