<template>
  <FoodRoot :content="mockSiteContent" />
</template>

<script lang="ts" setup>
import FoodRoot from '../../../app/components/FoodRoot.vue'
import { mockSiteContent } from '../../../content'

useHead({ title: mockSiteContent.businessName ?? 'Food' })
</script>
