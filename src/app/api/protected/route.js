export async function GET() {
  return new Response(JSON.stringify({ message: "You are authorized!" }), { status: 200 });
}
