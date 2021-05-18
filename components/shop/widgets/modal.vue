<!--
      Copyright (C) 2019  SuperGreenLab <towelie@supergreenlab.com>
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
  <section>
    <transition :class="$style.modal">
      <div :id="$style.mask">
        <div :id="$style.wrapper">
          <div :class="$style.container">
            <div :id="$style.header">
              <slot name="header">
                Subscribe to SuperGreenNewsletters
              </slot>
            </div>
            <div :id="$style.body">
              <slot name="body">
                <label for="newsletter">Email:</label>
                <input type="email">
              </slot>
            </div>
            <div :id="$style.footer">
              <slot name="footer">
                <div :id='$style.btnSubscribe' @click="$emit('close')">
                  OK
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {

}
</script>

<style module lang=stylus>

#mask
  position: fixed
  z-index: 9998
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: table
  transition: opacity 0.3s ease

#wrapper
  display: table-cell
  vertical-align: middle

.container
  width: 300px
  margin: 0px auto
  padding: 5px 20px
  background-color: #fff
  border-radius: 2px
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33)
  transition: all 0.420s ease
  font-family: Helvetica, Arial, sans-serif

#header
  margin-top: 0
  color: #3bb30b

#body
  margin: 20px 0

#footer
  display:flex
  justify-content: flex-end

#btnSubscribe
  width: 50px
  cursor: pointer
  background-color: #3BB30B
  padding: 3pt 5pt
  border-radius: 3pt
  color: white
  text-transform: uppercase

.modal-enter
  opacity: 0

.modal-leave-active
  opacity: 0

.modal-enter .container,
.modal-leave-active .container
  -webkit-transform: scale(1.1)
  transform: scale(1.1)


</style>
