import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * WordPress webhook handler for content revalidation
 * Receives notifications from WordPress when content changes
 * and revalidates the entire site
 */

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const secret = request.headers.get("x-webhook-secret");

    if (secret !== process.env.WORDPRESS_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret");
      return NextResponse.json(
        { message: "Invalid webhook secret" },
        { status: 401 }
      );
    }

    const { contentType, contentId, slug, postType } =
      parseWebhookPayload(requestBody);

    if (!contentType) {
      return NextResponse.json(
        { message: "Missing content type" },
        { status: 400 }
      );
    }

    try {
      console.log(
        `Revalidating content: ${contentType}${
          contentId ? ` (ID: ${contentId})` : ""
        }`
      );

      // Revalidate specific content type tags
      revalidateTag("wordpress", { expire: 0 });

      if (contentType === "post" || contentType === "page") {
        revalidateTag("posts", { expire: 0 });
        if (contentId) {
          revalidateTag(`post-${contentId}`, { expire: 0 });
        }
        // Clear all post pages when any post changes
        revalidateTag("posts-page-1", { expire: 0 });
      } else if (contentType === "category") {
        revalidateTag("categories", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-category-${contentId}`, { expire: 0 });
          revalidateTag(`category-${contentId}`, { expire: 0 });
        }
      } else if (contentType === "tag") {
        revalidateTag("tags", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-tag-${contentId}`, { expire: 0 });
          revalidateTag(`tag-${contentId}`, { expire: 0 });
        }
      } else if (contentType === "author" || contentType === "user") {
        revalidateTag("authors", { expire: 0 });
        if (contentId) {
          revalidateTag(`posts-author-${contentId}`, { expire: 0 });
          revalidateTag(`author-${contentId}`, { expire: 0 });
        }
      }
      // Tag invalidation alone does not drop statically generated post HTML.
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/posts");
      revalidatePath("/posts/[slug]", "page");
      revalidatePath("/pages/[slug]", "page");
      revalidatePath("/posts/categories");
      if (slug) {
        if (postType === "page") {
          revalidatePath(`/pages/${slug}`);
        } else {
          revalidatePath(`/posts/${slug}`);
        }
      }

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated ${contentType}${
          contentId ? ` (ID: ${contentId})` : ""
        } and related content`,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error revalidating path:", error);
      return NextResponse.json(
        {
          revalidated: false,
          message: "Failed to revalidate site",
          error: (error as Error).message,
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

type WebhookBody = {
  contentType?: string;
  contentId?: string | number;
  type?: string;
  data?: {
    id?: string | number;
    slug?: string;
    taxonomy?: string;
    type?: string;
  };
};

function parseWebhookPayload(body: WebhookBody): {
  contentType: string | undefined;
  contentId: string | number | undefined;
  slug: string | undefined;
  postType: string | undefined;
} {
  const rawType = body.contentType ?? body.type;
  const contentId = body.contentId ?? body.data?.id;
  const slug = body.data?.slug;
  const postType = body.data?.type;

  if (rawType === "term") {
    const taxonomy = body.data?.taxonomy;
    if (taxonomy === "category") {
      return { contentType: "category", contentId, slug, postType };
    }
    if (taxonomy === "post_tag") {
      return { contentType: "tag", contentId, slug, postType };
    }
    return { contentType: "term", contentId, slug, postType };
  }

  return { contentType: rawType, contentId, slug, postType };
}
