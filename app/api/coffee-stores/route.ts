import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  //prisma
  try {
    const searchParams = request.nextUrl.searchParams;
    const longLat = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";
    if (longLat) {
      const response = await fetchCoffeeStores(longLat, parseInt(limit));
      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.log("Erreur serveur: ", error);
    NextResponse.json(`Quelque chose s'est mal passée: ${error}`, {
      status: 500,
    });
  }
}
