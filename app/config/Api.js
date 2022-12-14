import { BASE_URL } from "@env";
const BaseURL = BASE_URL;
const ADMIN_BASE_URL = `${BaseURL}/api/users`;
const COMMON_BASE_URL = `${BaseURL}/api/common`;
const SA_BASE_URL = `${BaseURL}/api/sa`;
const DRIVER_BASE_URL = `${BaseURL}/api/driver`;
const JOBS_BASE_URL = `${BaseURL}/api/job`;

console.log(`🚀 ~ file: Api.js:9 ~ JOBS_BASE_URL`, JOBS_BASE_URL);

const ADMIN_APIS = {
  adminLogin: {
    url: `${ADMIN_BASE_URL}/login`,
    method: "post",
    noAuth: true,
  },
};
const SA_APIS = {
  createSA: {
    url: `${SA_BASE_URL}/create`,
    method: "post",
  },
  listSA: {
    url: `${SA_BASE_URL}/list`,
    method: "post",
  },
  editSA: {
    url: `${SA_BASE_URL}/edit`,
    method: "post",
  },
};
const DRIVER_APIS = {
  createDriver: {
    url: `${DRIVER_BASE_URL}/create`,
    method: "post",
  },
  listDriver: {
    url: `${DRIVER_BASE_URL}/list`,
    method: "post",
  },
  editDriver: {
    url: `${DRIVER_BASE_URL}/edit`,
    method: "post",
  },
};
const JOBS_APIS = {
  createJob: {
    url: `${JOBS_BASE_URL}/create`,
    method: "post",
  },
  listJob: {
    url: `${JOBS_BASE_URL}/list`,
    method: "post",
  },
  editJob: {
    url: `${JOBS_BASE_URL}/edit`,
    method: "post",
  },
};

const COMMON_APIS = {
  uploadProfile: {
    url: `${COMMON_BASE_URL}/uploadProfile`,
    method: "POST",
    formData: true,
  },
  uploadLogo: {
    url: `${COMMON_BASE_URL}/uploadLogo`,
    method: "POST",
    formData: true,
  },
  getSignedUrl: {
    url: `${COMMON_BASE_URL}/getSignedUrl/`,
    method: "get",
    formData: true,
  },
};

export const APIs = {
  ...ADMIN_APIS,
  ...COMMON_APIS,
  ...SA_APIS,
  ...DRIVER_APIS,
  ...JOBS_APIS,
};
