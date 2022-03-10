/*
 * Mock Times Square API endpoint: times-square/v1/pages
 *
 * This endpoint lists available pages.
 */

import getConfig from 'next/config';

export default function handler(req, res) {
  const { publicRuntimeConfig } = getConfig();
  const { timesSquareApiUrl } = publicRuntimeConfig;

  const createPage = (name) => {
    const pageBaseUrl = `${timesSquareApiUrl}/v1/pages/${name}`;
    return {
      name,
      self_url: pageBaseUrl,
    };
  };

  const content = [createPage('mypage'), createPage('anotherpage')];

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(content));
}
