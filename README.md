# Findme Frontend 🌍

This is frontend codebase for my portofolio project [Findme](https://findme.hiro.one).

### Tech stacks

- React.js/Next.js
- Google Mpas javaScript API
- Kubernetes (k3s on top of Raspberry PI cluster)
- GitHub Actions (to autimatically build and deploy Docker image to local kubernetes cluster)

### Required envrionment variables

- NEXT_PUBLIC_GOOGLEMAP_API_KEY: Google Maps API key
- NEXT_API_SERVER: URL for [API server](https://github.com/hirotake111/findme_api)
- NEXT_PUBLIC_FRONTEND_SERVER: FQDN for this frontend server

### Useful commands

```bash
# start development API server
docker-compose up -d

# start development server
yarn dev

# run test
yarn test

# build production code
yarn build
```
