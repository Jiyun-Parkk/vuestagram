<template>
  <div class="container">
    <Post v-if="tabIndex == 0" :clickedFilter="clickedFilter">
      <template v-slot:profile-name>{{ postList[0].name }}</template>
    </Post>
    <!-- 필터선택페이지 -->
    <div
      class="upload-image"
      v-if="tabIndex == 1"
      :class="clickedFilter"
      :style="{ background: ` url(${imgURL})no-repeat center 100% / cover ` }"
    ></div>
    <div class="filters" v-if="tabIndex == 1">
      <FilterBox
        :imgURL="imgURL"
        v-for="(filter, idx) in filterList"
        :filter="filter"
        :key="idx"
      >
        <div class="filter-title">
          {{ filter }}
        </div>
        <div
          class="filter-img"
          :class="filter"
          :style="{ background: `url(${imgURL})no-repeat center/cover` }"
          @click="fireFilter(filter)"
        ></div>
      </FilterBox>
    </div>

    <!-- 글작성페이지 -->
    <div
      class="upload-image"
      v-if="tabIndex == 2"
      :class="clickedFilter"
      :style="{ background: ` url(${imgURL})no-repeat center 100% / cover ` }"
    ></div>
    <div class="write" v-if="tabIndex == 2">
      <textarea class="write-box" @input="$emit('write', $event.target.value)">
write!</textarea
      >
    </div>
  </div>
</template>
<script>
import Post from './PostContent.vue';
import FilterBox from './FilterBox.vue';
import { mapState } from 'vuex';
export default {
  props: {
    tabIndex: Number,
    imgURL: String,
  },
  computed: {
    ...mapState(['postList']),
  },
  data() {
    return {
      filterList: [
        'aden',
        '_1977',
        'brannan',
        'brooklyn',
        'clarendon',
        'earlybird',
        'gingham',
        'hudson',
        'inkwell',
        'kelvin',
        'lark',
        'lofi',
        'maven',
        'mayfair',
        'moon',
        'nashville',
        'perpetua',
        'reyes',
        'rise',
        'slumber',
        'stinson',
        'toaster',
        'valencia',
        'walden',
        'willow',
        'xpro2',
      ],
      clickedFilter: '',
    };
  },
  components: {
    Post,
    FilterBox,
  },
  methods: {
    fireFilter(filter) {
      this.clickedFilter = filter;
      this.emitter.emit('fireFilter', this.clickedFilter);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 50px;
}
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
