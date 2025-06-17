<template>
  <Card>
    <template #header>
      <img :src="product.images[0]" :alt="product.title" />
    </template>

    <template #title>
      <p class="min-h-[60px] line-clamp-3">
        {{ product.title }}
      </p>
    </template>

    <template #subtitle>
      <Chip :label="formatCategory(product.category)" />
    </template>

    <template #content>
      <div class="font-bold text-lg">$ {{ product.price }}</div>
      <p class="m-0 line-clamp-3">
        {{ product.description }}
      </p>
    </template>

    <template #footer>
      <div class="flex gap-4 mt-1">
        <Button label="Add to Cart" class="w-full" />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'
import { formatCategory } from '../utils/formatCategory'

defineProps<{
  product: Product
}>()
</script>