import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cars from '../views/Cars.vue';
import AdminLogin from '../views/AdminLogin.vue';
import Car from '../views/Car.vue';
import Messages from '../views/Messages.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Eliteauto'
    }
  },
  {
    path: '/cars',
    name: 'Cars',
    component: Cars,
    meta: {
      title: 'Coches'
    }
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/car/:id',
    name: 'Car',
    component: Car
  },
  {
    path: '/messages/',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/contacto/',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'Contacto'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function guards(to, next) {
  if (to.name == 'Messages' && localStorage.getItem("admin") !== 'true') {
    next({to: 'Home'});
  } else {
    next();
  }

}

router.beforeEach((to, from, next) => {
  

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }


  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return guards(to, next);

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  guards(to, next);

});

export default router
