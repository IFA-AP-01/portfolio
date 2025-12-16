+++
author = "huyhunhngc"
title = "Cloudflare R2 Storage – Zero egress fee storage built for developers."
date = "2025-06-01"
description = "Stop paying to access your own data. Cloudflare R2 is the S3-compatible object storage that removes egress fees."
tags = [
    "R2", "Cloudflare", "Storage", "Egress", "Developer"
]
toc = true
+++

## 1. Eliminating Egress Fees in Object Storage

Object storage services typically charge for outbound data transfer as part of the billing model.

Cloudflare R2 is an S3-compatible object storage service provided by Cloudflare. R2 does not charge for **egress bandwidth** when data is transferred out of the service to end users or other services; outbound data transfer is free.

Pricing for R2 is based on stored data volume and the number of read (Class B) and write (Class A) operations performed, with a free tier for storage and operations included each month.

![R2 Compare S3 and Cloud Storage](https://cdn.ifateam.dev/r2-compare-s3.png?auto=compress,format&format=webp)

### Pricing

Instead of charging for data transfer, Cloudflare R2 pricing is based on **stored data** and the number of **operations** performed.

The free tier includes:

- **10GB of storage per month**
- **1,000,000 Class A (write) operations**
- **10,000,000 Class B (read) operations**

Once the free tier is exceeded, pricing follows the model below. Full details are available at: https://developers.cloudflare.com/r2/pricing/

|                                        | Standard Storage         | Infrequent Access Storage |
| -------------------------------------- | ------------------------ | ------------------------- |
| **Storage**                            | $0.015 / GB-month        | $0.01 / GB-month          |
| **Class A Operations (write)**         | $4.50 / million requests | $9.00 / million requests  |
| **Class B Operations (read)**          | $0.36 / million requests | $0.90 / million requests  |
| **Data Retrieval (processing)**        | None                     | $0.01 / GB                |
| **Egress (data transfer to Internet)** | Free                     | Free                      |

> **Note:** While egress is free, read operations are still counted as **Class B requests** and may incur costs once the free tier is exceeded.

## 2. Architecture: Global by Default

Unlike traditional cloud storage where you must choose a specific region (for example, `us-east-1` or `ap-southeast-1`) to balance latency and cost, R2 leverages Cloudflare’s global network by default.

- **Region-agnostic:** You do not select a region when creating a bucket.
- **Durability:** Data is replicated across multiple locations for reliability.
- **Security:** Integrates with Cloudflare Access and API Tokens. Buckets can be restricted by token scope, IP address, or HTTP headers.

For side projects and small applications, the free tier is often sufficient. You only pay for storage and operations once usage exceeds the included limits.

## 3. S3-Compatible API and SDK Usage

Since R2 is S3-compatible, you can continue using familiar tools such as the AWS SDK for Node.js, Python (Boto3), or Go.

You can manage buckets directly from the Cloudflare Dashboard:

![R2 Dashboard](https://cdn.ifateam.dev/r2-dashboard.png?auto=compress,format&format=webp)

### Node.js example

First, generate API credentials in the Cloudflare Dashboard:
https://developers.cloudflare.com/r2/api/tokens/

```bash
npm install @aws-sdk/client-s3
```

Then configure the client to point to your R2 endpoint:

```javascript
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto", // R2 does not use traditional AWS regions
  endpoint: "https://<ACCOUNT_ID>.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "YOUR_R2_ACCESS_KEY",
    secretAccessKey: "YOUR_R2_SECRET_KEY",
  },
});

const uploadFile = async () => {
  await client.send(
    new PutObjectCommand({
      Bucket: "my-awesome-bucket",
      Key: "logs/hello.txt",
      Body: "Hello from R2!",
    })
  );
};

uploadFile();
```

## 4. The Superpower: R2 + Cloudflare Workers

R2 integrates tightly with **Cloudflare Workers**, allowing you to bind a bucket directly to a Worker without using HTTP or external SDKs.

This enables fast, internal access to objects at the edge.

**`wrangler.toml` configuration:**

```toml
[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-r2-bucket"
```

**Worker code (ES Modules):**

```javascript
export default {
  async fetch(request, env) {
    const file = await env.MY_BUCKET.get("image.png");

    if (!file) return new Response("Not found", { status: 404 });

    return new Response(file.body, {
      headers: { "Content-Type": "image/png" },
    });
  },
};
```

_No authentication handshakes, no additional network hops—just direct object access._

## 5. When Should You Use R2?

R2 is not just a storage service; it is a cost-optimized infrastructure choice in several scenarios:

1. **Media-heavy applications:** Images, audio, and video delivery without bandwidth-based penalties.
2. **Data lakes:** Log and dataset storage with predictable access costs.
3. **Serverless backends:** File uploads and downloads combined with Cloudflare Workers.
4. **Multi-cloud strategies:** Secondary storage or backup for S3 without egress lock-in.

## Summary

Cloudflare R2 removes one of the most problematic aspects of traditional object storage pricing: **egress-based costs**. It delivers a familiar S3-compatible API, integrates deeply with the Cloudflare ecosystem, and offers predictable, developer-friendly pricing.

**_Reference:_**
[https://developers.cloudflare.com/r2/](https://developers.cloudflare.com/r2/)
