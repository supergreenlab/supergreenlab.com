export default async ({ store }) => {
  try {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('promo')) {
      await store.dispatch('checkout/setPromocode', {code: urlParams.get('promo')})
    }
  } catch(e) {
    console.log(e)
  }
}
