<script lang="ts" setup>
import Header from '@/components/layout/Header.vue'
import SlideControlPanel from '@/components/slides/SlideControlPanel.vue'
import SlidesContainer from '@/components/slides/SlidesContainer.vue'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable'
</script>

<template>
  <div 
    class="h-screen w-full flex flex-col overflow-hidden bg-background text-foreground transition-colors duration-300"
  >
    <Header />
    
    <div class="flex-1 overflow-hidden p-4">
      <ResizablePanelGroup class="h-full rounded-xl overflow-visible gap-2" direction="horizontal">
        
        <!-- 左侧控制面板：输入框 + 分页 + 代码编辑器 -->
        <ResizablePanel :default-size="35" :max-size="45" :min-size="30" class="bg-card rounded-xl border border-border/50 overflow-hidden">
          <SlideControlPanel />
        </ResizablePanel>
        
        <ResizableHandle class="w-1 bg-transparent hover:bg-primary/20 transition-colors rounded-full" with-handle />
        
        <!-- 右侧幻灯片预览区域 -->
        <ResizablePanel :default-size="65" class="bg-card rounded-xl border border-border/50 overflow-hidden">
          <SlidesContainer />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  </div>
</template>
