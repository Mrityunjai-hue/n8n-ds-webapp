import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    error: 'AI chatbot service has been disabled per system architecture update.',
  }, { status: 410 });
}
