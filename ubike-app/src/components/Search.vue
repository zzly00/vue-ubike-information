<template>
  <p>
    站點名稱搜尋: <input type="text" :value="searchName" @input="$emit('update:searchName', $event.target.value)">
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Search',
  props: {
    searchName: String
  }
});
</script>