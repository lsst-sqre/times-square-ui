/*
 * Mock Times Square API endpoint: /times-square/v1/pages/:page
 */

export default function handler(req, res) {
  const { page } = req.query;

  if (page == 'not-found') {
    // simulate a page that doesn't exist in the backend
    res.statusCode = 404;
    res.end();
    return;
  }

  const content = {
    name: page,
    self_url: `${req.url}`,
    source_url: `${req.url}/source`,
    rendered_url: `${req.url}/rendered`,
    html_url: `${req.url}/html`,
    parameters: {
      a: {
        type: 'number',
        default: 42,
        description: 'A number.',
      },
      b: {
        type: 'string',
        default: 'Hello',
        description: 'A string.',
      },
    },
  };

  res.statusCode = 200;
  res.setHeader('Content-Type', 'applicaiton/json');
  res.end(JSON.stringify(content));
}
