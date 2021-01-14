const vm = Vue.createApp({
    data () {
      return {
        ubikeStops: [],
        sortType: "default",
        searchName: "",
        selectedPage: 1
      }
    },
    computed: {
      searchStop() {
          return this.ubikeStops.filter(stop => stop.sna.includes(this.searchName));
      },
      sortedColumn() {
        let list = [...this.searchStop];
        const sortInfo = {
          type: this.sortType.split("_")[0],
          column: this.sortType.split("_")[1]
        }

        if(sortInfo.type === 'asc' ) {
          return list.sort((a, b) => a[sortInfo.column] - b[sortInfo.column] );
        }
        else if(sortInfo.type === 'desc' ) {
          return list.sort((a, b) => b[sortInfo.column] - a[sortInfo.column]);
        }
        else {
          return this.searchStop;
        }
      },
      showTable() {
        return this.sortedColumn.slice((this.selectedPage-1) * 20, (this.selectedPage * 20))
      },
      pageTotal() {
        return Math.ceil(this.sortedColumn.length / 20)
      }
    },
    watch: {
      searchName () {
        this.selectedPage = 1
      }
    },
    methods: {
      timeFormat(t){

        var date = [], time = [];

        date.push(t.substr(0, 4));
        date.push(t.substr(4, 2));
        date.push(t.substr(6, 2));
        time.push(t.substr(8, 2));
        time.push(t.substr(10, 2));
        time.push(t.substr(12, 2));

        return date.join("/") + ' ' + time.join(":");
      },
      updateSortType(column){
        this.sortType = this.sortType.includes("desc") ? `asc_${column}` : `desc_${column}`;
      },
      changePage(n){
        this.selectedPage = n;
      }
    },
    created() {

        // 欄位說明請參照:
        // http://data.taipei/opendata/datalist/datasetMeta?oid=8ef1626a-892a-4218-8344-f7ac46e1aa48

        // sno：站點代號、 sna：場站名稱(中文)、 tot：場站總停車格、
        // sbi：場站目前車輛數量、 sarea：場站區域(中文)、 mday：資料更新時間、
        // lat：緯度、 lng：經度、 ar：地(中文)、 sareaen：場站區域(英文)、
        // snaen：場站名稱(英文)、 aren：地址(英文)、 bemp：空位數量、 act：全站禁用狀態

        fetch('https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.gz')
          .then(res => res.json())
          .then(res => {
              // 將 json 轉陣列後存入 this.ubikeStops
              this.ubikeStops = Object.keys(res.retVal).map(key => res.retVal[key]);
          });

    }
}).mount('#app');