import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "No title";
  const publishedAt = searchParams.get("date") || "";
  const readTime = searchParams.get("readTime") || "";

  const interSemiBold = fetch(
    new URL("../../public/font/Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: "url(http://apik.me/og-bg.png)",
        }}
      >
        <div
          style={{
            marginLeft: 80,
            marginRight: 190,
            display: "flex",
            fontSize: 80,
            fontFamily: "Inter",
            letterSpacing: "-0.05em",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
