export const formatCategory = (category: string | null): string => {
  if (!category) return ''
  
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}