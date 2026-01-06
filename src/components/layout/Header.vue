<script lang="ts" setup>
import SettingsDialog from './SettingsDialog.vue'
import ExampleGenerator from '@/examples/ExampleGenerator.vue'
import {Button} from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import {BookText, Github, Languages, Moon, Sun} from 'lucide-vue-next'
import {useAppStore} from '@/stores/useAppStore'
import {useI18n} from '@/composables/useI18n'

const store = useAppStore()
const { t } = useI18n()
</script>

<template>
  <header class="flex h-16 items-center justify-between px-6 bg-card border-b border-border/50 shrink-0 z-10 transition-colors duration-300">
    <div class="flex items-center gap-2 font-bold text-lg tracking-tight">
      <img alt="Logo" class="h-8 w-8 rounded-lg" src="/favicon.ico" />
      <span class="">LangChat Slides</span>
    </div>
    <div class="flex items-center gap-2">
      <ExampleGenerator />
      <div class="h-4 w-px bg-border/50"></div>

      <Button as-child variant="ghost">
        <a class="flex items-center gap-2" href="https://github.com/langchat/langchat-slides" target="_blank">
          <Github class="h-4 w-4" />
          <span>Github</span>
        </a>
      </Button>

      <Button variant="ghost">
        <a class="flex items-center gap-2" href="https://langchat.cn" target="_blank">
          <BookText class="h-4 w-4" />
          <span>Document</span>
        </a>
      </Button>

      <div class="h-4 w-px bg-border/50"></div>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger class="gap-2">
              <span>LangChat</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul class="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink as-child>
                    <a href="https://langchat.cn" target="_blank">
                      <div class="font-medium">langchat.cn</div>
                      <div class="text-muted-foreground">
                        https://langchat.cn.
                      </div>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="https://github.com/langchat/langchat-slides" target="_blank">
                      <div class="font-medium">Github</div>
                      <div class="text-muted-foreground">
                        https://github.com/langchat/langchat-slides
                      </div>
                    </a>
                  </NavigationMenuLink>
                  <NavigationMenuLink as-child>
                    <a href="https://gitee.com/langchat/langchat-slides">
                      <div class="font-medium">Gitee</div>
                      <div class="text-muted-foreground">
                        https://gitee.com/langchat/langchat-slides
                      </div>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div class="h-4 w-px bg-border/50"></div>
      
      <div class="flex items-center gap-2">
        <Button
            :title="store.locale === 'zh' ? t('switchToEnglish').value : t('switchToChinese').value"
            class="rounded-full"
            size="icon"
            variant="ghost"
            @click="store.toggleLocale"
        >
          <Languages class="h-4 w-4" />
        </Button>
        <Button 
          class="rounded-full"
          size="icon" 
          variant="ghost"
          @click="store.toggleDark()"
        >
          <Moon v-if="store.isDark" class="h-4 w-4" />
          <Sun v-else class="h-4 w-4" />
        </Button>

        <SettingsDialog />
      </div>
    </div>
  </header>
</template>
