import { request } from "@/plugins/request";
/** @description 全局最新文章 */
const favorites = slug => {
	return request({
		url: `/articles/${slug}/favorite`,
		method: "POST"
	});
};
const unfavorites = slug => {
	return request({
		url: `/articles/${slug}/favorite`,
		method: "DELETE"
	});
};
export { favorites, unfavorites };
