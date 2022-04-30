<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
					<p class="text-xs-center">
						<nuxt-link v-if="isLogin" to="/register"
							>Need an account?</nuxt-link
						>
						<nuxt-link v-else to="/login">Have an account?</nuxt-link>
					</p>
					<ul class="error-messages">
						<template v-for="(messages, field) in errors">
							<li v-for="(message, index) in messages" :key="index">
								{{ field }} {{ message }}
							</li>
						</template>
					</ul>
					<form @submit.prevent="onSubmit">
						<fieldset v-if="!isLogin" class="form-group">
							<input
								v-model="user.username"
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
								required
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								v-model="user.email"
								class="form-control form-control-lg"
								type="email"
								placeholder="Email"
								required
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								v-model="user.password"
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
								required
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">
							{{ isLogin ? "Sign in" : "Sign up" }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { login, register } from "@/api/user.js";
// 客户端加载 js-cookie 模块。process.client nuxtjs 中提供
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
	middleware: ["notAuthenticated"],
	data() {
		return {
			user: {
				username: "liut",
				email: "2394630102@wad",
				password: "123456"
			},
			errors: {}
		};
	},
	computed: {
		isLogin() {
			return this.$route.name === "login";
		}
	},
	methods: {
		async onSubmit() {
			try {
				// 提交表单请求登录
				const { data } = this.isLogin
					? await login({ user: this.user })
					: await register({ user: this.user });
				this.$store.commit("setAuth", data.user); // 保存用户登录状态
				Cookie.set("auth", JSON.stringify(data.user)); // 持久化存储 cookie
				this.$router.push({ name: "home" }); // 跳转首页
			} catch (err) {
				this.errors = err.response.data.errors;
			}
		}
	}
};
</script>
<style lang="scss" scoped></style>
