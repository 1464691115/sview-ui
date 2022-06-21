<template>
	<i class="s-icon" :style="iconStyle" v-html="icon_list[props.icon]" />
</template>
<script lang="ts" setup>
import { computed, CSSProperties, reactive } from "vue";
import { Px } from "../utils";
interface Props {
	icon: keyof typeof icon_list
	size?: string | number;
	color?: string;
}

const icon_list = reactive({
	loading: '&#xe73c;',
	add: '&#xe6df;',
	minus: '&#xe683;',
	clothing: '&#xe655;',
	link: '&#xe656;',
	camera_fill: '&#xe657;',
	camera: '&#xe658;',
	clock: '&#xe65b;',
	jisufan: '&#xe65c;',
	kuaisufan: '&#xe65d;',
	select_fill: '&#xe660;',
	select: '&#xe661;',
	back: '&#xe662;',
	go: '&#xe617;',
	top: '&#xe663;',
	down: '&#xe664;',
	right: '&#xe665;',
	left: '&#xe666;',
	switch: '&#xe667;',
	lbs_fill: '&#xe668;',
	lbs: '&#xe669;',
	refresh: '&#xe66a;',
	tag: '&#xe66c;',
	sharpen: '&#xe66d;',
	wow: '&#xe66e;',
	sad: '&#xe66f;',
	smile: '&#xe670;',
	gird: '&#xe672;',
	flash_off: '&#xe673;',
	flash_auto: '&#xe674;',
	flash: '&#xe675;',
	dark: '&#xe676;',
	light: '&#xe677;',
	Vignetting: '&#xe678;',
	crop: '&#xe679;',
	temperature: '&#xe67a;',
	brightness: '&#xe67b;',
	adjust: '&#xe67c;',
	rotating: '&#xe67d;',
	delete: '&#xe67e;',
	diamond: '&#xe67f;',
	baby: '&#xe680;',
	gift: '&#xe681;',
	edit: '&#xe682;',
	fav_fill: '&#xe685;',
	fav: '&#xe686;',
	write: '&#xe687;',
	level: '&#xe688;',
	comments: '&#xe689;',
	feedback: '&#xe68a;',
	share: '&#xe68b;',
	service: '&#xe68c;',
	crown: '&#xe68d;',
	user: '&#xe68e;',
	social_fill: '&#xe691;',
	social: '&#xe692;',
	fanli_fill: '&#xe693;',
	fanli: '&#xe694;',
	home_fill: '&#xe695;',
	home: '&#xe696;',
	date: '&#xe697;',
	search: '&#xe699;',
	scan: '&#xe69a;',
	check: '&#xe69b;',
	like: '&#xe69c;',
	like_fill: '&#xe69d;',
	LOCK: '&#xe69e;',
	mobile: '&#xe6a0;',
	QR: '&#xe6a5;',
	close_fill: '&#xe6a6;',
	close: '&#xe6a7;',
	attachment: '&#xe6a9;',
	pic: '&#xe6aa;',
	more: '&#xe6ad;',
	jifenbao: '&#xe6af;',
	rmb: '&#xe6b0;',
	plane: '&#xe6b1;',
	plane_fill: '&#xe6b2;',
	computer: '&#xe6b3;',
	ascend: '&#xe6b4;',
	sort: '&#xe6b5;',
	'sort-ascend': '&#xe613;',
	'sort-descend': '&#xe614;',
	'triangle': '&#xe615;',
	'triangle-invert': '&#xe616;',
	falling: '&#xe6b6;',
	select2_fill: '&#xe6b7;',
	select2: '&#xe6b8;',
	filter: '&#xe6b9;',
	backtop: '&#xe6c6;',
	zoomcard: '&#xe6c9;',
	'cloud-fill': '&#xe6cc;',
	cloud: '&#xe6cd;',
	'download-fill': '&#xe6ce;',
	download: '&#xe6cf;',
	applewatch: '&#xe6d2;',
	'close-2': '&#xe6dd;',
	'stationary-trend': '&#xe6de;',
	up: '&#xe6e0;',
})
const props = defineProps<Props>();
const iconStyle = computed<CSSProperties>(() => ({
	fontSize: Px(props.size || 48),
	lineHeight: Px(props.size || 48),
	width: Px(props.size || 48),
	height: Px(props.size || 48),
	color: props.color || '#333',
}));
</script>
<style lang="scss" scoped>
.s-icon {
	position: relative;
	font-family: "iconfont";
	transition: all 0.3s;
}

@font-face {
  font-family: 'iconfont';  /* Project id 3433285 */
  src: url('../lib/font/iconfont.woff2') format('woff2'),
       url('../lib/font/iconfont.woff') format('woff'),
       url('../lib/font/iconfont.ttf') format('truetype');
}
</style>