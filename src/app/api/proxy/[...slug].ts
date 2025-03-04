// TODO: IMPLEMENT HIS IF HAVE MANY PLENTY OF TIME, MAKE A PROXY OF ROUTING INSTEAD

import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const BASE_URL = "http://localhost:5000";

const apiProxy = createProxyMiddleware({
  target: BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    // Remove ONLY the first `/api/proxy` prefix
    "^/api/proxy": "",
  },
  secure: false,
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Proxying request:", req.url);

  return apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      console.error("Proxy Error:", result.message);
      res.status(500).json({ error: "Proxy encountered an error" });
      return;
    }

    res.status(500).json({ error: "Request was not proxied!" });
  });
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
