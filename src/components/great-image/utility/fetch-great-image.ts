type FetchGreatImage = {
  src: string;
  baseURL?: string;
  useRemoteBlur?: boolean;
};

export const fetchGreatImage = async (props: FetchGreatImage) => {
  const { src, baseURL, useRemoteBlur = true } = props;
  const isRemote = Boolean(baseURL) || /^https?:\/\//.test(src);
  const transparentPixel =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  const resolvedSrc = baseURL ? new URL(src, baseURL).href : src;

  if (isRemote) {
    return {
      placeholder: useRemoteBlur ? resolvedSrc : transparentPixel,
      src: resolvedSrc,
      isRemote,
    };
  }

  return { placeholder: src, src, isRemote };
};
