export default ({ app }) => {
	let _tsid = 'XE87380AEEFF1397FB483F75AC335E84B'; 
	window._tsConfig = { 
		'yOffset': '0', /* offset from page bottom */
		'letiant': 'reviews', /* default, reviews, custom, custom_reviews */
		'customElementId': '', /* required for letiants custom and custom_reviews */
		'trustcardDirection': '', /* for custom letiants: topRight, topLeft, bottomRight, bottomLeft */
		'customBadgeWidth': '', /* for custom letiants: 40 - 90 (in pixels) */
		'customBadgeHeight': '', /* for custom letiants: 40 - 90 (in pixels) */
		'disableResponsive': 'false', /* deactivate responsive behaviour */
		'disableTrustbadge': 'false' /* deactivate trustbadge */
	};
	let _ts = document.createElement('script');
	_ts.type = 'text/javascript'; 
	_ts.charset = 'utf-8'; 
	_ts.async = true; 
	_ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js'; 
	let __ts = document.getElementsByTagName('script')[0];
	__ts.parentNode.insertBefore(_ts, __ts);
}
