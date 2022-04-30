import { request } from "@/plugins/request";
/** @description 全局最新文章 */
const feedArticles = params => {
	return request({
		url: "/articles/feed",
		method: "GET",
		params
	});
};
/** @description 全局最新文章 */
const globalArticles = params => {
	return request({
		url: "/articles",
		method: "GET",
		params
	});
};
/** @description 获取文章详细信息 */
const getArticle = slug => request({ url: `/articles/${slug}`, method: "GET" });
/** @description 获取文章评论 */
const getComments = slug =>
	request({ url: `/articles/${slug}/comments`, method: "GET" });
export { feedArticles, globalArticles, getArticle, getComments };
