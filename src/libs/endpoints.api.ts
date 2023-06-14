const API = process.env.NEXT_PUBLIC_API_URL
const VERSION = process.env.NEXT_PUBLIC_API_VERSION

export const endpoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    profile: `${API}/api/${VERSION}/auth/profile`,
  },
  products: {
    getProduct: (id: string) => `${API}/api/${VERSION}/products/${id}/`,
    getProducts: (limit = 10, offset = 1) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
    addProducts: `${API}/api/${VERSION}/products`,
    updateProducts: (id: string) => `${API}/api/${VERSION}/products/${id}/`,
    deleteProducts: (id: string | number) => `${API}/api/${VERSION}/products/${id}/`,
  },
  categories: {
    getCategoriesList: `${API}/api/${VERSION}/categories/`,
    addCategory: `${API}/api/${VERSION}/categories/`,
    getCategoryItems: (id: string) => `${API}/api/${VERSION}/categories/${id}/products/`,
    updateCategory: (id: string) => `${API}/api/${VERSION}/categories/${id}/`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  },
  users: {
    list: `${API}/api/${VERSION}/users`,
    create: `${API}/api/${VERSION}/users`,
    isAvailable: `${API}/api/${VERSION}/users/is-available/`,
  },
}