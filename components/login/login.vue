<!--
      Copyright (C) 2020  SuperGreenLab <towelie@supergreenlab.com>
      Author: Constantin Clauzel <constantin.clauzel@gmail.com>

      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.

      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.

      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
 -->
<template>
  <section :id="$style.container">
    <div :id="$style.modalcontainer">
      <form @submit="loginHandler">
        <div :id="$style.body">
          <div :id="$style.title">
            S<span :id="$style.green">G</span>L LOGIN
            <span :id="$style.close" v-on:click="close()">x</span>
          </div>
          <input type="text" placeholder="Login" v-model="login" />
          <input type="password" placeholder="Password" v-model="password" />
          <div :id="$style.app">
            No account yet? create one on the
            <a target="_blank" href="https://www.supergreenlab.com/app"
              >sgl app</a
            >
          </div>
          <span :id="$style.error" v-if="error">Wrong login/password</span>
          <div :id="$style.button">
            <button @click="loginHandler">LOGIN</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      login: "",
      password: "",
    };
  },
  watch: {
    loggedIn(val) {
      if (val == true) {
        this.$router.push("/sglhq");
      }
    }
  },
  methods: {
    loginHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      const { login, password } = this.$data;
      this.$store.dispatch("auth/login", { login, password });
      return false;
    },
    close() {
      this.$emit('click')
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.loggedIn;
    },
    error() {
      return this.$store.state.auth.error;
    }
  }
};
</script>

<style module lang=stylus>

#container
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  width: 100vw
  height: 100vh
  top: 0
  left: 0
  background-color: rgba(255, 255, 255, 0.5)
  z-index: 10000

#modalcontainer
  display: flex
  position: relative
  flex-direction: column
  align-items: center
  justify-content: center
  background-color: white
  padding: 15pt 40pt 20pt 20pt
  border-radius: 5pt
  border: 4pt solid #3BB30B

#body
  display: flex
  flex-direction: column

#body > input
  margin: 5pt 0
  padding: 5pt 6pt
  border: 1pt solid #C2C2C2
  border-radius: 3pt

#body > input::placeholder
  color: #C2C2C2

#green
  color: #3bb30b

#title
  color: #454545
  font-weight: bold
  margin-bottom: 5pt

#button
  display: flex
  justify-content: flex-end
  align-items: flex-end
  padding: 15pt 0 0 0

#button > button
  border: none
  color: white
  border-radius: 2.5px
  background-color: #3bb30b
  padding: 5pt 15pt
  cursor: pointer

#button > button:hover
  background-color: #4bc31b

#button > button:active
  background-color: #2ba300

#error
  color: red

#app
  color: #454545

#close
  color: #5d5d5d;
  float: right;
  font-size: 13pt;
  cursor: pointer;
  position: absolute;
  right: 18pt;
  top: 10pt;

#close:hover
  color: #3bb30b
</style>
