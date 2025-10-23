import { getCategories, transformCategoryList, type NestedCategory } from '.'

export const useCategory = () => {
  const fetchCategories = () => {
    return useAsyncData<NestedCategory[]>(
      'categories',
      async () => {
        try {
          const response = await getCategories()
          return transformCategoryList(response.data.data)
        } catch (err: any) {
          throw createError({
            statusCode: 500,
            statusMessage: `خطا در دریافت دسته بندی ها:\n${err.message}\n${err.response.data.message}`,
          })
        }
      },
      {
        lazy: true,
        server: true,
        default: () => [],
      }
    )
  }

  return {
    fetchCategories,
  }
}
