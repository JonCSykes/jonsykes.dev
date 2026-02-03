import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { PAGE_INFO } from "@src/constants/page-info";

type Context = {
  site: string;
};

export async function GET(context: Context) {
  const posts = (await getCollection("posts")).filter(
    post => !post.data.isDraft,
  );

  return rss({
    title: PAGE_INFO.SITE.TITLE,
    description: PAGE_INFO.SITE.DESCRIPTION,
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
    })),
  });
}
