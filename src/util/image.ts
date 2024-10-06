export const getGoogleStoragePath = (imageUrl: string): string => {
  const url = new URL(imageUrl);

  const googleStorageUrl = url.searchParams.get('url');

  if (googleStorageUrl) {
    return decodeURIComponent(googleStorageUrl);
  }

  return '';
};

export const createImageLoader =
  (imageUrl: string | undefined, placeholder?: string) => () => {
    if (imageUrl) {
      const googleStoragePath = getGoogleStoragePath(imageUrl);

      console.log(googleStoragePath);

      return googleStoragePath || placeholder || '';
    }

    return placeholder || '';
  };
