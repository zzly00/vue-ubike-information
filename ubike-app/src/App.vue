<template>
  <h1>YouBike 臺北市公共自行車即時資訊</h1>
  <Search v-model:searchName="searchName" />
  <UbikeTable :showTable="showTable" :sortType="sortType" @sort="updateSortType" />
  <Pagination :pageTotal="pageTotal" :selectedPage="selectedPage" @changePage="changePage" />
</template>

<script>
import { defineComponent } from "vue";
import Pagination from "./components/Pagination.vue";
import Search from "./components/Search.vue";
import UbikeTable from "./components/UbikeTable.vue";

export default defineComponent({
  name: "App",
  components: {
    Pagination,
    Search,
    UbikeTable,
  },
  data() {
    return {
      ubikeStops: [],
      sortType: "default",
      searchName: "",
      selectedPage: 1,
      countOfPage: 20,
    };
  },
  computed: {
    searchStop() {
      return this.ubikeStops.filter((stop) =>
        stop.sna.includes(this.searchName)
      );
    },
    sortedColumn() {
      const sortInfo = {
        type: this.sortType.split("_")[0],
        column: this.sortType.split("_")[1],
      };
      const list = [...this.searchStop];

      return sortInfo.type === "asc"
        ? list.sort((a, b) => a[sortInfo.column] - b[sortInfo.column])
        : list.sort((a, b) => b[sortInfo.column] - a[sortInfo.column]);
    },
    showTable() {
      return this.sortedColumn.slice(
        (this.selectedPage - 1) * this.countOfPage,
        this.selectedPage * this.countOfPage
      );
    },
    pageTotal() {
      return Math.ceil(this.sortedColumn.length / this.countOfPage);
    },
  },
  watch: {
    searchName() {
      this.selectedPage = 1;
    },
  },
  methods: {
    updateSortType(column) {
      this.sortType = this.sortType.includes("desc")
        ? `asc_${column}`
        : `desc_${column}`;
    },
    changePage(n) {
      this.selectedPage = n;
    },
  },
  created() {
    fetch("https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz")
      .then((res) => res.json())
      .then((res) => {
        this.ubikeStops = Object.keys(res.retVal).map((key) => res.retVal[key]);
      });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
