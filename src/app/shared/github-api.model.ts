export interface githubResults {
  incomplete_results: boolean;
  items: item[];
  total_count: number;
}

export interface item {
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  html_url: string;
}
