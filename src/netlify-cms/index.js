import CMS from 'netlify-cms-app';

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: master,
    },
  },
});
