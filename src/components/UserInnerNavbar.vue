<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  Bell,
  FileText,
  Home,
  FolderOpen,
  Search,
  User,
  LogOut,
  Settings,
  Menu,
  X,
} from 'lucide-vue-next'
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
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const authStore = useAuthStore()

const isMobileMenuOpen = ref(false)
const notificationCount = ref(4)
const searchQuery = ref('')

const navLinks = [
  { label: 'Dashboard', to: '/home', icon: Home },
  { label: 'My Permits', to: '/home/permits', icon: FolderOpen },
  { label: 'New Application', to: '/home/apply', icon: FileText },
]

const notifications = [
  { id: 1, text: 'Your Business License has been approved', time: '10m ago', read: false },
  { id: 2, text: 'Building Permit requires additional documents', time: '1h ago', read: false },
  { id: 3, text: 'Fire Safety inspection scheduled for Mar 15', time: '3h ago', read: false },
  { id: 4, text: 'Zoning Permit application received', time: '1d ago', read: true },
]

const userInitials = authStore.user?.name
  ? authStore.user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  : 'U'

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function isActive(path: string) {
  return route.path === path
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/home" class="flex items-center gap-2.5 group shrink-0">
          <div
            class="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-200"
          >
            <FileText class="w-5 h-5 text-primary-foreground" />
          </div>
          <span class="text-xl font-bold text-foreground tracking-tight leading-none">
            Permits<span class="text-primary">Pro</span>
          </span>
        </RouterLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
          <RouterLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            :class="[
              'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150',
              isActive(link.to)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent',
            ]"
          >
            <component :is="link.icon" class="w-4 h-4" />
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Desktop Right Section -->
        <div class="hidden md:flex items-center gap-2">
          <!-- Notifications -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="relative text-muted-foreground hover:text-foreground"
              >
                <Bell class="w-5 h-5" />
                <span
                  v-if="notificationCount > 0"
                  class="absolute -top-0.5 -right-0.5 h-4.5 w-4.5 bg-destructive text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-semibold"
                >
                  {{ notificationCount }}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-80 bg-popover">
              <DropdownMenuLabel class="flex items-center justify-between">
                <span>Notifications</span>
                <span class="text-xs font-normal text-muted-foreground"
                  >{{ notificationCount }} new</span
                >
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div class="max-h-80 overflow-y-auto">
                <DropdownMenuItem
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-accent"
                >
                  <div class="flex items-start justify-between w-full">
                    <p
                      :class="[
                        'text-sm leading-snug',
                        notif.read ? 'text-muted-foreground' : 'font-semibold text-foreground',
                      ]"
                    >
                      {{ notif.text }}
                    </p>
                    <span
                      v-if="!notif.read"
                      class="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1 ml-2"
                    />
                  </div>
                  <p class="text-xs text-muted-foreground">{{ notif.time }}</p>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem class="justify-center py-2 cursor-pointer hover:bg-accent">
                <span class="text-sm text-primary font-medium">View All Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- Theme Toggle -->
          <div class="border-l border-border pl-2">
            <ModeToggle />
          </div>

          <!-- User Profile Dropdown -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="sm" class="pl-2 pr-1 gap-2 hover:bg-accent">
                <div
                  class="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold text-sm ring-2 ring-primary/20"
                >
                  {{ userInitials }}
                </div>
                <span
                  class="hidden lg:inline text-sm font-medium text-foreground max-w-[120px] truncate"
                >
                  {{ authStore.user?.name ?? 'User' }}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56 bg-popover">
              <DropdownMenuLabel class="flex flex-col gap-1">
                <span>{{ authStore.user?.name ?? 'User' }}</span>
                <span class="text-xs font-normal text-muted-foreground">{{
                  authStore.user?.email ?? ''
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
              >
                <LogOut class="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <!-- Mobile Right Section -->
        <div class="md:hidden flex items-center gap-1">
          <!-- Mobile Notifications -->
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="ghost"
                size="icon"
                class="relative text-muted-foreground hover:text-foreground"
              >
                <Bell class="w-5 h-5" />
                <span
                  v-if="notificationCount > 0"
                  class="absolute -top-0.5 -right-0.5 h-4 w-4 bg-destructive text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-semibold"
                >
                  {{ notificationCount }}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-72 bg-popover">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div class="max-h-64 overflow-y-auto">
                <DropdownMenuItem
                  v-for="notif in notifications"
                  :key="notif.id"
                  class="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <p
                    :class="[
                      'text-sm',
                      notif.read ? 'text-muted-foreground' : 'font-semibold text-foreground',
                    ]"
                  >
                    {{ notif.text }}
                  </p>
                  <p class="text-xs text-muted-foreground">{{ notif.time }}</p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          <!-- Hamburger -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="p-2 rounded-lg text-foreground hover:bg-accent transition-colors"
            :aria-expanded="isMobileMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <Transition
              enter-active-class="transition-all duration-150 ease-out"
              enter-from-class="opacity-0 rotate-90 scale-75"
              enter-to-class="opacity-100 rotate-0 scale-100"
              leave-active-class="transition-all duration-100 ease-in"
              leave-from-class="opacity-100 rotate-0 scale-100"
              leave-to-class="opacity-0 -rotate-90 scale-75"
              mode="out-in"
            >
              <Menu v-if="!isMobileMenuOpen" class="w-5 h-5" />
              <X v-else class="w-5 h-5" />
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-background border-t border-border shadow-lg">
        <!-- Mobile Nav Links -->
        <nav class="px-4 pt-3 pb-2 space-y-0.5" aria-label="Mobile navigation">
          <RouterLink
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
              isActive(link.to)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent',
            ]"
            @click="closeMobileMenu"
          >
            <component :is="link.icon" class="w-4 h-4" />
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Mobile User Section -->
        <div class="px-4 pt-3 pb-4 border-t border-border space-y-2 mt-1">
          <div class="flex items-center gap-3 px-3 py-2">
            <div
              class="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold text-sm ring-2 ring-primary/20"
            >
              {{ userInitials }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium text-foreground truncate">
                {{ authStore.user?.name ?? 'User' }}
              </p>
              <p class="text-xs text-muted-foreground truncate">
                {{ authStore.user?.email ?? '' }}
              </p>
            </div>
          </div>

          <RouterLink
            to="/home/profile"
            class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            <User class="w-4 h-4" />
            Profile
          </RouterLink>
          <RouterLink
            to="/home/settings"
            class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            @click="closeMobileMenu"
          >
            <Settings class="w-4 h-4" />
            Settings
          </RouterLink>

          <button
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-destructive rounded-lg border border-destructive/30 hover:bg-destructive/10 transition-colors mt-2"
            @click="authStore.logout()"
          >
            <LogOut class="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
