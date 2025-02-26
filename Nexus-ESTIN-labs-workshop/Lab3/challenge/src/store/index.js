import {
  createStore
} from 'vuex'

import moment from 'moment'

import {
  auth,
  colRef,
  newBlogsRef
} from '../firebase/index.js';
import {
  getDoc,
  getDocs,
  doc,
  serverTimestamp
} from 'firebase/firestore';

const randomColor = () => {
  var alphaBetique = '0123456789abcdef';
  let size = alphaBetique.length;
  return `#${alphaBetique[Math.floor(Math.random() * size)]}${alphaBetique[Math.floor(Math.random() * size)]}${alphaBetique[Math.floor(Math.random() * size)]}${alphaBetique[Math.floor(Math.random() * size)]}${alphaBetique[Math.floor(Math.random() * size)]}${alphaBetique[Math.floor(Math.random() * size)]}`
}

export {
  randomColor
};

export default createStore({
  state: {
    theFile: null,
    blogPosts: [],
    currentBlogPosts: [],
    currentTag: 'All',
    blogUsernames: [],
    blogUsers: [],
    totalBlogTags: [],
    contentLoaded: false,
    blogHTML: 'Write your blog title here...',
    blogTitle: '',
    blogCoverPhoto: '',
    blogCoverFileURL: null,
    blogID: '',
    blogTime: moment(serverTimestamp()).format('LL'),
    blogTags: [],
    postEdit: false,
    isAdmin: false,
    requestAdmin: false,
    firstName: '',
    lastName: '',
    initialName: '',
    username: '',
    email: '',
    color: '#000',
    notifications: [],
    id: '',
    userState: false
  },
  getters: {
    recentBlogCards(state) {
      return state.blogPosts.slice(2, 6);
    },
    mainBlogPosts(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogAdmins(state) {
      return state.blogUsers.filter((user) => {
        return user.isAdmin;
      })
    },
    blogUsersRequest(state) {
      return state.blogUsers.filter((user) => {
        return (user.requestAdmin && !user.isAdmin);
      })
    }
  },
  mutations: {
    toggleEditPost(state, payload) { //blogs
      state.postEdit = payload;
    },
    currentUserData(state, res) {
      state.firstName = res.data().firstName;
      state.lastName = res.data().lastName;
      state.username = res.data().username;
      state.email = res.data().email;
      state.isAdmin = res.data().isAdmin;
      state.requestAdmin = res.data().requestAdmin;
      state.notifications = res.data().notifications;
      state.color = res.data().color;
      state.id = res.id;
    },
    changeCurrentTag(state, payload) {
      state.currentTag = payload;
    },
    changeCurrentBlogPosts(state, payload) {
      state.currentBlogPosts = payload;
    },
    editFirstLogin(state, payload) {
      state.firstLogin = payload;
    },
    setInitialName(state) {
      state.initialName = state.firstName[0] + state.lastName[0];
    },
    updateUserState(state, payload) {
      state.userState = payload;
    },
    firstNameEdit(state, payload) {
      state.firstName = payload;
    },
    lastNameEdit(state, payload) {
      state.lastName = payload;
    },
    usernameEdit(state, payload) {
      state.username = payload;
    },
    colorEdit(state, payload) {
      state.color = payload;
    },
    editBlogHTML(state, payload) {
      state.blogHTML = payload;
    },
    editBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    editFileName(state, payload) {
      state.blogCoverPhoto = payload;
    },
    editFileURL(state, payload) {
      state.blogCoverFileURL = payload;
    },
    editblogTime(state, payload) {
      state.blogTime = payload;
    },
    editBlogTags(state, payload) {
      state.blogTags = payload;
    },
    resetBlogs(state) {
      state.blogPosts = [];
    },
    resetUsers(state) {
      state.blogUsers = [];
    },
    resetUserNames(state) {
      state.blogUsernames = [];
    },
    resetTotalBlogTags(state) {
      state.totalBlogTags = [];
    },
    resetBlogTags(state) {
      state.blogTags = [];
    },
    editFile(state, payload) {
      state.theFile = payload;
    },
    currentBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogTags = payload.blogTags;
      state.blogHTML = payload.blogHTML;
      state.blogCoverPhoto = payload.blogCoverPhoto;
      state.blogCoverFileURL = payload.blogCoverFileURL;
      state.blogID = payload.blogID;
    }
  },
  actions: {
    getNewUserData({
      commit
    }) {
      const docRef = doc(colRef, auth.currentUser.uid);
      getDoc(docRef).then((res) => {
        commit("currentUserData", res);
        commit("setInitialName");
      });
    },
    async getUsers({
      state
    }) {
      await getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            state.blogUsernames.push(doc.data().username.toLowerCase());
            state.blogUsers.push({
              ...doc.data(),
              id: doc.id
            })
          })
        });
      state.contentLoaded = true;
    },
    async getPosts({
      state
    }) {
      await getDocs(newBlogsRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            state.blogPosts.push({
              ...doc.data()
            });
            state.totalBlogTags.push(doc.data().blogTags);
          })
        });
      state.totalBlogTags = Array.from(new Set(state.totalBlogTags.flat()));
      state.currentBlogPosts = state.blogPosts;
      state.contentLoaded = true;
    }
  },
  modules: {}
})