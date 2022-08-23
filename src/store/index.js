import { createStore } from 'vuex';
import postList from '../assets/postData.js';
import axios from 'axios';
export default createStore({
  state: {
    postList: postList,
    clickedNum: 0,
    createIdx: 0,
    checkLike: [],
  },
  getters: {},
  mutations: {
    changeLikes(state, index) {
      state.checkLike[index] = !state.checkLike[index];
      if (state.checkLike[index] === true) {
        state.postList[index].likes = state.postList[index].likes + 1;
      } else {
        state.postList[index].likes = state.postList[index].likes - 1;
      }
    },
    pushNewPost(state, newPost) {
      state.postList.push(newPost);
    },
    unshiftNewPost(state, newPost) {
      state.postList.unshift(newPost);
    },
    setClickedNum(state) {
      state.clickedNum === 0 ? (state.clickedNum = 1) : (state.clickedNum = 0);
    },
    setCreateIdx(state) {
      state.createIdx = state.postList.length - 1;
    },
  },
  actions: {
    //ajax
    //context => store
    //action의 파라미터는 store의 것들을 가리킨다
    getMoreData(context) {
      axios
        .get(`https://codingapple1.github.io/vue/more${context.state.clickedNum}.json`)
        .then(response => {
          const data = response.data;
          context.commit('pushNewPost', data);
          context.commit('setClickedNum');
          context.commit('setCreateIdx');
        })
        .then(() => {
          const lastPostClient = document
            .getElementById(`post${context.state.createIdx}`)
            .getBoundingClientRect();
          window.scrollBy({ top: lastPostClient.top, left: 0, behavior: 'smooth' });
        });
    },
  },
  modules: {},
});
