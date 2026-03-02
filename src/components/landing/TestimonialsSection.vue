<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Operations Manager',
    company: 'BuildRight Co.',
    avatar: 'SM',
    avatarBg: 'bg-blue-100 text-blue-700',
    rating: 5,
    quote:
      'PermitsPro cut our permit turnaround from 3 weeks to 3 days. The real-time tracking alone is worth every penny.',
  },
  {
    name: 'James Okafor',
    role: 'Director of Development',
    company: 'Apex Properties',
    avatar: 'JO',
    avatarBg: 'bg-violet-100 text-violet-700',
    rating: 5,
    quote:
      "We manage permits for 12 properties simultaneously. Before PermitsPro it was a spreadsheet nightmare. Now it's completely automated.",
  },
  {
    name: 'Priya Sharma',
    role: 'Compliance Officer',
    company: 'CityPlan Solutions',
    avatar: 'PS',
    avatarBg: 'bg-rose-100 text-rose-700',
    rating: 5,
    quote:
      'The compliance checks caught two application errors before submission. That alone saved us weeks of back-and-forth with the city.',
  },
]
</script>

<template>
  <section class="py-24 bg-white">
    <div class="container mx-auto px-6 lg:px-8">
      <!-- Header -->
      <div class="max-w-2xl mx-auto text-center mb-16">
        <div
          class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4"
        >
          Testimonials
        </div>
        <h2 class="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Loved by teams who build
        </h2>
        <p class="text-lg text-muted-foreground leading-relaxed">
          Don't take our word for it. Here's what our customers have to say.
        </p>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div
          v-for="(t, i) in testimonials"
          :key="i"
          class="p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col gap-4"
        >
          <!-- Stars -->
          <div class="flex items-center gap-0.5">
            <Star v-for="s in t.rating" :key="s" class="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>

          <!-- Quote -->
          <p class="text-sm text-foreground leading-relaxed flex-1">"{{ t.quote }}"</p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-2 border-t border-border">
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                t.avatarBg,
              ]"
            >
              {{ t.avatar }}
            </div>
            <div>
              <div class="text-sm font-semibold text-foreground">{{ t.name }}</div>
              <div class="text-xs text-muted-foreground">{{ t.role }} · {{ t.company }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
