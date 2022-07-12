export default async ({ store }) => {
  addEventListener('load', async () => {
    try {
      console.log(window.location.search)
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('promo')) {
        const sglSellerIDs = [process.env.sglSellerID, process.env.sgteuSellerID, process.env.sgtusSellerID]
        await Promise.all(sglSellerIDs.map(sglSellerID => store.dispatch('checkout/fetchPromocode', {promocode: urlParams.get('promo'), sellerid: sglSellerID})))
      }
    } catch(e) {
      console.log(e)
    }
  })
}
