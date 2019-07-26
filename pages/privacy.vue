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
  <section :id="$style.container">
    <div :id='$style.header'>
      <Header responsiveHide='true' />
    </div>
    <div :id='$style.body'>
      <div :id='$style.title'>
        <SectionTitle title=''
            green='Privacy Policy'
            separator='true'/>
      </div>
    </div>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-12 col-md-12 ml-auto pt-5 pt-md-0">
                <p class="lead" style="margin-top: 65px;">
                    <p><strong>GENERAL</strong><br />
                        Your privacy is important to us. This privacy policy is intended to give you  confidence in the privacy and security of the personal information we obtain  from you while visiting our website.<br />
                        However, please note that we are not responsible for any use of  your personal information you provide to third-party applications or websites  that may be accessed via our website. We recommend that you review the privacy  policy of any third-party applications or websites that you use.</p>
                    <p> <strong>COLLECTION OF PERSONAL INFORMATION</strong><br />
                        When you use our Website, you may be asked for personally identifiable  information such as your name, address, email address, &amp; telephone number.<br />
                        By giving us such information, you will need to consent to our  using it in the manner described in this policy. You may withdraw your consent  at any time by emailing us at <a href="mailto:info@supergreenlab.com">info@supergreenlab.com</a>. We  will return or destroy your personal information within five days of receipt of  your withdrawal of consent.<br />
                        Cookie information, pages you have requested, and your IP  address may also be recorded by us and/or third parties from your browser as  set out in this policy.</p>
                    <p> <strong>USE OF PERSONAL INFORMATION</strong><br />
                        We may use personal information to allow us to process your requests, send out  newsletters, personalize your visit to our Websites, and enable us to improve  the services we offer. We may occasionally carry out market research and send  you details of services and offers that we think may be of interest to you. If  you do not wish to receive such information, please email <a href="mailto:info@supergreenlab.com">info@supergreenlab.com</a>. Alternatively, when we  send you e-mail, it will contain a provision for you to opt out of receiving  any further information from us.<br />
                        <strong>DISCLOSURE OF PERSONAL INFORMATION</strong></p>
                    <p>  We may provide information about you to our employees and agents in order to  administer any accounts, products and services provided to you by Palm Springs  Winter Classic.<br />
                        We will not disclose your personal information to any third  party unless you have consented to such disclosure or where we are required to  do so by law. Should you breach our terms and conditions or terms of use or if  we are under a duty to disclose or share your personal data in order to comply  with any legal obligation, we may disclose your information to a relevant  authority. This may include exchanging information with other companies and  organizations for the purposes of fraud protection and credit risk reduction.  Any disclosure of personal information will be strictly controlled and made  fully in accordance with current U.S. law.</p>
                    <p> <strong>COOKIES</strong><br />
                        Cookies are small data files that a website you visit may save on your computer  or handheld device that usually includes an anonymous unique identifier. Our  website may use cookies for user authentication, keeping track of your  preferences, promotional campaigns, tracking our audience size and traffic  patterns, and in certain other cases. We may include small graphic images in  our email messages and newsletters to determine whether the messages were  opened and the links were viewed.<br />
                        Third-party advertisers may also create and access cookies,  which will be subject to their privacy policies – we accept no responsibility  or liability for the use of such third parties&rsquo; cookies. If you do not wish  cookies to be placed on your PC or handheld device, then they can be disabled  in your web browser. The option to do so is normally found in your browser&rsquo;s  &ldquo;security settings&rdquo; section. Please note that permanently disabling cookies in  your browser may hinder your use of our websites as well as other websites and  interactive services.</p>
                    <p> <strong>SECURITY</strong><br />
                        All security on our website is treated seriously. Where applicable, we  undertake security steps to protect data transmissions. However, this is not a  guarantee that such data transmissions cannot be accessed, altered or deleted  due to firewall or other security software failures. If you have any further  concerns about security, please email us at&nbsp;<a href="mailto:info@supergreenlab.com">info@supergreenlab.com</a>.</p>
                    <p> <strong>POLICY CHANGES</strong><br />
                        Changes in this policy will be posted on our Website. You are advised to check  our Website regularly to view our most recent privacy policy.<br />
                        Should you have any questions,  please contact us at&nbsp;<a href="mailto:info@supergreenlab.com">info@supergreenlab.com</a></p>   
                </div>
            </div>
        </div>
    <Footer/>
  </section>
</template>

<script>
import Header from '~/components/header.vue'
import Top from '~/components/homesection-top.vue'
import SectionTitle from '~/components/sectiontitle.vue'
import Footer from '~/components/homesection-footer.vue'


export default {
  components: { Header, SectionTitle, Footer},
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    if (this.timeout) clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.handleScroll);
  },
  head () {
    return {
      title: 'Privacy Policy - SuperGreenLab',
      meta: [
        { hid: 'description', name: 'description', content: 'SuperGreenLab Privacy Policy Statement. You will find our data protection notice here.' }
      ]
    }
  },
}
</script>

<style module lang=stylus>

#container
  display: flex
  width: 100%
  flex-direction: column
  justify-content: center
  align-items: center
  margin-top: 20px

#header
  position: fixed
  width: 100%
  top: 0 
  left: 0
  z-index: 1000

#body
  width: 100%
  max-width: 900pt

a 
  color: #4c4c4c;
  font-size: 15px;

.separator
  height: 2pt
  margin: 30pt 0
  background-color: #efefef

#shop
  height: 150pt
  margin: 30pt
  background-image: url('~assets/img/shop.svg')
  background-position: center
  background-repeat: no-repeat
  background-size: contain

#container
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

</style>
