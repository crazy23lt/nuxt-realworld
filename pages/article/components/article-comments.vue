<template>
	<div>
		<form class="card comment-form">
			<div class="card-block">
				<textarea
					class="form-control"
					placeholder="Write a comment..."
					rows="3"
				></textarea>
			</div>
			<div class="card-footer">
				<img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
				<button class="btn btn-sm btn-primary">Post Comment</button>
			</div>
		</form>
		<div v-for="comment in comments" :key="comment.id" class="card">
			<div class="card-block">
				<p class="card-text">
					{{ comment.body }}
				</p>
			</div>
			<div class="card-footer">
				<nuxt-link
					:to="{
						name: 'profile',
						params: { username: comment.author.username }
					}"
					class="comment-author"
				>
					<img :src="comment.author.image" class="comment-author-img" />
				</nuxt-link>
				&nbsp;
				<nuxt-link
					:to="{
						name: 'profile',
						params: { username: comment.author.username }
					}"
					class="comment-author"
				>
					{{ comment.author.username }}
				</nuxt-link>
				<span class="date-posted">{{
					comment.createdAt | date("MMM DD, YYYY")
				}}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { getComments } from "@/api/article.js";
export default {
	validate({ params }) {
		return params;
	},
	props: {
		article: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			comments: null
		};
	},
	// ↓ 配置当前页面的 Meta 标签 ↓
	head() {},
	async mounted() {
		const { data } = await getComments(this.article.slug);
		this.comments = data.comments;
	}
};
</script>
<style lang="scss" scoped></style>
