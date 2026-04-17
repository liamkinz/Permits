<script setup lang="ts">
import { ref } from 'vue'
import { Bell, MessageSquare, User, LogOut, Settings, Crown, Menu } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ModeToggle from './ui/ModeToggle.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAdminSidebar } from '@/lib/useAdminSidebar'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const { toggleMobileSidebar } = useAdminSidebar()

const notificationCount = ref(3)
const messageCount = ref(2)

const notifications = [
  { id: 1, text: 'New permit application from John Doe', time: '5m ago', read: false },
  { id: 2, text: 'Permit #1024 has been approved', time: '1h ago', read: false },
  { id: 3, text: 'New user registration', time: '2h ago', read: true },
]
</script>

<template>
  <header class="sticky top-0 z-30 w-full border-b border-border bg-background/60 backdrop-blur-sm">
    <div class="flex items-center justify-between h-14 px-4 md:justify-end md:px-6">
      <!-- Mobile Menu Button -->
      <Button
        variant="ghost"
        size="sm"
        class="md:hidden text-muted-foreground hover:text-foreground"
        @click="toggleMobileSidebar"
      >
        <Menu class="h-5 w-5" />
      </Button>

      <!-- Right Section: Icons & Profile -->
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Messages -->
        <div class="relative">
          <Button
            variant="ghost"
            size="sm"
            class="text-muted-foreground hover:text-foreground relative"
            title="Messages"
          >
            <MessageSquare class="h-5 w-5" />
            <span
              v-if="messageCount > 0"
              class="absolute top-0 right-0 h-4 w-4 md:h-5 md:w-5 bg-destructive text-primary-foreground text-[10px] md:text-xs rounded-full flex items-center justify-center font-semibold"
            >
              {{ messageCount }}
            </span>
          </Button>
        </div>

        <!-- Notifications Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <div class="relative">
              <Button
                variant="ghost"
                size="sm"
                class="text-muted-foreground hover:text-foreground relative"
              >
                <Bell class="h-5 w-5" />
                <span
                  v-if="notificationCount > 0"
                  class="absolute top-0 right-0 h-4 w-4 md:h-5 md:w-5 bg-destructive text-primary-foreground text-[10px] md:text-xs rounded-full flex items-center justify-center font-semibold"
                >
                  {{ notificationCount }}
                </span>
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-72 md:w-80 bg-popover">
            <DropdownMenuLabel class="flex items-center justify-between">
              <span>Notifications</span>
              <span class="text-xs font-normal text-muted-foreground"
                >{{ notificationCount }} new</span
              >
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div class="max-h-72 md:max-h-96 overflow-y-auto">
              <DropdownMenuItem
                v-for="notif in notifications"
                :key="notif.id"
                class="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-accent"
              >
                <div class="flex items-start justify-between w-full">
                  <p
                    :class="[
                      'text-sm',
                      notif.read ? 'text-muted-foreground' : 'font-semibold text-foreground',
                    ]"
                  >
                    {{ notif.text }}
                  </p>
                  <span
                    v-if="!notif.read"
                    class="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1"
                  ></span>
                </div>
                <p class="text-xs text-muted-foreground">{{ notif.time }}</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="text-center justify-center py-2 cursor-pointer hover:bg-accent"
            >
              <span class="text-sm text-primary font-medium">View All Notifications</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Theme Toggle -->
        <div class="border-l border-border pl-2 md:pl-3">
          <ModeToggle />
        </div>

        <!-- User Profile Dropdown -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="sm" class="pl-2 pr-1 gap-2 hover:bg-accent">
              <div
                class="w-8 h-8 rounded-full btn-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-xs"
              >
                {{ authStore.adminInitials }}
              </div>
              <span class="hidden sm:inline text-sm font-medium text-foreground">
                {{ authStore.user?.name || 'Admin' }}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-56 bg-popover">
            <DropdownMenuLabel class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <Crown class="h-4 w-4 text-chart-4" />
                <span>{{ authStore.user?.name || 'Admin User' }}</span>
              </div>
              <span class="text-xs font-normal text-muted-foreground">{{
                authStore.user?.email || 'admin@permits.com'
              }}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="cursor-pointer gap-2">
              <User class="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer gap-2">
              <Settings class="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10"
              @click="authStore.logout()"
              ><LogOut class="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </header>
</template>
