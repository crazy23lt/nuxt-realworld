<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<!-- 文章标题 -->
				<h1>{{ article.title }}</h1>
				<!-- 用户面板 -->
				<article-meta :article="article" />
			</div>
		</div>
		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.body"></div>
			</div>
			<hr />
			<div class="article-actions">
				<!-- 用户面板 -->
				<article-meta :article="article" />
			</div>
			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<article-comments :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
import { getArticle } from "@/api/article.js";
export default {
	components: {
		ArticleMeta,
		ArticleComments
	},
	async asyncData({ params }) {
		const { data } = await getArticle(params.slug);
		const { article } = data;
		const md = new MarkdownIt();
		article.body = md.render(article.body);
		return {
			article
		};
	},
	head() {
		return {
			title: `${this.article.title} - RealWrold`,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.article.description
				}
			]
		};
	}
};
</script>
<style lang="scss" scoped></style>
