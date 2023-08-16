import axios from 'axios'

export async function getRepos() {
    const res = await axios.get(
      "https://portfolio-backend-apikmeister.vercel.app/repos"
    );
    const repos = res.data;
  
    return repos.map((repo: any) => {
      return {
        name: repo.name,
        description: repo.description,
        url: repo.link,
        stars: repo.stars,
        forks: repo.forks,
      };
    });
  }