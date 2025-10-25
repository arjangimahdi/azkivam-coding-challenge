<template>
  <div>
    <div class="mb-4 w-full h-9 bg-zinc-200 animate-pulse rounded"></div>
    <div class="flex flex-col max-h-48 overflow-y-auto scrollbar-custom">
      <div v-for="i in 6" :key="i" class="p-2">
        <div class="w-3/4 h-4 bg-zinc-200 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
