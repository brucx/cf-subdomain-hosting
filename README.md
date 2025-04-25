# Cloudflare Subdomain Static Site Hosting

This project is a Cloudflare Worker that serves static content from an R2 bucket based on subdomain requests. It enables hosting multiple static websites under different subdomains using a single Cloudflare Worker and R2 bucket.

## How It Works

1. The Worker receives requests with different subdomains (e.g., `blog.example.com`, `docs.example.com`)
2. It extracts the subdomain from the hostname
3. It looks up files in the R2 bucket using a path pattern of `{subdomain}/{path}`
4. If the file exists in the bucket, it serves the file with the appropriate content type
5. If the file doesn't exist, it returns a simple "Hello {subdomain}!" message

## Project Structure

- `src/index.ts` - The main Worker code that handles requests and serves content
- `wrangler.jsonc` - Configuration file for Cloudflare Workers
- `test/` - Directory containing tests for the Worker

## Setup and Configuration

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [pnpm](https://pnpm.io/) package manager
- Cloudflare account with Workers and R2 access

### Installation

```bash
# Install dependencies
pnpm install
```

### Configuration

1. Make sure you have created an R2 bucket named `subdomain-static` in your Cloudflare account
2. Organize your static files in the bucket using the pattern: `{subdomain}/{file}`, for example:
   - `blog/index.html` - For the blog subdomain's homepage
   - `docs/index.html` - For the docs subdomain's homepage
   - `blog/css/style.css` - For CSS files under the blog subdomain

### Development

```bash
# Start a local development server
pnpm dev
```

### Deployment

```bash
# Deploy to Cloudflare Workers
pnpm deploy
```

## Usage

Once deployed, configure your DNS to point subdomains to this Worker. For example:
- `blog.example.com` → Worker
- `docs.example.com` → Worker

The Worker will automatically serve the appropriate content from the R2 bucket based on the subdomain.

## File Structure in R2 Bucket

```
subdomain-static/
├── blog/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── docs/
│   ├── index.html
│   └── assets/
│       └── images/
└── app/
    └── index.html
```

## License

Private - All rights reserved
