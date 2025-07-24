// Determine if we're running on GitHub Pages
export const isGitHubPages = window.location.hostname === "1978saikat.github.io";

// Get base URL for assets
export const getBaseUrl = () => {
    return isGitHubPages ? '/vite-react-e-commerce' : '';
};

// Get base URL for navigation
export const getBasePath = () => {
    return isGitHubPages ? '/vite-react-e-commerce' : '/';
};

// Get URL for data files
export const getDataUrl = (filename) => {
    return `${getBaseUrl()}/${filename}`;
}; 