const REQUIRED = ['firstName', 'lastName', 'email', 'hospital'];

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }

  const missing = REQUIRED.filter(k => !body[k]?.toString().trim());
  if (missing.length) {
    return json({ error: 'Missing required fields', fields: missing }, 422);
  }

  const { firstName, lastName, email, hospital, bedsRange, message } = body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address' }, 422);
  }

  try {
    const result = await env.DB.prepare(`
      INSERT INTO demo_requests (first_name, last_name, email, hospital, beds_range, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
      .bind(
        firstName.trim().slice(0, 100),
        lastName.trim().slice(0, 100),
        email.trim().slice(0, 255),
        hospital.trim().slice(0, 255),
        bedsRange?.trim().slice(0, 50) ?? null,
        message?.trim().slice(0, 2000) ?? null,
      )
      .run();

    return json({ id: result.meta.last_row_id }, 201);
  } catch (err) {
    console.error('DB insert failed:', err);
    return json({ error: 'Internal server error' }, 500);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
