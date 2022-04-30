import axios from "axios";
export const request = axios.create({
	baseURL: "https://api.realworld.io/api"
});

export default ({ store }) => {
	// TODO: 一个完整的 axios 拦截器
	request.interceptors.request.use(
		function (config) {
			const { auth } = store.state;
			if (auth && auth.token) {
				config.headers.Authorization = `Token ${auth.token}`;
			}
			return config;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
	request.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			return Promise.reject(error);
		}
	);
};
