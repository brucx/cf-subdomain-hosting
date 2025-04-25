/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const subdomain = url.hostname.split('.')[0];
		const bucket = env.MY_BUCKET;
		let filename = '';
		if (url.pathname === '/') {
			filename = `${subdomain}/index.html`;
		} else {
			filename = `${subdomain}${url.pathname}`;
		}

		const object = await bucket.get(filename);
		if (object) {
			return new Response(object.body, {
				headers: {
					'Content-Type': object.httpMetadata?.contentType || 'text/html'
				}
			});
		}

		return new Response(`${subdomain} pages not found!`, {
			status: 404,
			headers: {
				'Content-Type': 'text/html'
			}
		});
	},
} satisfies ExportedHandler<Env>;
