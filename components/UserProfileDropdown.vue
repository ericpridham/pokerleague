<template>
  <div class="ml-3 relative">
    <button v-if="!isLoggedIn" @click="login()">Login</button>
    <div v-else>
      <button @click.prevent="userMenuIsOpen = !userMenuIsOpen" class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
      </button>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-class=""transform opacity-0 scale-95
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="userMenuIsOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Your Profile</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Settings</a>
        <a @click.prevent="logout()" href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
      </div>
    </transition>
  </div>
</template>

<script>
import netlifyIdentity from "netlify-identity-widget";

export default {
  name: "UserProfileDropdown",
  data() {
    return {
      userMenuIsOpen: false,
      currentUser: null,
    }
  },
  mounted() {
    netlifyIdentity.on('init', user => this.currentUser = user);
    netlifyIdentity.on('login', user => {
      this.setCurrentUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('signup', user => {
      this.setCurrentUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on('logout', user => {
      this.currentUser = null;
      this.userMenuIsOpen = false;
    });

    netlifyIdentity.init({});
  },
  computed: {
    isLoggedIn() {
      return this.currentUser !== null;
    }
  },
  methods: {
    setCurrentUser(user) {
      this.currentUser = {
        username: user.user_metadata.full_name,
        email: user.email,
        access_token: user.token.access_token,
        expires_at: user.token.expires_at,
        refresh_token: user.token.refresh_token,
        token_type: user.token.token_type,
        data: user.user_metadata,
      };
    },
    login() {
      netlifyIdentity.open('login');
    },
    logout() {
      netlifyIdentity.logout();
    },
    setSettings() {
      netlifyIdentity.gotrue.currentUser().update({
        data: {
          whenSet: Date.now()
        }
      }).then(user => {
        this.setCurrentUser(user);
      });
    }
  }
}
</script>

<style scoped>

</style>
