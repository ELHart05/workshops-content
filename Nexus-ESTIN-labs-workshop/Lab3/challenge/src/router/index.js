import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import LoginView from '../views/Auth/LoginView.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import TotalBlogsView from '../views/TotalBlogs/TotalBlogsView.vue'
import ResetPasswordView from '../views/Auth/ResetPasswordView.vue'
import ProfileView from '../views/Profile/ProfileView.vue'
import AdminView from '../views/Admin/AdminView.vue'
import AdminRequestView from '../views/Admin/AdminRequestView.vue'
import CreatePostView from '../views/Post/CreatePostView.vue'
import PreviewNewPostView from '../views/Post/PreviewNewPostView.vue';
import ViewBlog from '../views/Post/ViewBlog.vue';
import EditPostView from '../views/Post/EditPostView.vue';
import PathNotFoundView from '../views/Error/PathNotFoundView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: {
      title: 'Register'
    }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPasswordView,
    meta: {
      title: 'Reset Password'
    }
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: TotalBlogsView,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: {
      title: 'Admin'
    }
  },
  {
    path: '/admin-request',
    name: 'admin-request',
    component: AdminRequestView,
    meta: {
      title: 'Admin'
    }
  },
  {
    path: '/create-post',
    name: 'create-post',
    component: CreatePostView,
    meta: {
      title: 'Create Post'
    }
  },
  {
    path: '/post-review',
    name: 'post-review',
    component: PreviewNewPostView,
    meta: {
      title: 'Post Review'
    }
  },
  {
    path: '/view-post/:blogid',
    name: 'view-post',
    component: ViewBlog,
    meta: {
      title: 'View Post'
    }
  },
  {
    path: '/edit-post/:blogid',
    name: 'edit-post',
    component: EditPostView,
    meta: {
      title: 'Edit Post'
    }
  },
  {
    path: '/home',
    redirect: '/'
  },
  {
    name: 'pathnotfound',
    path: '/:pathMatch(.*)*',
    component: PathNotFoundView,
    meta: {
      title: 'Error'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | RealBlogs`;
  next();
})

export default router