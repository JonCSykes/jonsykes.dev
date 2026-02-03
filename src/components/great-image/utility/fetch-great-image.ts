import { plaiceholder } from "@src/lib/plaiceholder";

type FetchGreatImage = {
  src: string;
  baseURL?: string;
  useRemoteBlur?: boolean;
};

export const fetchGreatImage = async (props: FetchGreatImage) => {
  const { src, baseURL, useRemoteBlur = true } = props;
  const isRemote = Boolean(baseURL) || /^https?:\/\//.test(src);

  if (isRemote && useRemoteBlur) {
    const url = baseURL ? new URL(src, baseURL).href : src;
    const { base64: placeholder, image } = await plaiceholder(url);
    return { placeholder, src: image.src, isRemote };
  }

  return { placeholder: src, src, isRemote };
};
