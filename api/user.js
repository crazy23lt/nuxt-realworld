import { request } from "@/plugins/request";
export const login = data => {
	return request({
		url: "/users/login",
		method: "POST",
		data
	});
};
export const register = data => {
	return request({
		url: "/users",
		method: "POST",
		data
	});
};
