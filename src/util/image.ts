export const createImageLoader =
  (imageUrl: string | undefined, placeholder?: string) => () =>
    imageUrl ?? placeholder ?? '';
