<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">Liut Pages</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="auth" class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:class="{ active: tab === 'your_feed' }"
									:to="{ name: 'home', query: { tab: 'your_feed' } }"
									>Your Feed</nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									exact
									:class="{ active: tab === 'global_feed' }"
									:to="{ name: 'home', query: { tab: 'global_feed' } }"
									>Global Feed</nuxt-link
								>
							</li>
							<li v-if="tag" class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{ active: tab === 'tag' }"
									:to="{ name: 'home', query: { tab: 'tag', tag } }"
									>#{{ tag }}</nuxt-link
								>
							</li>
						</ul>
					</div>

					<div
						v-for="article in articles"
						:key="article.slug"
						class="article-preview"
					>
						<div class="article-meta">
							<nuxt-link
								:to="{
									name: 'profile',
									params: {
										username: article.author.username
									}
								}"
								><img :src="article.author.image"
							/></nuxt-link>
							<div class="info">
								<nuxt-link
									class="author"
									:to="{
										name: 'profile',
										params: {
											username: article.author.username
										}
									}"
									>{{ article.author.username }}</nuxt-link
								>
								<span class="date">{{
									article.createdAt | date("MMM DD, YYYY")
								}}</span>
							</div>
							<button
								class="btn btn-outline-primary btn-sm pull-xs-right"
								:class="{ active: article.favorited }"
								:disabled="article.favoriteDisabled"
								@click="onFavorite(article)"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link
							class="preview-link"
							:to="{
								name: 'article',
								params: {
									slug: article.slug
								}
							}"
						>
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
						</nuxt-link>
					</div>

					<el-pagination
						background
						layout="prev, pager, next"
						:total="articlesCount"
						:page-size="limit"
						:current-page="page"
						@current-change="changePage"
					>
					</el-pagination>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link
								v-for="(tag, idx) in tags"
								:key="idx"
								:to="{ name: 'home', query: { tag, tab: 'tag' } }"
								class="tag-pill tag-default"
								>{{ tag }}</nuxt-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
import { globalArticles, feedArticles } from "@/api/article.js";
import { favorites, unfavorites } from "@/api/favorites.js";
import { getTags } from "@/api/tag.js";
export default {
	// ↓ pagename ↓
	name: "Home",
	// ↓ 服务点请求主要数据 服务端阶段无法获取 this 使用 context:{app} ↓
	async asyncData({ query, store }) {
		try {
			const page = Number.parseInt(query.page || 1);
			const tag = query.tag || null;
			const limit = 2;
			const tab = query.tab || "global_feed";
			// store.state.auth 用户已登录 && tab 为 your_feed 标签
			const getArticles =
				store.state.auth && tab === "your_feed" ? feedArticles : globalArticles;
			const [articleRes, tagRes] = await Promise.all([
				getArticles({
					limit,
					offset: (page - 1) * limit,
					tag
				}),
				getTags()
			]);
			const { tags } = tagRes.data;
			const { articles, articlesCount } = articleRes.data;

			return {
				articles: articles.map(v => {
					v.favoriteDisabled = false;
					return v;
				}),
				articlesCount,
				tags,
				page,
				limit,
				tag,
				tab
			};
		} catch (err) {
			console.log("err :>> ", err);
		}
	},
	computed: {
		...mapState(["auth"])
	},
	watchQuery: ["page", "tag", "tab"],
	methods: {
		onClick() {
			this.$router.push("/user");
		},
		changePage(page) {
			this.$router.push({
				name: "home",
				query: {
					page,
					tag: this.tag,
					tab: this.tab
				}
			});
		},
		async onFavorite(article) {
			article.favoriteDisabled = true;
			if (article.favorited) {
				await favorites(article.slug);
				article.favorited = false;
				article.favoritesCount += -1;
			} else {
				await unfavorites(article.slug);
				article.favorited = true;
				article.favoritesCount += 1;
			}
			article.favoriteDisabled = false;
		}
	}
};
</script>
