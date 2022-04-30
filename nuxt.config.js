/**
 * nuxt.js 配置文件
 */
module.exports = {
	head: {
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" }
		],
		link: [
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css?family=Roboto"
			}
		]
	},
	router: {
		base: "/", // 应用的根 URL
		linkActiveClass: "active", // 组件默认的激活类名。
		extendRoutes(routes, resolve) {
			routes.splice(0); // 清除 Nuxt.js 基于 pages 目录默认生成的路由规则表
			routes.push(
				...[
					{
						path: "/",
						component: resolve(__dirname, "pages/layout/default.vue"),
						children: [
							{
								name: "home",
								path: "/",
								component: resolve(__dirname, "pages/home/home.vue")
							},
							{
								name: "login",
								path: "/login",
								component: resolve(__dirname, "pages/auth/auth.vue")
							},
							{
								name: "register",
								path: "/register",
								component: resolve(__dirname, "pages/auth/auth.vue")
							},
							{
								name: "profile",
								path: "/profile/:username",
								component: resolve(__dirname, "pages/profile/profile.vue")
							},
							{
								name: "settings",
								path: "/settings",
								component: resolve(__dirname, "pages/setting/setting.vue")
							},
							{
								name: "editor",
								path: "/editor",
								component: resolve(__dirname, "pages/editor/editor.vue")
							},
							{
								name: "article",
								path: "/article/:slug",
								component: resolve(__dirname, "pages/article/article.vue")
							},
							{
								name: "404",
								path: "*",
								component: resolve(__dirname, "pages/404.vue")
							}
						]
					}
				]
			);
		}
	},
	server: {
		host: "0.0.0.0",
		port: 3000
	},
	plugins: [
		{ src: "@/plugins/element-ui", ssr: true },
		{ src: "@/plugins/request.js" },
		{ src: "@/plugins/dayjs.js" }
	], // ssr 该文件只会在客户端被打包引入
	css: ["element-ui/lib/theme-chalk/index.css"],
	build: {
		vendor: ["element-ui"],
		babel: {
			plugins: [
				[
					"component",
					{ libraryName: "element-ui", styleLibraryName: "theme-chalk" }
				]
			],
			comments: true
		}
	}
};
