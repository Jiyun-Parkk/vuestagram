<template>
  <div class="post" v-for="(post, idx) in postList" :key="idx" :id="`post${idx}`">
    <div class="post-header">
      <div class="profile" :style="`background-image: url(${post.userImage})`"></div>
      <span class="profile-name"><slot name="profile-name"></slot></span>
    </div>
    <div
      class="post-body"
      :style="`background-image: url(${post.postImage})`"
      :class="post.filter"
      @click="
        () => {
          checkLike = !checkLike;
          changeLikes(idx);
        }
      "
    ></div>
    <div class="post-content">
      <p>{{ post.likes }} Likes</p>
      <p>
        <strong>{{ post.filter }}</strong> {{ post.content }}
      </p>
      <p class="date">{{ post.date }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
  props: {
    clickedFilter: String,
  },
  computed: {
    ...mapState(['postList']),
  },
  methods: {
    ...mapMutations(['changeLikes']),
  },
};
</script>

<style scoped>
.post {
  width: 100%;
}
.profile {
  width: 30px;
  height: 30px;
  background-size: cover;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
