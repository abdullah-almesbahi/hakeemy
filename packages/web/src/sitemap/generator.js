// import { createSitemap } from 'sitemap'; // import createSitemap
require('babel-register');
const { createSitemap } = require('sitemap');
const path = require('path');
const fs = require('fs');
const { ApolloClient } = require('apollo-client');
const gql = require('graphql-tag');
const fetch = require('node-fetch');
const { InMemoryCache } = require('apollo-cache-inmemory');
const { createHttpLink } = require('apollo-link-http');

async function getData() {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'https://prisma.hakeemy.com/hakeemy/default',
      fetch: fetch
    }),
    cache: new InMemoryCache()
  });

  const urls = await client.query({
    query: gql`
      query {
        doctors {
          id
          updatedAt
        }
      }
    `
  });
  return urls.data;
}

//ar/doctor-profile/3029

async function run() {
  const Routes = [
    {
      path: '/ar/',
      changefreq: 'daily',
      priority: 1
    },
    {
      path: '/en/',
      changefreq: 'daily',
      priority: 1
    },
    {
      path: '/patient/viewdoctor',
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  // use your website root address here. Optimally you can
  // include dev and production enviorenments with variables
  const hostname = 'https://www.hakeemy.com';

  // define our destination folder and sitemap file name
  const dest = path.resolve('./public', 'sitemap.xml');

  // Retrieve the post titles array ['post-title-1', 'post-title-2', ...]
  // const posts = getPostsForSitemap();
  const data = await getData();
  // console.log('urls', urls);

  // Merge our route paths with config pattern
  // const paths = applyParams(Routes, config);
  const paths = []; // we will append links here

  // we will loop through our routes to extract paths
  // and other params
  Routes.map((route, index) => {
    // get 	path, and changefreq, priority from current route
    const { path, changefreq, priority } = route;

    let currentPath = {
      url: path // we need to pass url parameter to build sitemap
    };

    // if we are in post route, loop through posts
    // and add them to the paths
    if (path === '/patient/viewdoctor') {
      data.doctors.map(doctor => {
        paths.push({
          url: `${hostname}/ar/patient/viewdoctor/${doctor.id}/1`,
          lastmod: doctor.updatedAt,
          changefreq,
          priority
        });
        paths.push({
          url: `${hostname}/en/patient/viewdoctor/${doctor.id}/1`,
          lastmod: doctor.updatedAt,
          changefreq,
          priority
        });
      });

      // prevent further code execution;
      return;
    }

    // for other routes use regular data
    if (changefreq) currentPath.changefreq = changefreq;
    if (priority) currentPath.priority = priority;

    paths.push(currentPath);
  });

  // Generate sitemap and return Sitemap instance
  // const sitemap = buildSitemap(hostname, paths);
  const sitemap = createSitemap({
    hostname,
    urls: paths
  });

  // write sitemap.xml file in /public folder
  // Access the sitemap content by converting it with .toString() method
  fs.writeFileSync(dest, sitemap.toString());
}

run();
