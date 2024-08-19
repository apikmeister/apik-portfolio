import { NextRequest, NextResponse } from "next/server";
import archiver from "archiver";

export async function POST(req: NextRequest) {
    const { albumId, imageUrls } = await req.json();
  
    if (!albumId || !imageUrls || !Array.isArray(imageUrls)) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
  
    const stream = new ReadableStream({
      async start(controller) {
        const archive = archiver('zip', { zlib: { level: 9 } });
  
        archive.on('data', (chunk) => {
          controller.enqueue(chunk);
        });
  
        archive.on('end', () => {
          controller.close();
        });
  
        archive.on('error', (err) => {
          controller.error(err);
        });
  
        for (const url of imageUrls) {
          const response = await fetch(url);
          const imageBuffer = await response.arrayBuffer();
          const imageName = url.split('/').pop();
  
          archive.append(Buffer.from(imageBuffer), { name: imageName });
        }
  
        archive.finalize();
      },
    });
  
    return new NextResponse(stream, {
      headers: {
        'Content-Disposition': `attachment; filename="${albumId}.zip"`,
        'Content-Type': 'application/zip',
      },
    });
  }
