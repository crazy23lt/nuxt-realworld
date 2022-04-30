import { request } from "@/plugins/request";
export const getTags = () => {
	return request({
		url: "/tags",
		method: "GET"
	});
};
