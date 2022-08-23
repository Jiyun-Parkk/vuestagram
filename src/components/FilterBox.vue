<template>
  <div class="filter-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  methods: {
    fire() {
      this.emitter.emit('fire', '데이터');
    },
  },
};
</script>

<style>
.filter-item {
  width: 110px;
  height: 110px;
  margin: 10px 10px 10px auto;
  display: flex;
  flex-direction: column;
  color: #000;
  text-align: center;
  background-size: cover;
  background-position: center;
}
.filter-title {
  margin-bottom: 5px;
}
.filter-img {
  width: 100px;
  height: 100px;
  align-self: flex-end;
}
</style>
