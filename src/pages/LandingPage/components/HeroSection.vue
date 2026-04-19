<script setup lang="ts">
import { ArrowRight, CheckCircle2, Play, Star } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useHeroSection } from '../composables/useHeroSection'

const { stats, dashboardStats, recentPermits } = useHeroSection()
</script>

<template>
  <section
    class="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background pt-16"
  >
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
      <!-- Radial glow top-right -->
      <div
        class="absolute -top-40 -right-40 w-175 h-175 rounded-full"
        style="
          background: radial-gradient(
            circle,
            color-mix(in oklch, var(--primary) 30%, transparent) 0%,
            transparent 70%
          );
        "
      />
      <!-- Radial glow bottom-left -->
      <div
        class="absolute -bottom-60 -left-40 w-150 h-150 rounded-full"
        style="
          background: radial-gradient(
            circle,
            color-mix(in oklch, var(--primary) 20%, transparent) 0%,
            transparent 70%
          );
        "
      />
      <!-- Subtle grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.025]"
        style="
          background-image:
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px);
          background-size: 64px 64px;
        "
      />
    </div>

    <div class="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Top badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <Star class="w-3.5 h-3.5 fill-current" />
          <span>Trusted by 1,200+ businesses across the country</span>
        </div>

        <!-- Main headline -->
        <h1
          class="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.08] mb-6"
        >
          Permits, handled
          <span class="relative inline-block">
            <span class="text-gradient-primary relative z-10">effortlessly.</span>
            <span class="absolute bottom-1 left-0 right-0 h-3 -z-10 rounded-sm bg-ring/25" />
          </span>
        </h1>

        <!-- Subheading -->
        <p class="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          PermitsPro automates your entire permit lifecycle — from application to approval. Say
          goodbye to paperwork and endless follow-ups.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <RouterLink
            to="/register"
            class="btn-gradient-primary group inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold rounded-xl shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start for Free
            <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </RouterLink>
          <RouterLink
            to="/watch-demo"
            class="inline-flex items-center gap-2.5 px-7 py-3.5 text-base font-medium text-foreground rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
          >
            <span class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Play class="w-3 h-3 text-primary fill-primary translate-x-px" />
            </span>
            Watch Demo
          </RouterLink>
        </div>
      </div>

      <!-- Stats row -->
      <div class="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="text-center p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
        >
          <div class="text-gradient-primary text-3xl font-extrabold mb-1">
            {{ stat.value }}
          </div>
          <div class="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Hero mockup card -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="relative rounded-2xl border border-border shadow-2xl overflow-hidden bg-card">
          <!-- Fake browser bar -->
          <div class="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
            <div class="w-3 h-3 rounded-full bg-red-400/80" />
            <div class="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div class="w-3 h-3 rounded-full bg-green-400/80" />
            <div
              class="flex-1 mx-4 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border text-center"
            >
              app.permitspro.com/dashboard
            </div>
          </div>
          <!-- Dashboard preview content -->
          <div class="p-6 bg-muted/30">
            <div class="grid grid-cols-3 gap-4 mb-6">
              <div
                v-for="(card, i) in dashboardStats"
                :key="i"
                class="bg-card rounded-xl p-4 border border-border shadow-sm"
              >
                <div class="text-xs text-muted-foreground mb-1">{{ card.label }}</div>
                <div :class="['text-2xl font-bold', card.color]">{{ card.value }}</div>
              </div>
            </div>
            <div class="bg-card rounded-xl border border-border p-4 shadow-sm">
              <div
                class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"
              >
                Recent Permits
              </div>
              <div class="space-y-2">
                <div
                  v-for="(row, i) in recentPermits"
                  :key="i"
                  class="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <div class="text-sm font-medium text-foreground">{{ row.id }}</div>
                    <div class="text-xs text-muted-foreground">{{ row.type }}</div>
                  </div>
                  <span :class="['text-xs font-semibold px-2.5 py-1 rounded-full', row.badge]">
                    {{ row.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
