<template>
  <div class="main-layer">
    <ul>
      <li>
        <span class="name">贷款金额：</span>
        <span class="value"><span>{{money}}</span>元</span>
      </li>
      <li>
        <span class="name">贷款期限：</span>
        <span class="value"><span>{{month}}</span>期</span>
      </li>
      <li>
        <span class="name">综合服务费：</span>
        <span class="value"><span>{{comCost}}</span>元</span>
      </li>
      <li>
        <span class="name">分期本金：</span>
        <span class="value"><span>{{splitAmount}}</span>元</span>
      </li>
      <li>
        <span class="name">银行手续费：</span>
        <span class="value"><span>{{bankCost}}</span>元</span>
      </li>
      <li>
        <span class="name">总还款：</span>
        <span class="value"><span>{{totalRepay}}</span>元</span>
      </li>
      <li>
        <span class="name">每月还款：</span>
        <span class="value"><span>{{monthRepay}}</span>元</span>
      </li>
      <li>
        <span class="name">首月多还：</span>
        <span class="value"><span>{{firstMonthRepay}}</span>元</span>
      </li>
      <li v-if="type===1">
        <span class="name">车损保额：</span>
        <span class="value"><span>{{cardInsured}}</span>元</span>
      </li>

      <li v-show="type===2">
        <span class="name">发票金额：</span>
        <span class="value"><span>{{invoiceAmount}}</span>元</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { formatCurrency } from "@/utils/index";

  export default {
    components: {},

    data() {
      return {
        money: 0,
        month: 0,
        rate: 0,
        type: 1,
        ringList: [],
        houseTotalPrice: ""
      };
    },
    mounted() {
      this.money = Number(this.$root.$mp.query.money);
      this.month = Number(this.$root.$mp.query.year) * 12;
      this.rate = Number(this.$root.$mp.query.rate);
      this.type = Number(this.$root.$mp.query.type);
    },
    created() {

    },
    filters: {
      formatCurrency
    },
    computed: {
      realRate() {
        if (this.type === 2) {
          return this.rate + (this.rate - 12) * .1;
        }
        return this.rate + (this.rate - 14.5) * .1;
      },
      totalRate() {
        return 1 + this.realRate * .01;
      },
      realSplitAmount() {
        return (this.money * this.totalRate / 1.09).toFixed(2);
      },
      splitAmount() {
        return Math.ceil(this.realSplitAmount / 100) * 100;
      },
      monthRepayAmount() {
        return Math.floor(this.splitAmount / this.month);
      },
      monthRepayInterest() {
        return Math.floor(this.bankCost / this.month);
      },
      totalRepay() {
        return Math.floor(this.splitAmount * 1.09);
      },
      bankCost() {
        return this.totalRepay - this.splitAmount;
      },
      comCost() {
        return this.splitAmount - this.money;
      },
      monthRepay() {
        return this.monthRepayAmount + this.monthRepayInterest;
      },
      firstMonthRepay() {
        return this.totalRepay - this.monthRepay * this.month;
      },
      cardInsured() {
        return Math.ceil((this.splitAmount / 0.7 / 1.2) / 100) * 100;
      },
      invoiceAmount() {
        return Math.ceil(this.splitAmount / 0.8 / 1000) * 1000;
      }
    }
  };
</script>

<style lang="less">
  .main-layer {
    padding: 20px;

    ul {
      li {
        height: 40px;
        line-height: 40px;

        .name {
          color: #333;
        }

        .value {
          float: right;
          color: #999;

          span {
            font-weight: bold;
            color: #ff6b00;
          }
        }
      }
    }
  }
</style>
