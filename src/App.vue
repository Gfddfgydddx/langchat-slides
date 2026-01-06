<script lang="ts" setup>
import {watch} from 'vue'
import Header from '@/components/layout/Header.vue'
import ChatContainer from '@/components/chat/ChatContainer.vue'
import SlidesContainer from '@/components/slides/SlidesContainer.vue'
import CodeEditorPanel from '@/components/slides/CodeEditorPanel.vue'
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from '@/components/ui/resizable'
import {useAppStore} from '@/stores/useAppStore'

const store = useAppStore()

// Watch for the first slide to be added and open the code editor automatically
watch(() => store.slides.length, (newLength, oldLength) => {
  if (newLength > 0 && oldLength === 0) {
    store.showCodeEditor = true
  }
})

</script>

<template>
  <div 
    class="h-screen w-full flex flex-col overflow-hidden bg-background text-foreground transition-colors duration-300"
  >
    <Header />
    
    <div class="flex-1 overflow-hidden p-4">
      <ResizablePanelGroup class="h-full rounded-xl overflow-visible gap-2" direction="horizontal">
        
        <ResizablePanel :default-size="30" :max-size="45" :min-size="25" class="bg-card rounded-xl border border-border/50 overflow-hidden">
          <div class="h-full w-full relative">
            <ChatContainer />
            <div v-if="store.showCodeEditor" class="absolute inset-0 z-20 p-4 pointer-events-none flex flex-col">
              <CodeEditorPanel class="w-full h-full pointer-events-auto" />
            </div>
          </div>
        </ResizablePanel>
        
        <ResizableHandle class="w-1 bg-transparent hover:bg-primary/20 transition-colors rounded-full" with-handle />
        
        <ResizablePanel :default-size="70" class="bg-card rounded-xl border border-border/50 overflow-hidden">
          <SlidesContainer />
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  </div>
</template>