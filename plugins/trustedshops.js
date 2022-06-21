/*
 * Copyright (C) 2022  SuperGreenLab <towelie@supergreenlab.com>
 * Author: Constantin Clauzel <constantin.clauzel@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export default ({ app }) => {
	var _tsid = 'XE87380AEEFF1397FB483F75AC335E84B'; 
	window._tsConfig = { 
		'yOffset': '50', /* offset from page bottom */
		'variant': 'custom', /* default, reviews, custom, custom_reviews */
		'customElementId': 'trustedshops', /* required for variants custom and custom_reviews */
		'trustcardDirection': '', /* for custom variants: topRight, topLeft, bottomRight, bottomLeft */
		'customBadgeWidth': '', /* for custom variants: 40 - 90 (in pixels) */
		'customBadgeHeight': '', /* for custom variants: 40 - 90 (in pixels) */
		'disableResponsive': 'false', /* deactivate responsive behaviour */
		'disableTrustbadge': 'false' /* deactivate trustbadge */
	};
	var _ts = document.createElement('script');
	_ts.type = 'text/javascript'; 
	_ts.charset = 'utf-8'; 
	_ts.async = true; 
	_ts.src = '//widgets.trustedshops.com/js/' + _tsid + '.js'; 
	var __ts = document.getElementsByTagName('script')[0];
	__ts.parentNode.insertBefore(_ts, __ts);
}
