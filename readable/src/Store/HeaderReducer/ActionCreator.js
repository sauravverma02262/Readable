import { HEADER_TITLE } from '../../Constants'
export const setHeaderTitle = (title) => {
  return {
    type: HEADER_TITLE,
    title,
  }
}
