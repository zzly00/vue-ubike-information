<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>場站名稱</th>
        <th>場站區域</th>
        <th @click="$emit('sort', 'sbi')" class="selected">
          目前可用車輛
          <i
            v-if="sortType === 'asc_sbi'"
            class="fa fa-sort-asc"
            aria-hidden="true"
          ></i>
          <i
            v-else-if="sortType === 'desc_sbi'"
            class="fa fa-sort-desc"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-sort" aria-hidden="true"></i>
        </th>
        <th @click="$emit('sort', 'tot')" class="selected">
          總停車格
          <i
            v-if="sortType === 'asc_tot'"
            class="fa fa-sort-asc"
            aria-hidden="true"
          ></i>
          <i
            v-else-if="sortType === 'desc_tot'"
            class="fa fa-sort-desc"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-sort" aria-hidden="true"></i>
        </th>
        <th>資料更新時間</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in showTable" :key="s.sno">
        <td>{{ s.sno }}</td>
        <td>{{ s.sna }}</td>
        <td>{{ s.sarea }}</td>
        <td>{{ s.sbi }}</td>
        <td>{{ s.tot }}</td>
        <td>{{ timeFormat(s.mday) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "UbikeTable",
  props: {
    showTable: Array,
    sortType: String,
  },
  methods: {
    timeFormat(t) {
      const date = [],
        time = [];

      date.push(t.substr(0, 4));
      date.push(t.substr(4, 2));
      date.push(t.substr(6, 2));
      time.push(t.substr(8, 2));
      time.push(t.substr(10, 2));
      time.push(t.substr(12, 2));

      return date.join("/") + " " + time.join(":");
    },
  },
});
</script>

<style lang="scss" scoped>
table {
  table-layout: fixed;

  th {
    text-align: center;
  }

  .selected {
    cursor: pointer;
    user-select: none;
  }
}
</style>