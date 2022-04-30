<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img src="http://i.imgur.com/Qr71crq.jpg" class="user-img" />
						<h4>Eric Simons</h4>
						<p>
							Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda
							looks like Peeta from the Hunger Games
						</p>
						<button class="btn btn-sm btn-outline-secondary action-btn">
							<i class="ion-plus-round"></i>
							&nbsp; Follow Eric Simons
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<a class="nav-link active" href="">My Articles</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Favorited Articles</a>
							</li>
						</ul>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
							<div class="info">
								<a href="" class="author">Eric Simons</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right">
								<i class="ion-heart"></i> 29
							</button>
						</div>
						<a href="" class="preview-link">
							<h1>How to build webapps that scale</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
						</a>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
							<div class="info">
								<a href="" class="author">Albert Pai</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right">
								<i class="ion-heart"></i> 32
							</button>
						</div>
						<a href="" class="preview-link">
							<h1>
								The song you won't ever stop singing. No matter how hard you
								try.
							</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
							<ul class="tag-list">
								<li class="tag-default tag-pill tag-outline">Music</li>
								<li class="tag-default tag-pill tag-outline">Song</li>
							</ul>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	// ↓ 指定当前页面使用的布局（layouts 根目录下的布局文件） ↓
	layout: "",
	// ↓ 指定页面的中间件，中间件会在页面渲染之前被调用 ↓
	middleware: ["authenticated"],
	// ↓ 校验方法用于校验 动态路由的参数 ↓
	validate({ params }) {
		return params;
	},
	// ↓ 用于判定渲染页面前是否需要将当前页面滚动至顶部 ↓
	scrollToTop: false,
	// ↓ 指定页面切换的过渡动效 ↓
	transition: {},
	// ↓ 服务点请求主要数据 服务端阶段无法获取 this 使用 context:{app} : 加载前调用 ↓
	async asyncData({ app, store, params, query }) {},
	// ↓ 客户端请求次要数据 ↓
	fetch({ store, params }) {
		return new Promise(resolve => resolve());
	},
	// ↓ 配置当前页面的 Meta 标签 ↓
	head() {}
};
</script>
<style lang="scss" scoped></style>
