<template>
  <ul class="pagers">
    <li class="pager" v-for="n of pageTotal" :key="n">
      <p
        @click="$emit('changePage', n)"
        :class="{ active: n === selectedPage }"
      >
        {{ n }}
      </p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    pageTotal: Number,
    selectedPage: Number,
  },
});
</script>

<style lang="scss" scoped>
.pagers {
  display: flex;
  justify-content: center;
  padding: 0;

  .pager {
    list-style: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin-right: 5px;
    border: 1px solid #aaa;
    user-select: none;

    a {
      text-decoration: none;
    }
  }

  .active {
    background-color: #359edc;
    color: #fff;
  }
}
</style>