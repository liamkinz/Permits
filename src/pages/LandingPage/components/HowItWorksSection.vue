<script setup lang="ts">
import { useHowItWorksSection } from '../composables/useHowItWorksSection'

const { steps } = useHowItWorksSection()
</script>

<template>
  <section id="how-it-works" class="py-24 bg-muted/40">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Section header -->
      <div class="max-w-2xl mx-auto text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
        >
          How It Works
        </div>
        <h2 class="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          From application to approval in 4 steps
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Our streamlined process eliminates the back-and-forth and gets your permits approved
          faster than ever before.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Connector line (desktop) -->
        <div
          class="hidden lg:block absolute top-16 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] h-px bg-border z-0"
          aria-hidden="true"
        />

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.step"
            class="relative flex flex-col items-center text-center group z-10"
          >
            <!-- Step number badge -->
            <div
              class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-sky-700 text-white border border-background dark:border-sky-700 text-xs font-bold flex items-center justify-center shadow-sm z-20"
            >
              {{ index + 1 }}
            </div>

            <!-- Icon circle -->
            <div
              :class="[
                'w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110 group-hover:shadow-md dark:shadow-md',
                step.accent,
              ]"
            >
              <component :is="step.icon" class="w-7 h-7" />
            </div>

            <!-- Content -->
            <div class="text-xs font-bold text-primary/60 tracking-widest uppercase mb-1">
              Step {{ step.step }}
            </div>
            <h3 class="text-lg font-bold text-foreground mb-2">{{ step.title }}</h3>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
