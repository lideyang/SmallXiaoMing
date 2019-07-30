<template>
  <radio-group class="radio-layer" @change="onChangeTypeHandle">
    <span class="title">{{title}}:</span>
    <label v-for="item in radioList" :key="item.name">
      <radio :value="item.value" :checked="item.checked"/>
      {{item.name}}
    </label>
  </radio-group>
</template>
<script>
  export default {
    props: {
      title: "",
      list: [],
      value: ""
    },
    data() {
      return {};
    },
    computed: {
      radioList() {
        return this.list.map(item => {
          item.checked = item.value === this.value ? true : false;
          return item;
        });
      }
    },
    methods: {
      onChangeTypeHandle(e) {
        this.$emit("change", e.mp.detail.value);
      }
    }
  };
</script>
<style lang="less">
  .radio-layer {
    border-bottom: 1px solid #eaeaea;
  }

  .radio-layer {
    padding: 10px 15px;

    .title {
      color: #495060;
      min-width: 65px;
      display: inline-block;
    }
  }
</style>
