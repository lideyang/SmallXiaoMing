<template>
  <div class="main-layer">
    <my-radio-group class="radio-layer" title="车型" :value="type" :list="vehicleList" @change="onChangeTypeHandle">
    </my-radio-group>
    <my-radio-group class="radio-layer" title="期限" :value="year" :list="yearsList" @change="onChangeYearHandle">
    </my-radio-group>
    <i-input type="number" class="input-layer" title="贷款金额:" :value="sloanMoney" @change="onChangeMoneyHandle"
             maxlength="20"
             placeholder="请输入贷款金额">
    </i-input>
    <i-input type="number" class="input-layer" title="贷款利率:" placeholder="请输入贷款利率" :value="rate"
             @change="onChangeRateHandle" maxlength="3">
    </i-input>
    <i-button style="margin: 20px auto; width: 95%;" type="error" @tap="caculateLoan">开始计算</i-button>
  </div>
</template>

<script>
  import radioGroup from "@/components/radioGroup";

  export default {
    data() {
      return {
        sloanMoney: "",
        rate: "",
        type: "1",
        year: "2",
        yearsList: [
          { name: "2年(24期)", value: "2" },
          { name: "3年(36期)", value: "3" }
        ],
        vehicleList: [
          { name: "二手车", value: "1" },
          { name: "新车", value: "2" }
        ]
      };
    },
    components: {
      "my-radio-group": radioGroup
    },
    watch: {},
    methods: {
      onChangeTypeHandle(value) {
        console.log(value);
        this.type = value;
        mpvue.setStorageSync("type", this.type);
      },
      onChangeYearHandle(value) {
        this.year = value;
        mpvue.setStorageSync("year", this.year);
      },
      onChangeMoneyHandle(e) {
        this.sloanMoney = e.target.detail.value;
        mpvue.setStorageSync("sloanMoney", this.sloanMoney);
        console.log(this.yearsList);
      },
      onChangeRateHandle(e) {
        this.rate = e.target.detail.value;
        mpvue.setStorageSync("rate", this.rate);
      },
      caculateLoan() {
        if (!this.rate) {
          wx.showToast({
            title: "请输入贷款利率",
            icon: "none",
            duration: 2000
          });
          return;
        }
        if (!this.sloanMoney) {
          wx.showToast({
            title: "请输入贷款金额",
            icon: "warn",
            duration: 2000
          });
          return;
        }
        let url = `../logs/main?money=${this.sloanMoney}&year=${this.year}&rate=${this.rate}&type=${this.type}`;
        console.log(url);
        mpvue.navigateTo({
          url
        });
      }
    },

    async mounted() {
      this.sloanMoney = await mpvue.getStorageSync("sloanMoney");
      this.rate = await mpvue.getStorageSync("rate");
      this.year = await mpvue.getStorageSync("year") || "3";
      this.type = await mpvue.getStorageSync("type") || "1";
    }
  };
</script>

<style lang="less">
  .main-layer {
    .input-layer {
      border-bottom: 1px solid #eaeaea;
    }
  }
</style>
