import ViewCounter from "@/app/blog/view-counter";
import { getViewsCount } from "@/lib/metrics";

export async function Views({ slug }: { slug: string }) {
    let views = await getViewsCount();
  
    return <ViewCounter allViews={views} slug={slug} />;
  }