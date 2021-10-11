export default async ({ store }) => {
  addEventListener('load', async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('promo')) {
        await store.dispatch('checkout/fetchPromocode', {promocode: urlParams.get('promo'), sellerid: process.env.sglSellerID})
      }
    } catch(e) {
      console.log(e)
    }
  })
}
