const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => {
	return { auth: null };
};
export const mutations = {
	setAuth(state, auth) {
		state.auth = auth;
	}
};
export const actions = {
	// nuxtServerInit 提供给服务端的 actions，在服务端渲染的时候自动执行该 actions
	nuxtServerInit({ commit }, { req }) {
		let auth = null;
		if (req.headers.cookie) {
			const parsed = cookieparser.parse(req.headers.cookie);
			try {
				auth = JSON.parse(parsed.auth);
			} catch (err) {
				console.log("cookie auth parse error:>> ", err);
			}
		}
		commit("setAuth", auth);
	}
};
