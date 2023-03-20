export const baseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "https://orbitrack.api.s3.orbitec.pe";
  }
  return "https://orbitrack.api.s3.orbitec.pe";
};

export const baseUrlReports = () => {
  if (process.env.NODE_ENV === "development") {
    return `${baseUrl()}/new_reports`;
  }
  return `${baseUrl()}/new_reports`;
};

export const tokenTest = () => {
  if (process.env.NODE_ENV === "development") {
    return "852551394900cd9ee3ce2e760b22146adc2956bc";
  }
  return "852551394900cd9ee3ce2e760b22146adc2956bc";
};