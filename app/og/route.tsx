import { ImageResponse } from "next/server";
import { NextRequest } from "next/server";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], style: "normal" });

export const runtime = "edge";

export async function GET(req: NextRequest) {
  // const searchParams = useSearchParams();
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") || "No title";
  const author = searchParams.get("author") || "Anonymous";
  const date = searchParams.get("date") || "2022-11-08T12:00:00.000Z";
  const cover = searchParams.get("cover");
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
          backgroundImage: "url(https://apik.me//og-bg.png)",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 130,
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
          className={inter.className}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
