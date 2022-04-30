<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								type="button"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
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
