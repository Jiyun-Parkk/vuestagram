<template>
  <div class="header" v-if="tab == 1 || tab == 2">
    <ul class="header-button-left">
      <li @click="tab = 0">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li @click="tab = 2">Next</li>
    </ul>
    <i class="fa-brands fa-vuejs logo"></i>
  </div>

  <ul ref="tabmenu" class="tabmenu">
    <li :class="{ active: tab == 0 }">Post</li>
    <li :class="{ active: tab == 1 }">Filter</li>
    <li :class="{ active: tab == 2 }">Text</li>
  </ul>

  <Container :tabIndex="tab" :imgURL="imgURL" @write="newPostText = $event" />

  <div class="footer">
    <div class="show-more" v-if="tab == 0">
      <div @click="getMoreData">Show More</div>
    </div>
    <div class="footer-button-plus" v-if="tab !== 2">
      <input @change="upload" multiple type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">Add Photo</label>
    </div>
    <div class="push-new-post" v-if="tab == 2" @click="posting">Add Post</div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import Container from './components/PostContainer.vue';

export default {
  components: {
    Container,
  },
  data() {
    return {
      tab: 0,
      imgURL: 'https://placeimg.com/640/480/arc',
      newPost: {},
      newPostText: '',
      clickedFilterd: '',
      counter: 0,
    };
  },

  methods: {
    ...mapMutations(['unshiftNewPost']),
    ...mapActions(['getMoreData']),
    upload(e) {
      let imgFile = e.target.files;
      this.imgURL = URL.createObjectURL(imgFile[0]);
      this.tab = 1;
    },
    posting() {
      this.newPost = {
        name: 'Kim Hyun',
        userImage: this.imgURL,
        postImage: this.imgURL,
        likes: 36,
        date: 'May 15',
        liked: false,
        content: this.newPostText,
        filter: this.clickedFilterd,
      };
      this.unshiftNewPost(this.newPost);
      //this.$store.commit('unshiftNewPost', this.newPost);
      this.tab = 0;
    },
  },
  watch: {
    tab(tab) {
      if (tab === 1 || tab === 2) {
        this.$refs.tabmenu.style.top = '40px';
      } else {
        this.$refs.tabmenu.style.top = '0px';
      }
    },
  },
  mounted() {
    this.emitter.on('fireFilter', filter => {
      this.clickedFilterd = filter;
    });
    this.$refs.tabmenu.childNodes.forEach((ele, idx) => {
      ele.addEventListener('click', () => {
        this.tab = idx;
      });
    });
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  font-size: 30px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
  border-bottom: 1px solid #eee;
}
.show-more {
  text-align: center;
  padding-top: 12px;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
.push-new-post {
  text-align: center;
  cursor: pointer;
}
.tabmenu {
  background-color: white;
  top: 0px;
  left: 50%;
  transform: translate(-50%);
  position: fixed;
  width: 458px;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  margin: 0;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  z-index: 100;
}
.tabmenu li {
  align-self: center;
  cursor: pointer;
  width: 60px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
}
.tabmenu li.active {
  color: rgb(187, 136, 25);
  border: 1px solid rgb(187, 136, 25);
}
#app {
  box-sizing: border-box;
  font-family: 'consolas';
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
