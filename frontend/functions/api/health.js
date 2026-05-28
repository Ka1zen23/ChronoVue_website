export async function onRequestGet({ env }) {
  try {
    await env.DB.prepare('SELECT 1').run();
    return new Response(JSON.stringify({ status: 'ok', db: 'connected' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ status: 'error', db: 'disconnected' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
