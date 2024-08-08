
const config: {[key: string]: string} = {
  "navigation": "navigation.json",
  "footer": "footer.json",
  "about": "about.json",
  "contact": "contact.json",
  "metadata": "metadata",
  "home": "home.json",
  "privacy-policy": "privacy-policy.json",
  "resources": "resources.json"
}

export const development: boolean =  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

async function getRemoteConfig(configName: string){
  const value = config[configName] ?? "config.json";
  const data = await fetch(`https://raw.githubusercontent.com/xNS5/rentalreviewsconfig/${development ? "development" : "master"}/src/config/${value}`);
  const json = await data.json();
  return json;
}

